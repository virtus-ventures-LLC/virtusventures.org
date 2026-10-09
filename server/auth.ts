import { COOKIE_NAME } from "../shared/const";
import {
  createHmac,
  randomBytes,
  scrypt as scryptCb,
  timingSafeEqual,
} from "crypto";
import express, { type Request, type Response, type Router } from "express";
import path from "path";
import { promisify } from "util";
import { z } from "zod";
import { toPublicUser, UserStore, type User } from "./userStore";

const scrypt = promisify(scryptCb) as (
  password: string,
  salt: Buffer,
  keylen: number,
  options: { N: number; r: number; p: number; maxmem: number }
) => Promise<Buffer>;

const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days
const SCRYPT = { N: 16384, r: 8, p: 1, keylen: 64 };

// ---------- passwords ----------

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  const { N, r, p, keylen } = SCRYPT;
  const hash = await scrypt(password, salt, keylen, {
    N,
    r,
    p,
    maxmem: 64 * 1024 * 1024,
  });
  return [
    "scrypt",
    N,
    r,
    p,
    salt.toString("base64"),
    hash.toString("base64"),
  ].join("$");
}

export async function verifyPassword(
  password: string,
  stored: string
): Promise<boolean> {
  const [algo, N, r, p, saltB64, hashB64] = stored.split("$");
  if (algo !== "scrypt") return false;
  const expected = Buffer.from(hashB64, "base64");
  const actual = await scrypt(
    password,
    Buffer.from(saltB64, "base64"),
    expected.length,
    {
      N: Number(N),
      r: Number(r),
      p: Number(p),
      maxmem: 64 * 1024 * 1024,
    }
  );
  return timingSafeEqual(actual, expected);
}

// ---------- session tokens ----------

function resolveSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (secret && secret.length >= 32) return secret;
  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "SESSION_SECRET must be set (at least 32 characters) in production."
    );
  }
  console.warn(
    "[auth] SESSION_SECRET not set; using a random dev secret. Sessions reset on restart."
  );
  return randomBytes(32).toString("hex");
}

function sign(payload: string, secret: string) {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

export function createSessionToken(userId: string, secret: string): string {
  const payload = Buffer.from(
    JSON.stringify({ uid: userId, exp: Date.now() + SESSION_TTL_MS })
  ).toString("base64url");
  return `${payload}.${sign(payload, secret)}`;
}

export function readSessionToken(
  token: string | undefined,
  secret: string
): string | null {
  if (!token) return null;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;
  const expected = Buffer.from(sign(payload, secret));
  const given = Buffer.from(sig);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) {
    return null;
  }
  try {
    const { uid, exp } = JSON.parse(
      Buffer.from(payload, "base64url").toString()
    );
    if (
      typeof uid !== "string" ||
      typeof exp !== "number" ||
      exp < Date.now()
    ) {
      return null;
    }
    return uid;
  } catch {
    return null;
  }
}

function getCookie(req: Request, name: string): string | undefined {
  const header = req.headers.cookie;
  if (!header) return undefined;
  for (const part of header.split(";")) {
    const idx = part.indexOf("=");
    if (idx === -1) continue;
    if (part.slice(0, idx).trim() === name) {
      return decodeURIComponent(part.slice(idx + 1).trim());
    }
  }
  return undefined;
}

// ---------- rate limiting ----------

function rateLimiter(limit: number, windowMs: number) {
  const hits = new Map<string, { count: number; resetAt: number }>();
  return (req: Request, res: Response, next: () => void) => {
    const now = Date.now();
    const key = `${req.ip}:${req.path}`;
    const entry = hits.get(key);
    if (!entry || entry.resetAt < now) {
      hits.set(key, { count: 1, resetAt: now + windowMs });
      if (hits.size > 10_000) {
        hits.forEach((v, k) => {
          if (v.resetAt < now) hits.delete(k);
        });
      }
      return next();
    }
    if (++entry.count > limit) {
      res.setHeader("Retry-After", Math.ceil((entry.resetAt - now) / 1000));
      return res
        .status(429)
        .json({ error: "Too many attempts. Please try again later." });
    }
    next();
  };
}

// ---------- router ----------

const signUpSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(254),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(200),
});

const signInSchema = z.object({
  email: z.string().trim().max(254),
  password: z.string().max(200),
});

export interface AuthOptions {
  dataDir?: string;
}

/**
 * Mounts under /api/auth:
 *   POST /signup   { name, email, password }
 *   POST /signin   { email, password }
 *   POST /signout
 *   GET  /me       -> { user } or 401
 * Also exports `requireUser` for protecting future API routes.
 */
export function createAuth(options: AuthOptions = {}) {
  const secret = resolveSecret();
  const dataDir =
    options.dataDir ??
    process.env.DATA_DIR ??
    path.resolve(process.cwd(), "data");
  const users = new UserStore(path.join(dataDir, "users.json"));
  // Equalizes sign-in timing whether or not the email exists.
  const dummyHash = hashPassword(randomBytes(16).toString("hex"));

  const isProd = process.env.NODE_ENV === "production";
  const cookieOptions = {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: isProd,
    path: "/",
  };

  function setSession(res: Response, user: User) {
    res.cookie(COOKIE_NAME, createSessionToken(user.id, secret), {
      ...cookieOptions,
      maxAge: SESSION_TTL_MS,
    });
  }

  function currentUser(req: Request): User | null {
    const uid = readSessionToken(getCookie(req, COOKIE_NAME), secret);
    return uid ? (users.findById(uid) ?? null) : null;
  }

  function requireUser(
    req: Request & { user?: User },
    res: Response,
    next: () => void
  ) {
    const user = currentUser(req);
    if (!user) return res.status(401).json({ error: "Not signed in" });
    req.user = user;
    next();
  }

  const router: Router = express.Router();
  router.use(express.json({ limit: "10kb" }));
  router.use((_req, res, next) => {
    res.setHeader("Cache-Control", "no-store");
    next();
  });
  const limit = rateLimiter(10, 15 * 60 * 1000);

  router.post("/signup", limit, async (req, res, next) => {
    try {
      const parsed = signUpSchema.safeParse(req.body);
      if (!parsed.success) {
        return res
          .status(400)
          .json({ error: parsed.error.issues[0]?.message ?? "Invalid input" });
      }
      const { name, email, password } = parsed.data;
      if (users.findByEmail(email)) {
        return res
          .status(409)
          .json({ error: "An account with that email already exists." });
      }
      const passwordHash = await hashPassword(password);
      const user = await users.create({ name, email, passwordHash });
      if (!user) {
        return res
          .status(409)
          .json({ error: "An account with that email already exists." });
      }
      setSession(res, user);
      res.status(201).json({ user: toPublicUser(user) });
    } catch (err) {
      next(err);
    }
  });

  router.post("/signin", limit, async (req, res, next) => {
    try {
      const parsed = signInSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid input" });
      }
      const { email, password } = parsed.data;
      const user = users.findByEmail(email);
      const ok = await verifyPassword(
        password,
        user?.passwordHash ?? (await dummyHash)
      );
      if (!user || !ok) {
        return res.status(401).json({ error: "Incorrect email or password." });
      }
      setSession(res, user);
      res.json({ user: toPublicUser(user) });
    } catch (err) {
      next(err);
    }
  });

  router.post("/signout", (_req, res) => {
    res.clearCookie(COOKIE_NAME, cookieOptions);
    res.json({ ok: true });
  });

  router.get("/me", (req, res) => {
    const user = currentUser(req);
    if (!user) return res.status(401).json({ error: "Not signed in" });
    res.json({ user: toPublicUser(user) });
  });

  return { router, requireUser };
}

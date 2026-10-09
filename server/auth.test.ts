import express from "express";
import fs from "fs";
import type { AddressInfo } from "net";
import os from "os";
import path from "path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAuth } from "./auth";

let base: string;
let close: () => void;
let dataDir: string;

beforeAll(async () => {
  dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "auth-test-"));
  const auth = createAuth({ dataDir });
  const app = express();
  app.use("/api/auth", auth.router);
  app.get("/api/private", auth.requireUser, (_req, res) =>
    res.json({ ok: true })
  );
  const server = app.listen(0);
  await new Promise(r => server.once("listening", r));
  base = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
  close = () => server.close();
});

afterAll(() => {
  close();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

function post(p: string, body: unknown, cookie?: string) {
  return fetch(base + p, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(cookie ? { cookie } : {}),
    },
    body: JSON.stringify(body),
  });
}

const cookieOf = (res: Response) =>
  res.headers.get("set-cookie")?.split(";")[0] ?? "";

describe("auth", () => {
  let cookie = "";

  it("rejects /me and protected routes without a session", async () => {
    expect((await fetch(`${base}/api/auth/me`)).status).toBe(401);
    expect((await fetch(`${base}/api/private`)).status).toBe(401);
  });

  it("signs up, sets a session cookie, and hides the password hash", async () => {
    const res = await post("/api/auth/signup", {
      name: "Ada",
      email: "Ada@Example.com",
      password: "correct horse",
    });
    expect(res.status).toBe(201);
    const { user } = await res.json();
    expect(user.email).toBe("ada@example.com");
    expect(user.passwordHash).toBeUndefined();
    cookie = cookieOf(res);
    expect(cookie).toMatch(/^app_session_id=/);
    expect(res.headers.get("set-cookie")).toMatch(/HttpOnly/);

    const stored = fs.readFileSync(path.join(dataDir, "users.json"), "utf-8");
    expect(stored).not.toContain("correct horse");
  });

  it("rejects duplicate emails and short passwords", async () => {
    expect(
      (
        await post("/api/auth/signup", {
          name: "A",
          email: "ada@example.com",
          password: "12345678",
        })
      ).status
    ).toBe(409);
    expect(
      (
        await post("/api/auth/signup", {
          name: "B",
          email: "b@example.com",
          password: "short",
        })
      ).status
    ).toBe(400);
  });

  it("lets a signed-in user reach protected routes", async () => {
    const me = await fetch(`${base}/api/auth/me`, { headers: { cookie } });
    expect(me.status).toBe(200);
    expect((await me.json()).user.name).toBe("Ada");
    expect(
      (await fetch(`${base}/api/private`, { headers: { cookie } })).status
    ).toBe(200);
  });

  it("rejects a tampered session cookie", async () => {
    const [payload, sig] = cookie.split("=")[1].split(".");
    const forged = Buffer.from(
      JSON.stringify({ uid: "someone-else", exp: Date.now() + 1e9 })
    ).toString("base64url");
    const res = await fetch(`${base}/api/auth/me`, {
      headers: { cookie: `app_session_id=${forged}.${sig}` },
    });
    expect(res.status).toBe(401);
    expect(payload).not.toBe(forged);
  });

  it("signs in with the right password only", async () => {
    expect(
      (
        await post("/api/auth/signin", {
          email: "ada@example.com",
          password: "wrong pass",
        })
      ).status
    ).toBe(401);
    expect(
      (
        await post("/api/auth/signin", {
          email: "nobody@example.com",
          password: "whatever1",
        })
      ).status
    ).toBe(401);
    const ok = await post("/api/auth/signin", {
      email: "ADA@example.com",
      password: "correct horse",
    });
    expect(ok.status).toBe(200);
    expect(cookieOf(ok)).toMatch(/^app_session_id=/);
  });

  it("signs out by clearing the cookie", async () => {
    const res = await post("/api/auth/signout", {}, cookie);
    expect(res.status).toBe(200);
    expect(res.headers.get("set-cookie")).toMatch(
      /app_session_id=;.*Expires=Thu, 01 Jan 1970/
    );
  });
});

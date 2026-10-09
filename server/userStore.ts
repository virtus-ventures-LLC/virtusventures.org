import { randomUUID } from "crypto";
import fs from "fs";
import path from "path";

export interface User {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  createdAt: string;
}

export type PublicUser = Omit<User, "passwordHash">;

export function toPublicUser({ passwordHash: _, ...user }: User): PublicUser {
  return user;
}

/**
 * Minimal JSON-file user store. Writes are atomic (temp file + rename) and
 * serialized in-process. Swap this out for a real database once the site
 * needs more than accounts.
 */
export class UserStore {
  private users: User[] = [];
  private loaded = false;
  private writeChain: Promise<void> = Promise.resolve();

  constructor(private readonly filePath: string) {}

  private load() {
    if (this.loaded) return;
    try {
      const raw = fs.readFileSync(this.filePath, "utf-8");
      this.users = JSON.parse(raw).users ?? [];
    } catch (err: any) {
      if (err?.code !== "ENOENT") throw err;
      this.users = [];
    }
    this.loaded = true;
  }

  private persist(): Promise<void> {
    const snapshot = JSON.stringify({ users: this.users }, null, 2);
    this.writeChain = this.writeChain.then(async () => {
      await fs.promises.mkdir(path.dirname(this.filePath), { recursive: true });
      const tmp = `${this.filePath}.${process.pid}.tmp`;
      await fs.promises.writeFile(tmp, snapshot, { mode: 0o600 });
      await fs.promises.rename(tmp, this.filePath);
    });
    return this.writeChain;
  }

  findByEmail(email: string): User | undefined {
    this.load();
    const normalized = email.trim().toLowerCase();
    return this.users.find(u => u.email === normalized);
  }

  findById(id: string): User | undefined {
    this.load();
    return this.users.find(u => u.id === id);
  }

  async create(input: {
    email: string;
    name: string;
    passwordHash: string;
  }): Promise<User | null> {
    this.load();
    // Checked here (synchronously, right before insert) so two concurrent
    // sign-ups for the same email can't both succeed.
    if (this.findByEmail(input.email)) return null;
    const user: User = {
      id: randomUUID(),
      email: input.email.trim().toLowerCase(),
      name: input.name.trim(),
      passwordHash: input.passwordHash,
      createdAt: new Date().toISOString(),
    };
    this.users.push(user);
    await this.persist();
    return user;
  }
}

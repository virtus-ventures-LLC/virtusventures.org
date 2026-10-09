import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

type TeamEntry = {
  name: string;
  role: string;
  bio?: string;
  email?: string;
};

const team = JSON.parse(
  fs.readFileSync(
    path.resolve(import.meta.dirname, "../client/public/data/team.json"),
    "utf8"
  )
) as TeamEntry[];

const siteScript = fs.readFileSync(
  path.resolve(import.meta.dirname, "../client/public/js/site.js"),
  "utf8"
);

describe("About page team emails", () => {
  it.each([
    ["Yuri Andrews", "yuri.andrews@virtusventures.org"],
    ["Connor Klemann", "connor.klemann@virtusventures.org"],
    ["Sulameta Cheban", "sulameta.cheban@virtusventures.org"],
  ])("stores the verified email for %s", (name, email) => {
    expect(team.find((entry) => entry.name === name)?.email).toBe(email);
  });

  it("contains no pending biography placeholder", () => {
    expect(team).toHaveLength(3);
    expect(team.every((entry) => !entry.bio)).toBe(true);
    expect(JSON.stringify(team)).not.toContain("Bio pending.");
  });

  it("renders optional biographies and email data as mailto links", () => {
    expect(siteScript).toContain("if (entry.bio)");
    expect(siteScript).toContain("if (entry.email)");
    expect(siteScript).toContain('contact.className = "team-contact"');
    expect(siteScript).toContain("email.href = `mailto:${entry.email}`");
    expect(siteScript.indexOf("article.appendChild(bio)")).toBeLessThan(
      siteScript.indexOf("article.appendChild(contact)")
    );
  });
});

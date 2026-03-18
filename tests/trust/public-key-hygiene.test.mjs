import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

test("fixture public key exists and looks like a public key", () => {
  const keyPath = path.join(process.cwd(), "tests", "fixtures", "public-keys", "test-public.pem");
  const raw = fs.readFileSync(keyPath, "utf8");
  assert.match(raw, /BEGIN PUBLIC KEY/);
  assert.doesNotMatch(raw, /BEGIN PRIVATE KEY/);
});

test("repo trust folder should not contain committed private keys", () => {
  const trustDir = path.join(process.cwd(), "trust");
  if (!fs.existsSync(trustDir)) return;

  const offenders = [];
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (/private/i.test(entry.name) || full.endsWith(".key")) offenders.push(full);
      else {
        const raw = fs.readFileSync(full, "utf8");
        if (raw.includes("BEGIN PRIVATE KEY")) offenders.push(full);
      }
    }
  }
  walk(trustDir);
  assert.deepEqual(offenders, []);
});

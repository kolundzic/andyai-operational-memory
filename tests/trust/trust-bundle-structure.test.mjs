import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const fixtures = path.join(process.cwd(), "tests", "fixtures", "trust-bundles");

function read(name) {
  return JSON.parse(fs.readFileSync(path.join(fixtures, name), "utf8"));
}

test("valid trust bundle fixture has required top-level fields", () => {
  const json = read("valid.trust.json");
  for (const key of ["bundle_version", "exported_at", "memory", "manifest", "signature"]) {
    assert.ok(key in json, `missing ${key}`);
  }
  assert.equal(json.signature.algorithm, "ed25519");
});

test("invalid trust bundle fixture is missing signature", () => {
  const json = read("invalid-missing-signature.trust.json");
  assert.equal("signature" in json, false);
});

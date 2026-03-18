import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const fixtures = path.join(process.cwd(), "tests", "fixtures", "replay");

function read(name) {
  return JSON.parse(fs.readFileSync(path.join(fixtures, name), "utf8"));
}

test("valid replay manifest fixture has canonical shape", () => {
  const json = read("valid.replay.json");
  assert.equal(typeof json.version, "string");
  assert.equal(typeof json.exported_at, "string");
  assert.equal(typeof json.count, "number");
  assert.ok(Array.isArray(json.items));
  assert.ok(json.items[0].checksum);
});

test("invalid replay manifest fixture demonstrates missing fields", () => {
  const json = read("invalid.replay.json");
  assert.equal(Boolean(json.items[0].title), false);
});

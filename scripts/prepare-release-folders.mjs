import fs from "node:fs";
import path from "node:path";

const dirs = [
  "dist",
  "release",
  "trust/bundles",
  "trust/reports",
  "trust/replay",
  "trust/public-keys"
];

for (const dir of dirs) {
  fs.mkdirSync(path.join(process.cwd(), dir), { recursive: true });
}

console.log("Release folders prepared.");

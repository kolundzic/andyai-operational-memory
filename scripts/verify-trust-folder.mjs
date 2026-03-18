import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const trustDir = path.join(root, "trust");
const requiredDirs = ["bundles", "reports", "replay", "public-keys"];
const issues = [];

if (!fs.existsSync(trustDir)) {
  issues.push("Missing trust/ directory.");
} else {
  for (const dir of requiredDirs) {
    const full = path.join(trustDir, dir);
    if (!fs.existsSync(full)) issues.push(`Missing trust/${dir}/ directory.`);
  }

  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else {
        if (/private/i.test(entry.name) || full.endsWith(".key")) {
          issues.push(`Potential private key committed: ${path.relative(root, full)}`);
          continue;
        }
        const raw = fs.readFileSync(full, "utf8");
        if (raw.includes("BEGIN PRIVATE KEY")) {
          issues.push(`Private key material detected: ${path.relative(root, full)}`);
        }
      }
    }
  }

  walk(trustDir);
}

const result = {
  verified: issues.length === 0,
  checked_at: new Date().toISOString(),
  issues
};

console.log(JSON.stringify(result, null, 2));

if (issues.length > 0) process.exit(1);

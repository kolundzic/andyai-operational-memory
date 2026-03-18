import fs from "node:fs";
import path from "node:path";

const [, , sourcePath, targetName = "memory-public.pem"] = process.argv;

if (!sourcePath) {
  console.error("Usage: node scripts/export-public-key.mjs <source-public-key> [target-name]");
  process.exit(1);
}

const dest = path.join(process.cwd(), "trust", "public-keys", targetName);
fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.copyFileSync(sourcePath, dest);

console.log(`Exported public key to ${dest}`);

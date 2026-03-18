import fs from "node:fs";
import path from "node:path";

const exportsDir = path.join(process.cwd(), "exports");
const bundleDir = path.join(process.cwd(), "trust", "bundles");
const replayDir = path.join(process.cwd(), "trust", "replay");

if (!fs.existsSync(exportsDir)) {
  console.log("No exports directory found. Skipping stage.");
  process.exit(0);
}

fs.mkdirSync(bundleDir, { recursive: true });
fs.mkdirSync(replayDir, { recursive: true });

const files = fs.readdirSync(exportsDir);

for (const file of files) {
  const src = path.join(exportsDir, file);

  if (file.endsWith(".trust.json")) {
    fs.copyFileSync(src, path.join(bundleDir, file));
  } else if (file.startsWith("replay-") && file.endsWith(".json")) {
    fs.copyFileSync(src, path.join(replayDir, file));
  }
}

console.log("Staged trust artifacts into canonical trust/ folders.");

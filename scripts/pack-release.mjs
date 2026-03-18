import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const root = process.cwd();
const distDir = path.join(root, "dist");

fs.mkdirSync(distDir, { recursive: true });

const zipName = "andyai-operational-memory-v0.6.0-release.zip";
const zipPath = path.join(distDir, zipName);

if (fs.existsSync(zipPath)) {
  fs.unlinkSync(zipPath);
}

try {
  execSync(
    `zip -r "${zipPath}" release trust README.md ARCHITECTURE.md MEMORY_SCHEMA.json MEMORY_LIFECYCLE.md RANKING_MODEL.md GRAPH_MODEL.md TRUST_MODEL.md docs schemas examples package.json tsconfig.json`,
    { stdio: "inherit" }
  );
} catch {
  console.error("zip command failed. Ensure zip is installed.");
  process.exit(1);
}

console.log(`Packed ${path.relative(root, zipPath)}`);

import fs from "node:fs";
import path from "node:path";

const trustDir = path.join(process.cwd(), "trust");
const bundlesDir = path.join(trustDir, "bundles");
const replayDir = path.join(trustDir, "replay");
const reportsDir = path.join(trustDir, "reports");

function listJson(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => path.relative(process.cwd(), path.join(dir, f)));
}

const manifest = {
  version: "0.5.0",
  generated_at: new Date().toISOString(),
  bundles: listJson(bundlesDir),
  replay_manifests: listJson(replayDir),
  reports: listJson(reportsDir)
};

const out = path.join(trustDir, "release-manifest.json");
fs.mkdirSync(trustDir, { recursive: true });
fs.writeFileSync(out, JSON.stringify(manifest, null, 2));

console.log(`Generated ${path.relative(process.cwd(), out)}`);

import fs from "node:fs";
import path from "node:path";

function safeList(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => !f.startsWith("."));
}

const summary = {
  generated_at: new Date().toISOString(),
  version: "0.6.0",
  trust_bundles: safeList(path.join(process.cwd(), "trust", "bundles")),
  replay_manifests: safeList(path.join(process.cwd(), "trust", "replay")),
  trust_reports: safeList(path.join(process.cwd(), "trust", "reports")),
  public_keys: safeList(path.join(process.cwd(), "trust", "public-keys")),
  release_files: safeList(path.join(process.cwd(), "release"))
};

const out = path.join(process.cwd(), "release", "release-summary.json");
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, JSON.stringify(summary, null, 2));

console.log(`Generated ${path.relative(process.cwd(), out)}`);

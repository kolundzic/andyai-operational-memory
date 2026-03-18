import fs from "node:fs";
import path from "node:path";

const trustDir = path.join(process.cwd(), "trust");
const bundlesDir = path.join(trustDir, "bundles");
const replayDir = path.join(trustDir, "replay");
const reportsDir = path.join(trustDir, "reports");

function countJson(dir) {
  if (!fs.existsSync(dir)) return 0;
  return fs.readdirSync(dir).filter((f) => f.endsWith(".json")).length;
}

const issues = [];
const bundleCount = countJson(bundlesDir);
const replayCount = countJson(replayDir);

if (bundleCount === 0) issues.push("No trust bundles found.");
if (replayCount === 0) issues.push("No replay manifests found.");

const report = {
  generated_at: new Date().toISOString(),
  status: issues.length === 0 ? "pass" : "warning",
  summary: {
    bundle_count: bundleCount,
    replay_count: replayCount,
    issues
  }
};

fs.mkdirSync(reportsDir, { recursive: true });
const out = path.join(reportsDir, "trust-report.json");
fs.writeFileSync(out, JSON.stringify(report, null, 2));

console.log(`Generated ${path.relative(process.cwd(), out)}`);

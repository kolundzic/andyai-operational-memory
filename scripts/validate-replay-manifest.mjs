import fs from "node:fs";
import path from "node:path";

const replayDir = path.join(process.cwd(), "trust", "replay");

function fail(msg) {
  console.error(msg);
  process.exitCode = 1;
}

if (!fs.existsSync(replayDir)) {
  console.log("No trust/replay directory found. Skipping.");
  process.exit(0);
}

const files = fs.readdirSync(replayDir).filter((f) => f.endsWith(".json"));

for (const file of files) {
  const full = path.join(replayDir, file);
  const raw = fs.readFileSync(full, "utf8");

  let json;
  try {
    json = JSON.parse(raw);
  } catch {
    fail(`Invalid JSON: ${file}`);
    continue;
  }

  if (!json.version || !json.exported_at || typeof json.count !== "number" || !Array.isArray(json.items)) {
    fail(`Invalid replay manifest shape: ${file}`);
    continue;
  }

  for (const item of json.items) {
    if (!item.id || !item.title || !item.status || !item.trust_level || !item.checksum) {
      fail(`Replay item missing fields in ${file}`);
    }
  }
}

if (process.exitCode) {
  throw new Error("Replay manifest validation failed.");
}

console.log(`Validated ${files.length} replay manifest(s).`);

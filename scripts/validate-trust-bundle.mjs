import fs from "node:fs";
import path from "node:path";

const bundlesDir = path.join(process.cwd(), "trust", "bundles");

function fail(msg) {
  console.error(msg);
  process.exitCode = 1;
}

function isObject(v) {
  return v && typeof v === "object" && !Array.isArray(v);
}

if (!fs.existsSync(bundlesDir)) {
  console.log("No trust/bundles directory found. Skipping.");
  process.exit(0);
}

const files = fs.readdirSync(bundlesDir).filter((f) => f.endsWith(".json"));

for (const file of files) {
  const full = path.join(bundlesDir, file);
  const raw = fs.readFileSync(full, "utf8");

  let json;
  try {
    json = JSON.parse(raw);
  } catch {
    fail(`Invalid JSON: ${file}`);
    continue;
  }

  if (!isObject(json)) {
    fail(`Bundle is not an object: ${file}`);
    continue;
  }

  const requiredTop = ["bundle_version", "exported_at", "memory", "manifest", "signature"];
  for (const key of requiredTop) {
    if (!(key in json)) fail(`Missing ${key} in ${file}`);
  }

  if (!isObject(json.memory)) fail(`Invalid memory object in ${file}`);
  if (!isObject(json.manifest)) fail(`Invalid manifest object in ${file}`);
  if (!isObject(json.signature)) fail(`Invalid signature object in ${file}`);

  const manifestKeys = ["memory_checksum", "payload_checksum", "signature_algorithm", "public_key_hint"];
  for (const key of manifestKeys) {
    if (!(key in json.manifest)) fail(`Missing manifest.${key} in ${file}`);
  }

  const signatureKeys = ["algorithm", "value"];
  for (const key of signatureKeys) {
    if (!(key in json.signature)) fail(`Missing signature.${key} in ${file}`);
  }
}

if (process.exitCode) {
  throw new Error("Trust bundle validation failed.");
}

console.log(`Validated ${files.length} trust bundle(s).`);

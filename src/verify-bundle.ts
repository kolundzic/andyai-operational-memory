import fs from "node:fs/promises";
import { canonicalStringify } from "./canonical.js";
import { sha256Hex, verifyPayload } from "./signer.js";

async function main() {
  const [, , bundlePath, publicKeyPath] = process.argv;

  if (!bundlePath || !publicKeyPath) {
    console.error(
      "Usage: npm run verify:bundle -- <bundle-path> <public-key-path>"
    );
    process.exit(1);
  }

  const raw = await fs.readFile(bundlePath, "utf8");
  const bundle = JSON.parse(raw);

  const signature = bundle.signature?.value;
  const bundleWithoutSignature = {
    bundle_version: bundle.bundle_version,
    exported_at: bundle.exported_at,
    memory: bundle.memory,
    manifest: bundle.manifest,
  };

  const canonicalUnsigned = canonicalStringify(bundleWithoutSignature);
  const recomputedPayloadChecksum = sha256Hex(
    canonicalStringify({
      bundle_version: bundle.bundle_version,
      exported_at: bundle.exported_at,
      memory: bundle.memory,
      manifest: {
        ...bundle.manifest,
        payload_checksum: "",
      },
    })
  );

  const recomputedMemoryChecksum = sha256Hex(canonicalStringify(bundle.memory));

  const signatureValid = await verifyPayload({
    payload: canonicalUnsigned,
    signatureBase64: signature,
    publicKeyPath,
  });

  const payloadChecksumMatch =
    bundle.manifest?.payload_checksum === recomputedPayloadChecksum;

  const memoryChecksumMatch =
    bundle.manifest?.memory_checksum === recomputedMemoryChecksum;

  const verified =
    signatureValid && payloadChecksumMatch && memoryChecksumMatch;

  const report = {
    verified,
    bundle_version: bundle.bundle_version,
    memory_id: bundle.memory?.id ?? "unknown",
    checks: {
      signature_valid: signatureValid,
      payload_checksum_match: payloadChecksumMatch,
      memory_checksum_match: memoryChecksumMatch,
    },
    notes: verified
      ? ["Bundle verification passed."]
      : ["Bundle verification failed."],
  };

  console.log(JSON.stringify(report, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

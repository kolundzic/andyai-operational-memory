import crypto from "node:crypto";
import fs from "node:fs/promises";

export async function generateEd25519Keypair(args: {
  privateKeyPath: string;
  publicKeyPath: string;
}) {
  const { publicKey, privateKey } = crypto.generateKeyPairSync("ed25519");

  const privatePem = privateKey.export({ type: "pkcs8", format: "pem" });
  const publicPem = publicKey.export({ type: "spki", format: "pem" });

  await fs.writeFile(args.privateKeyPath, privatePem);
  await fs.writeFile(args.publicKeyPath, publicPem);

  return {
    privateKeyPath: args.privateKeyPath,
    publicKeyPath: args.publicKeyPath,
  };
}

export async function signPayload(args: {
  payload: string;
  privateKeyPath: string;
}) {
  const privateKeyPem = await fs.readFile(args.privateKeyPath, "utf8");
  const signature = crypto.sign(
    null,
    Buffer.from(args.payload, "utf8"),
    privateKeyPem
  );
  return signature.toString("base64");
}

export async function verifyPayload(args: {
  payload: string;
  signatureBase64: string;
  publicKeyPath: string;
}) {
  const publicKeyPem = await fs.readFile(args.publicKeyPath, "utf8");
  return crypto.verify(
    null,
    Buffer.from(args.payload, "utf8"),
    publicKeyPem,
    Buffer.from(args.signatureBase64, "base64")
  );
}

export function sha256Hex(input: string): string {
  return crypto.createHash("sha256").update(input).digest("hex");
}

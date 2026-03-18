# Signing Workflow

## Goal

Export a memory record as a signed trust bundle.

## Steps

1. Generate keys
2. Export trust bundle
3. Store public key for verification
4. Distribute bundle with signature intact

## Commands

```bash
mkdir -p .keys
npm run cli -- gen-keys .keys/memory-private.pem .keys/memory-public.pem
npm run export:bundle -- <memory-id> .keys/memory-private.pem exports
```

## Rule

Private keys stay local.
Public keys are shared for verification.

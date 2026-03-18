# Verification Workflow

## Goal

Verify that a trust bundle has not been tampered with.

## Command

```bash
npm run verify:bundle -- exports/memory-<id>.trust.json .keys/memory-public.pem
```

## Checks

- signature validity
- payload checksum
- memory checksum

## Result

If all checks pass, the bundle is trustworthy within the current signing model.

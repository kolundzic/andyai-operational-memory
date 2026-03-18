# Replay Pack

## Goal

Export a replay-ready manifest of memories for a project.

## Why

Useful for:
- audits
- migration
- review
- re-indexing
- regression testing

## Command

```bash
npm run replay:export -- festie exports
```

## Output

A JSON manifest with:
- ids
- titles
- statuses
- trust levels
- checksums

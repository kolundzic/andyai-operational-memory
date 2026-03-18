# Tests

This pack adds a lightweight credibility layer for `andyai-operational-memory`.

## Focus

- trust bundle structure checks
- replay manifest structure checks
- public-key hygiene checks
- no-private-key rule checks

## Run

```bash
npm run test
npm run test:trust
npm run verify:trust-folder
```

## Philosophy

A trust-aware memory system should not only describe trust.
It should test the conditions required to claim trust.

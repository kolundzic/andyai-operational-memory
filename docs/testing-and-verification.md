# Testing and Verification

## Goal

Operational Memory should not only claim trust.
It should verify trust conditions continuously.

## This pack adds

- lightweight Node test coverage for trust/replay fixtures
- public-key hygiene checks
- no-private-key repository checks
- a trust-folder verification script

## Commands

```bash
npm run test
npm run test:trust
npm run verify:trust-folder
```

## What these checks prove

They do **not** prove full production safety.

They do prove that the repository now has:
- executable trust checks
- structural fixture coverage
- explicit private-key hygiene rules
- a stronger credibility story for reviewers

## Recommended next step

Add deeper unit tests around:
- signature verification
- ranking behavior
- promotion transitions
- export/import round-trips

# Trust Folder Layout

## Canonical structure

trust/
├── bundles/
├── reports/
├── replay/
└── public-keys/

## Meaning

- bundles: signed trust artifacts
- reports: CI-generated trust summaries
- replay: replay-ready exports
- public-keys: distributable verification keys

## Rule

Only portable, reviewable, non-secret artifacts belong in trust/.
Never commit private keys.

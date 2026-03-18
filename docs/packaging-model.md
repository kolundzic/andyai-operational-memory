# Packaging Model

## Canonical outputs

- dist/ = final distributable ZIPs
- release/ = generated release metadata
- trust/ = portable trust artifacts

## Why

This keeps:
- build outputs predictable
- review artifacts separated
- trust material easy to inspect

## Rule

dist/ is disposable.
trust/ and release/ are inspectable.

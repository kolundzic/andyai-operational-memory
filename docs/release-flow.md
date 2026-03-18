# Release Flow

## One-command path

```bash
npm run release:all
```

## Expanded flow

1. Type check
2. Validate trust bundles
3. Validate replay manifests
4. Generate release manifest
5. Generate trust report
6. Prepare release folders
7. Stage trust artifacts
8. Generate BUILD_LOG
9. Generate RELEASE_NOTES
10. Generate release summary
11. Pack final ZIP

## Result

A canonical release ZIP in dist/.

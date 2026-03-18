import fs from "node:fs";
import path from "node:path";

const content = `# RELEASE_NOTES

## Version
v0.6.0

## Highlights
- release discipline and trust gates
- canonical trust folder layout
- one-command release packaging
- build log and release summary generation

## Included
- trust bundles
- replay manifests
- trust reports
- release manifest

## Reviewer Notes
- Replace this section with final human release notes before public launch if needed.
`;

const out = path.join(process.cwd(), "release", "RELEASE_NOTES.md");
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, content);

console.log(`Generated ${path.relative(process.cwd(), out)}`);

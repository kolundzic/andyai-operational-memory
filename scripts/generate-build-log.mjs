import fs from "node:fs";
import path from "node:path";

const now = new Date().toISOString();
const content = `# BUILD_LOG

## Generated At
${now}

## Build Pipeline
1. Type check
2. Trust bundle validation
3. Replay manifest validation
4. Release manifest generation
5. Trust report generation
6. Artifact staging
7. Release packaging

## Notes
- This file is auto-generated.
- Review trust/reports/trust-report.json for current trust status.
`;

const out = path.join(process.cwd(), "release", "BUILD_LOG.md");
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, content);

console.log(`Generated ${path.relative(process.cwd(), out)}`);

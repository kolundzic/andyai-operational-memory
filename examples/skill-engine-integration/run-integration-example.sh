#!/usr/bin/env bash
set -euo pipefail

# Example only: illustrates the execution → memory handoff flow.

python clients/python/examples/skill_engine_handoff.py \
  examples/skill-engine-integration/skill-memory-handoff.example.json

echo "Handoff processed. Next steps:"
echo "1. Insert resulting memory record"
echo "2. Promote draft -> active"
echo "3. Promote active -> verified"
echo "4. Export trust bundle"

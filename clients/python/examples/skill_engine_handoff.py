import json
import sys
from pathlib import Path


def main() -> None:
    if len(sys.argv) < 2:
        print("Usage: python skill_engine_handoff.py <handoff-json>")
        raise SystemExit(1)

    handoff_path = Path(sys.argv[1])
    handoff = json.loads(handoff_path.read_text())

    memory_record = {
        "project_id": handoff["project_id"],
        "memory_type": handoff["recommended_memory_type"],
        "title": f"Skill result: {handoff['skill_id']}",
        "summary": handoff["summary"],
        "content": json.dumps(handoff["result"], indent=2),
        "tags": handoff["recommended_tags"],
        "status": "draft",
        "confidence": 0.8,
        "importance": 7,
        "source": "skill-engine",
        "source_ref": f"{handoff['skill_id']}:{handoff['run_id']}",
        "trust_level": "inferred",
        "authority_level": "working",
    }

    print(json.dumps(memory_record, indent=2))


if __name__ == "__main__":
    main()

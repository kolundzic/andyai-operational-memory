"""Minimal HTTP API quickstart for AndyAI Operational Memory."""

from __future__ import annotations

import json
import urllib.request

BASE_URL = "http://localhost:8787"


def get_json(url: str) -> dict:
    with urllib.request.urlopen(url) as response:
        return json.loads(response.read().decode("utf-8"))


if __name__ == "__main__":
    info = get_json(f"{BASE_URL}/api/info")
    print(json.dumps(info, indent=2))

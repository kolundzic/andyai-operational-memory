type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

function sortValue(value: JsonValue): JsonValue {
  if (Array.isArray(value)) {
    return value.map(sortValue);
  }

  if (value && typeof value === "object") {
    const sortedKeys = Object.keys(value).sort();
    const result: Record<string, JsonValue> = {};
    for (const key of sortedKeys) {
      result[key] = sortValue((value as Record<string, JsonValue>)[key]);
    }
    return result;
  }

  return value;
}

export function canonicalStringify(value: JsonValue): string {
  return JSON.stringify(sortValue(value));
}

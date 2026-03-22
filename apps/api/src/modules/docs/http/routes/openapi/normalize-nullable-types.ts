export function normalizeNullableTypes(schema: unknown): void {
  if (!schema || typeof schema !== "object") {
    return;
  }

  if (Array.isArray(schema)) {
    schema.forEach(normalizeNullableTypes);
    return;
  }

  const record = schema as Record<string, unknown>;
  const type = record.type;

  if (Array.isArray(type) && type.includes("null")) {
    const nonNullTypes = type.filter((item) => item !== "null");

    if (nonNullTypes.length === 1) {
      record.type = nonNullTypes[0];
      record.nullable = true;
    }
  }

  Object.values(record).forEach(normalizeNullableTypes);
}

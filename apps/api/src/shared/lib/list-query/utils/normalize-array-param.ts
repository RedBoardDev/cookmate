const splitCsv = (value: string) =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);

export const normalizeArrayParam = (value: unknown): unknown[] | undefined => {
  if (value === undefined || value === null) return undefined;

  const toParts = (item: unknown) => {
    if (typeof item !== "string") return [item];
    return splitCsv(item);
  };

  if (Array.isArray(value)) {
    const parts = value.flatMap(toParts);
    return parts.length > 0 ? parts : undefined;
  }

  if (typeof value === "string") {
    const parts = splitCsv(value);
    return parts.length > 0 ? parts : undefined;
  }

  return [value];
};

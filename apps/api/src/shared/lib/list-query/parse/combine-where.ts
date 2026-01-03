export const combineWhere = <
  TWhere extends Record<string, unknown>,
  TBase extends TWhere
>(
  base: TBase,
  filters?: TWhere
): TWhere => {
  if (!filters) return base;

  const andValues = (filters as { AND?: unknown }).AND;
  if (Array.isArray(andValues)) {
    return { ...(filters as object), AND: [base, ...andValues] } as unknown as TWhere;
  }

  return { AND: [base, filters] } as unknown as TWhere;
};

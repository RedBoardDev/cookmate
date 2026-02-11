export function formatSuccess<T>(data: T) {
  return {
    success: true as const,
    data,
  };
}

export function formatPaginated<T>(data: T[], pagination: { total?: number; nextCursor?: string | null }) {
  return {
    success: true as const,
    data,
    metadata: { pagination },
  };
}

export type ApiErrorArgs = Record<string, string | number | boolean>;

export function formatError(code: string, options?: { details?: unknown; args?: ApiErrorArgs }) {
  const details = options?.details;
  const args = options?.args;

  return {
    success: false as const,
    error: {
      code,
      ...(args !== undefined && { args }),
      ...(details !== undefined && { details }),
    },
  };
}

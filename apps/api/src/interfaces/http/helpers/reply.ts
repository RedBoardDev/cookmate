export function formatSuccess<T>(data: T) {
  return {
    success: true as const,
    data,
  };
}

export function formatPaginated<T>(
  data: T[],
  pagination: { total?: number; nextCursor?: string | null }
) {
  return {
    success: true as const,
    data,
    metadata: { pagination },
  };
}

export function formatError(code: string, message: string, details?: unknown) {
  return {
    success: false as const,
    error: { code, message, ...(details !== undefined && { details }) },
  };
}

import type { z } from "zod";

/**
 * Helper to create TanStack Form validators from Zod schemas
 */
export function zodValidator<T>(schema: z.ZodType<T>) {
  return ({ value }: { value: T }) => {
    const result = schema.safeParse(value);
    return result.success ? undefined : result.error.issues[0]?.message ?? "Invalid";
  };
}

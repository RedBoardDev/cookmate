import { z } from "zod";

export function wrapResponseSchema<T extends z.ZodType>(schema: T) {
  return z.object({
    success: z.literal(true),
    data: schema,
    metadata: z
      .object({
        pagination: z.object({
          page: z.number().int().min(1),
          pageSize: z.number().int().min(1),
          totalItems: z.number().int().min(0),
        }),
      })
      .optional(),
  });
}

export function wrapResponseSchemas(responses: Record<number, z.ZodType>): Record<number, z.ZodType> {
  return Object.fromEntries(
    Object.entries(responses).map(([code, schema]) => [
      code,
      Number(code) === 204 ? schema : wrapResponseSchema(schema),
    ]),
  );
}

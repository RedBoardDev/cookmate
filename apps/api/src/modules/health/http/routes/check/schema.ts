import { z } from "zod";

const checkResultSchema = z.object({
  status: z.enum(["up", "down"]),
  latencyMs: z.number().optional(),
});

export const healthCheckDataSchema = z.object({
  status: z.enum(["healthy", "unhealthy"]),
  uptime: z.number(),
  checks: z.object({
    database: checkResultSchema,
  }),
});

export const response = {
  200: healthCheckDataSchema.extend({ status: z.literal("healthy") }),
  503: healthCheckDataSchema.extend({ status: z.literal("unhealthy") }),
} as const;

export const schemas = {
  response,
} as const;

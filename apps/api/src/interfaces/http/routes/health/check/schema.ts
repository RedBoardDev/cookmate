import { z } from "zod";

const checkResultSchema = z.object({
  status: z.enum(["up", "down"]),
  latencyMs: z.number().optional(),
});

export const healthCheckResponseSchema = z.object({
  success: z.literal(true),
  data: z.object({
    status: z.enum(["healthy", "unhealthy"]),
    uptime: z.number(),
    checks: z.object({
      database: checkResultSchema,
    }),
  }),
});

export type HealthCheckResponse = z.infer<typeof healthCheckResponseSchema>;

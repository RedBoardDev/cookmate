import type { FastifyInstance } from "fastify";
import { healthCheckHandler } from "./handler";
import { healthCheckResponseSchema } from "./schema";

export async function healthCheckRoute(app: FastifyInstance) {
  app.get(
    "",
    {
      schema: {
        tags: ["Health"],
        summary: "Health check",
        description: "Check API and database health status",
        response: {
          200: healthCheckResponseSchema,
        },
      },
    },
    healthCheckHandler,
  );
}

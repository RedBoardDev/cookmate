import type { FastifyInstance } from "fastify";
import { healthCheckHandler } from "./handler";
import { healthCheckResponseSchema } from "./schema";

export async function healthCheckRoute(app: FastifyInstance) {
  app.get("", {
    schema: {
      response: {
        200: healthCheckResponseSchema,
      },
    },
  }, healthCheckHandler);
}

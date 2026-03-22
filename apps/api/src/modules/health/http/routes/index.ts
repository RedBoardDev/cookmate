import type { FastifyInstance } from "fastify";
import { healthCheckRoute } from "./check";

export async function healthRoutes(app: FastifyInstance) {
  await app.register(healthCheckRoute);
}

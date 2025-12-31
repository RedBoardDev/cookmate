import type { FastifyInstance } from "fastify";
import { healthCheckRoute } from "./check/index";

export async function healthRoutes(app: FastifyInstance) {
  await app.register(healthCheckRoute);
}

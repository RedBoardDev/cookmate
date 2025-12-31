import type { FastifyInstance } from "fastify";
import { healthRoutes } from "./health/index";

export async function registerRoutes(app: FastifyInstance) {
  await app.register(healthRoutes, { prefix: "/health" });
}

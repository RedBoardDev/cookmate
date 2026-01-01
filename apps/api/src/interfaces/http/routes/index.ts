import type { FastifyInstance } from "fastify";
import { healthRoutes } from "./health";
import { docsRoutes } from "./docs";
import { collectionsRoutes } from "./collections";

export async function registerRoutes(app: FastifyInstance) {
  await app.register(healthRoutes, { prefix: "/health" });
  await app.register(docsRoutes, { prefix: "/docs" });
  await app.register(collectionsRoutes, { prefix: "/collections" });
}

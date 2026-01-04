import type { FastifyInstance } from "fastify";
import { healthRoutes } from "./health";
import { docsRoutes } from "./docs";
import { collectionsRoutes } from "./collections";
import { recipesRoutes } from "./recipes";

export async function registerRoutes(app: FastifyInstance) {
  await app.register(healthRoutes, { prefix: "/health" });
  await app.register(docsRoutes, { prefix: "/docs" });
  await app.register(collectionsRoutes, { prefix: "/collections" });
  await app.register(recipesRoutes, { prefix: "/recipes" });
}

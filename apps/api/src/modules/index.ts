import type { FastifyInstance } from "fastify";
import { collectionRoutes } from "./collection";
import { docsRoutes } from "./docs";
import { healthRoutes } from "./health";
import { recipeRoutes } from "./recipe";

export async function registerModuleRoutes(app: FastifyInstance) {
  await app.register(healthRoutes, { prefix: "/health" });
  await app.register(docsRoutes, { prefix: "/docs" });
  await app.register(collectionRoutes, { prefix: "/collections" });
  await app.register(recipeRoutes, { prefix: "/recipes" });
}

export * from "./collection";
export * from "./docs";
export * from "./health";
export * from "./recipe";

import type { FastifyInstance } from "fastify";
import { parsingStreamRoute } from "@/interfaces/ws";
import { collectionsRoutes } from "./collections";
import { docsRoutes } from "./docs";
import { healthRoutes } from "./health";
import { recipeParsingRoutes } from "./recipe-parsing";
import { recipesRoutes } from "./recipes";

export async function registerRoutes(app: FastifyInstance) {
  await app.register(healthRoutes, { prefix: "/health" });
  await app.register(docsRoutes, { prefix: "/docs" });
  await app.register(collectionsRoutes, { prefix: "/collections" });
  await app.register(recipesRoutes, { prefix: "/recipes" });
  await app.register(recipeParsingRoutes, { prefix: "/recipe-parsing/jobs" });

  // WebSocket routes
  await app.register(parsingStreamRoute);
}

import type { FastifyInstance } from "fastify";
import { listRecipesRoute } from "./list-recipes";
import { getRecipeRoute } from "./get-recipe";

export async function recipesRoutes(app: FastifyInstance) {
  await app.register(listRecipesRoute);
  await app.register(getRecipeRoute);
}

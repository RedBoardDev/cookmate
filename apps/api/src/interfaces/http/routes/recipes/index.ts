import type { FastifyInstance } from "fastify";
import { listRecipesRoute } from "./list-recipes";
import { getRecipeIdByShortUrlRoute } from "./get-recipe-id-by-short-url";
import { getRecipeRoute } from "./get-recipe";
import { listRecipeImagesRoute } from "./list-recipe-images";
import { getRecipeImageRoute } from "./get-recipe-image";
import { updateRecipeCollectionsRoute } from "./update-recipe-collections";

export async function recipesRoutes(app: FastifyInstance) {
  await app.register(listRecipesRoute);
  await app.register(getRecipeIdByShortUrlRoute);
  await app.register(getRecipeRoute);
  await app.register(listRecipeImagesRoute);
  await app.register(getRecipeImageRoute);
  await app.register(updateRecipeCollectionsRoute);
}

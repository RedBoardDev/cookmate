import type { FastifyInstance } from "fastify";
import { createRecipeRoute } from "./create-recipe";
import { getRecipeRoute } from "./get-recipe";
import { getRecipeIdByShortUrlRoute } from "./get-recipe-id-by-short-url";
import { getRecipeImageRoute } from "./get-recipe-image";
import { listRecipeImagesRoute } from "./list-recipe-images";
import { listRecipesRoute } from "./list-recipes";
import { updateRecipeRoute } from "./update-recipe";
import { updateRecipeCollectionsRoute } from "./update-recipe-collections";

export {
  createRecipeRoute,
  getRecipeRoute,
  getRecipeIdByShortUrlRoute,
  getRecipeImageRoute,
  listRecipeImagesRoute,
  listRecipesRoute,
  updateRecipeRoute,
  updateRecipeCollectionsRoute,
};

export async function recipeRoutes(app: FastifyInstance) {
  await app.register(listRecipesRoute);
  await app.register(createRecipeRoute);
  await app.register(getRecipeIdByShortUrlRoute);
  await app.register(getRecipeRoute);
  await app.register(listRecipeImagesRoute);
  await app.register(getRecipeImageRoute);
  await app.register(updateRecipeRoute);
  await app.register(updateRecipeCollectionsRoute);
}

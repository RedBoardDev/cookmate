import { route } from "@/shared/lib/route";
import { updateRecipeCollectionsHandler } from "./handler";
import { schemas } from "./schema";

export const updateRecipeCollectionsRoute = route()
  .patch("/:recipeId/collections")
  .auth()
  .meta({
    tags: ["Recipes"],
    summary: "Update recipe collections",
    description:
      "Update which collections a recipe belongs to. Multiple collections can be selected. Send empty array to remove from all collections. Only collection owners can add recipes.",
  })
  .schemas(schemas)
  .handle(updateRecipeCollectionsHandler);

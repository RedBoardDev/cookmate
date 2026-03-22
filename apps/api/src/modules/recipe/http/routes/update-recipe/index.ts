import { route } from "@/shared/lib/route";
import { updateRecipeHandler } from "./handler";
import { schemas } from "./schema";

export const updateRecipeRoute = route()
  .put("/:recipeId")
  .auth()
  .meta({
    tags: ["Recipes"],
    summary: "Update recipe",
    description: "Update a recipe owned by the current user.",
  })
  .schemas(schemas)
  .handle(updateRecipeHandler);

import { route } from "@/shared/lib/route";
import { updateRecipeHandler } from "./handler";
import { schemas } from "./schema";

export const updateRecipeRoute = route()
  .put("/:recipeId")
  .auth()
  .meta({
    tags: ["Recipes"],
    summary: "Update recipe",
    description:
      "Replace the editable fields of a recipe owned by the current user, including ingredients and instructions. Existing images remain unchanged.",
  })
  .schemas(schemas)
  .handle(updateRecipeHandler);

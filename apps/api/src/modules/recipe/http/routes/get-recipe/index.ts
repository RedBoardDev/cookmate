import { route } from "@/shared/lib/route";
import { getRecipeHandler } from "./handler";
import { schemas } from "./schema";

export const getRecipeRoute = route()
  .get("/:recipeId")
  .auth()
  .meta({
    tags: ["Recipes"],
    summary: "Get recipe",
    description: "Get a recipe by id.",
  })
  .schemas(schemas)
  .handle(getRecipeHandler);

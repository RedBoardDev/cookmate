import { route } from "@/shared/lib/route";
import { createRecipeHandler } from "./handler";
import { schemas } from "./schema";

export const createRecipeRoute = route()
  .post()
  .auth()
  .meta({
    tags: ["Recipes"],
    summary: "Create recipe",
    description: "Create a recipe for the current user.",
  })
  .schemas(schemas)
  .handle(createRecipeHandler);

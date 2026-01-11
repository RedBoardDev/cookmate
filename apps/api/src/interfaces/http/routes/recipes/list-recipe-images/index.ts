import { route } from "@/shared/lib/route";
import { listRecipeImagesHandler } from "./handler";
import { schemas } from "./schema";

export const listRecipeImagesRoute = route()
  .get("/:recipeId/images")
  .auth()
  .meta({
    tags: ["Recipe Images"],
    summary: "List recipe images",
    description: "List images for a recipe owned by the current user.",
  })
  .schemas(schemas)
  .handle(listRecipeImagesHandler);

import { route } from "@/shared/lib/route";
import { getRecipeImageHandler } from "./handler";
import { schemas } from "./schema";

export const getRecipeImageRoute = route()
  .get("/images/:imageId")
  .auth()
  .meta({
    tags: ["Recipe Images"],
    summary: "Get recipe image",
    description: "Get a recipe image by id.",
  })
  .schemas(schemas)
  .handle(getRecipeImageHandler);

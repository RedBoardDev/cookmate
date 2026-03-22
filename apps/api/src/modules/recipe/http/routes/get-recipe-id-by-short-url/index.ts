import { route } from "@/shared/lib/route";
import { getRecipeIdByShortUrlHandler } from "./handler";
import { schemas } from "./schema";

export const getRecipeIdByShortUrlRoute = route()
  .get("/short-url/:shortUrl")
  .auth()
  .meta({
    tags: ["Recipes"],
    summary: "Get recipe id by short url",
    description: "Get a recipe id by its short url code.",
  })
  .schemas(schemas)
  .handle(getRecipeIdByShortUrlHandler);

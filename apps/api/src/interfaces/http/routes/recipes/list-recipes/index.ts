import { route } from "@/shared/lib/route";
import { listRecipesHandler } from "./handler";
import { schemas } from "./schema";

export const listRecipesRoute = route()
  .get()
  .auth()
  .meta({
    tags: ["Recipes"],
    summary: "List recipes",
    description: "List recipes owned by the current user.",
  })
  .schemas(schemas)
  .handle(listRecipesHandler);

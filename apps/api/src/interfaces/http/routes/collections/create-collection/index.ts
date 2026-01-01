import { route } from "@/shared/lib/route";
import { createCollectionHandler } from "./handler";
import { schemas } from "./schema";

export const createCollectionRoute = route()
  .post()
  .auth()
  .meta({
    tags: ["Collections"],
    summary: "Create collection",
    description: "Create a new collection for the current user.",
  })
  .schemas(schemas)
  .handle(createCollectionHandler);

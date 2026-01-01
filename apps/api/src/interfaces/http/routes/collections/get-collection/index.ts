import { route } from "@/shared/lib/route";
import { getCollectionHandler } from "./handler";
import { schemas } from "./schema";

export const getCollectionRoute = route()
  .get("/:collectionId")
  .auth()
  .meta({
    tags: ["Collections"],
    summary: "Get collection",
    description: "Get a collection by id. Requires being owner or member.",
  })
  .schemas(schemas)
  .handle(getCollectionHandler);

import { route } from "@/shared/lib/route";
import { getCollectionHandler } from "./handler";
import { schemas } from "./schema";

export const getCollectionRoute = route()
  .get()
  .auth()
  .meta({
    tags: ["Collections"],
    summary: "Get collection",
    description: "Get a collection owned by the current user.",
  })
  .schemas(schemas)
  .handle(getCollectionHandler);

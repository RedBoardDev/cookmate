import { route } from "@/shared/lib/route";
import { listCollectionsHandler } from "./handler";
import { schemas } from "./schema";

export const listCollectionsRoute = route()
  .get()
  .auth()
  .meta({
    tags: ["Collections"],
    summary: "List collections",
    description: "List collections where the user is owner or member.",
  })
  .schemas(schemas)
  .handle(listCollectionsHandler);

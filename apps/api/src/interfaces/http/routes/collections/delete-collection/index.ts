import { route } from "@/shared/lib/route";
import { deleteCollectionHandler } from "./handler";
import { schemas } from "./schema";

export const deleteCollectionRoute = route()
  .delete("/:collectionId")
  .auth()
  .meta({
    tags: ["Collections"],
    summary: "Delete collection",
    description: "Delete a collection. Only the owner can delete.",
  })
  .schemas(schemas)
  .handle(deleteCollectionHandler);

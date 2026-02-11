import { route } from "@/shared/lib/route";
import { removeMemberHandler } from "./handler";
import { schemas } from "./schema";

export const removeMemberRoute = route()
  .delete("/:userId")
  .auth()
  .meta({
    tags: ["Collection Members"],
    summary: "Remove a member from collection",
    description: "Remove a user from the collection. Only the owner can remove members.",
  })
  .schemas(schemas)
  .handle(removeMemberHandler);

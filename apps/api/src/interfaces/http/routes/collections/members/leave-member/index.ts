import { route } from "@/shared/lib/route";
import { leaveMemberHandler } from "./handler";
import { schemas } from "./schema";

export const leaveMemberRoute = route()
  .delete("/leave")
  .auth()
  .meta({
    tags: ["Collection Members"],
    summary: "Leave collection",
    description: "Leave a collection you are a member of.",
  })
  .schemas(schemas)
  .handle(leaveMemberHandler);

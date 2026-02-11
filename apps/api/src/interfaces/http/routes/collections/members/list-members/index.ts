import { route } from "@/shared/lib/route";
import { listMembersHandler } from "./handler";
import { schemas } from "./schema";

export const listMembersRoute = route()
  .get()
  .auth()
  .meta({
    tags: ["Collection Members"],
    summary: "List collection members",
    description: "Get all members of a collection. Requires being owner or member.",
  })
  .schemas(schemas)
  .handle(listMembersHandler);

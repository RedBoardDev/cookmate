import { route } from "@/shared/lib/route";
import { addMemberHandler } from "./handler";
import { schemas } from "./schema";

export const addMemberRoute = route()
  .post()
  .auth()
  .meta({
    tags: ["Collection Members"],
    summary: "Add a member to collection",
    description: "Add a user to the collection by email. Only the owner can add members.",
  })
  .schemas(schemas)
  .handle(addMemberHandler);

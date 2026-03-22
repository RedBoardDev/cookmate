import { HttpStatus } from "@/shared/enums/http-status.enum";
import type { RouteHandler } from "@/shared/lib/route";
import { executeDeleteCollection } from "../../../commands/delete-collection/execute";
import type { schemas } from "./schema";

export const deleteCollectionHandler: RouteHandler<typeof schemas> = async (ctx) => {
  await executeDeleteCollection({
    collectionId: ctx.params.collectionId,
    userId: ctx.user.id,
  });

  return { status: HttpStatus.NoContent };
};

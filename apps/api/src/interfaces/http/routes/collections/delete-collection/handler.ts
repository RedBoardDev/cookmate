import type { RouteHandler } from "@/shared/lib/route";
import { HttpStatus } from "@/shared/enums/http-status.enum";
import { deleteCollection } from "./db-access";
import { schemas } from "./schema";
import { deleteCollectionErrors } from "./errors";

export const deleteCollectionHandler: RouteHandler<typeof schemas> = async (
  ctx
) => {
  const { collectionId } = ctx.params;
  const { id: userId } = ctx.user;

  await deleteCollectionErrors(collectionId, userId);

  await deleteCollection(collectionId);

  return { status: HttpStatus.NoContent };
};

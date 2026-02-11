import { HttpStatus } from "@/shared/enums/http-status.enum";
import type { RouteHandler } from "@/shared/lib/route";
import { deleteCollection } from "./db-access";
import { deleteCollectionErrors } from "./errors";
import type { schemas } from "./schema";

export const deleteCollectionHandler: RouteHandler<typeof schemas> = async (ctx) => {
  const { collectionId } = ctx.params;
  const { id: userId } = ctx.user;

  await deleteCollectionErrors(collectionId, userId);

  await deleteCollection(collectionId);

  return { status: HttpStatus.NoContent };
};

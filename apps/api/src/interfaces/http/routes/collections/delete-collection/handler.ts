import type { RouteHandler } from "@/shared/lib/route";
import { HttpStatus } from "@/shared/enums/http-status.enum";
import { getCollectionEntity } from "@/infra/db/repositories/collection/get-collection";
import { deleteCollection } from "./db-access";
import { schemas } from "./schema";

export const deleteCollectionHandler: RouteHandler<typeof schemas> = async (
  ctx
) => {
  const { collectionId } = ctx.params;

  const collection = await getCollectionEntity({ id: collectionId });

  collection.assertOwner(ctx.user.id);

  await deleteCollection(collectionId);

  return { status: HttpStatus.NoContent };
};

import type { RouteHandler } from "@/shared/lib/route";
import { HttpStatus } from "@/shared/enums/http-status.enum";
import { getCollectionErrors } from "./errors";
import { schemas } from "./schema";
import { getCollectionEntity } from "@/infra/db/repositories/collection/get-collection";

export const getCollectionHandler: RouteHandler<typeof schemas> = async (
  ctx
) => {
  const { collectionId } = ctx.params;
  const { id: userId } = ctx.user;

  const collection = await getCollectionEntity({ id: collectionId });

  await getCollectionErrors(collection, userId);

  return { status: HttpStatus.OK, data: collection.toSnapshot() };
};

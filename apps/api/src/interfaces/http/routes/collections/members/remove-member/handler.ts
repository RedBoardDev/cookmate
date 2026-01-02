import type { RouteHandler } from "@/shared/lib/route";
import { HttpStatus } from "@/shared/enums/http-status.enum";
import { getCollectionEntity } from "@/infra/db/repositories/collection/get-collection";
import { deleteCollectionMember } from "./db-access";
import { schemas } from "./schema";

export const removeMemberHandler: RouteHandler<typeof schemas> = async (
  ctx
) => {
  const { collectionId, userId } = ctx.params;
  const currentUserId = ctx.user.id;

  const collection = await getCollectionEntity({ id: collectionId });
  collection.assertOwner(currentUserId);
  collection.assertCanRemoveMember(userId);

  await deleteCollectionMember({ collectionId, userId });

  return { status: HttpStatus.NoContent };
};

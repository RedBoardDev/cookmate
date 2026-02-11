import { HttpStatus } from "@/shared/enums/http-status.enum";
import type { RouteHandler } from "@/shared/lib/route";
import { deleteCollectionMember } from "./db-access";
import { removeMemberErrors } from "./errors";
import type { schemas } from "./schema";

export const removeMemberHandler: RouteHandler<typeof schemas> = async (ctx) => {
  const { collectionId, userId } = ctx.params;
  const { id: currentUserId } = ctx.user;

  await removeMemberErrors(collectionId, currentUserId, userId);

  await deleteCollectionMember({ collectionId, userId });

  return { status: HttpStatus.NoContent };
};

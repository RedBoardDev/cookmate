import { HttpStatus } from "@/shared/enums/http-status.enum";
import type { RouteHandler } from "@/shared/lib/route";
import { deleteCollectionMember } from "./db-access";
import { leaveMemberErrors } from "./errors";
import type { schemas } from "./schema";

export const leaveMemberHandler: RouteHandler<typeof schemas> = async (ctx) => {
  const { collectionId } = ctx.params;
  const { id: userId } = ctx.user;

  await leaveMemberErrors(collectionId, userId);

  await deleteCollectionMember({ collectionId, userId });

  return { status: HttpStatus.NoContent };
};

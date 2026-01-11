import type { RouteHandler } from "@/shared/lib/route";
import { HttpStatus } from "@/shared/enums/http-status.enum";
import { deleteCollectionMember } from "./db-access";
import { schemas } from "./schema";
import { leaveMemberErrors } from "./errors";

export const leaveMemberHandler: RouteHandler<typeof schemas> = async (ctx) => {
  const { collectionId } = ctx.params;
  const { id: userId } = ctx.user;

  await leaveMemberErrors(collectionId, userId);

  await deleteCollectionMember({ collectionId, userId });

  return { status: HttpStatus.NoContent };
};

import type { RouteHandler } from "@/shared/lib/route";
import { HttpStatus } from "@/shared/enums/http-status.enum";
import { getCollectionEntity } from "@/infra/db/repositories/collection/get-collection";
import { listCollectionMembersEntity } from "@/infra/db/repositories/collection-member/list-collection-members";
import { schemas } from "./schema";
import { listMembersErrors } from "./errors";

export const listMembersHandler: RouteHandler<typeof schemas> = async (ctx) => {
  const { collectionId } = ctx.params;
  const { id: userId } = ctx.user;

  const collection = await getCollectionEntity({ id: collectionId });

  await listMembersErrors(collection, userId);

  const members = await listCollectionMembersEntity({ collectionId });

  return {
    status: HttpStatus.OK,
    data: members.map((member) => member.toSnapshot()),
  };
};

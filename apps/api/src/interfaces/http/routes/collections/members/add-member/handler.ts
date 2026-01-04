import type { RouteHandler } from "@/shared/lib/route";
import { HttpStatus } from "@/shared/enums/http-status.enum";
import { getUserSelect } from "@/infra/db/repositories/user/get-user";
import { createCollectionMember } from "./db-access";
import { addMemberErrors, selectError } from "./errors";
import { schemas } from "./schema";
import { getCollectionSelect } from "@/infra/db/repositories/collection/get-collection";
import { CollectionPolicies } from "@cookmate/domain";

export const addMemberHandler: RouteHandler<typeof schemas> = async (ctx) => {
  const { collectionId } = ctx.params;
  const { email } = ctx.body;
  const { id: userId } = ctx.user;

  const collection = await getCollectionSelect({ id: collectionId }, selectError);
  CollectionPolicies.assertCanAddMember(collection.userId, userId);

  const userToAdd = await getUserSelect({ email }, { id: true });

  await addMemberErrors(collection, userToAdd.id);

  const member = await createCollectionMember({
    collectionId,
    userId: userToAdd.id,
  });

  return { status: HttpStatus.Created, data: member.toSnapshot() };
};

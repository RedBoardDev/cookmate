import { CollectionPolicies } from "@cookmate/domain/collection";
import { getCollectionSelect } from "@/infra/db/repositories/collection/get-collection";
import { getUserSelect } from "@/infra/db/repositories/user/get-user";
import { HttpStatus } from "@/shared/enums/http-status.enum";
import type { RouteHandler } from "@/shared/lib/route";
import { addCollectionMember } from "./db-access";
import { addMemberErrors, selectError } from "./errors";
import type { schemas } from "./schema";

export const addMemberHandler: RouteHandler<typeof schemas> = async (ctx) => {
  const { collectionId } = ctx.params;
  const { email } = ctx.body;
  const { id: userId } = ctx.user;

  const collection = await getCollectionSelect({ id: collectionId }, selectError);
  CollectionPolicies.assertCanAddMember(collection.userId, userId);

  const userToAdd = await getUserSelect({ email }, { id: true, email: true, avatar: true });

  await addMemberErrors(collection, userToAdd.id);

  const result = await addCollectionMember({
    collectionId,
    userId: userToAdd.id,
    email: userToAdd.email,
    avatar: userToAdd.avatar,
  });

  return { status: HttpStatus.Created, data: result };
};

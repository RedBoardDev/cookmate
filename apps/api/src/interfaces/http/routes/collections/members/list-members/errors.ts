import { CollectionPolicies } from "@cookmate/domain/collection";
import { getCollectionSelect } from "@/infra/db/repositories/collection/get-collection";
import { findFirstCollectionMember } from "@/infra/db/repositories/collection-member/get-collection-member";

export const listMembersErrors = async (collectionId: string, userId: string): Promise<void> => {
  const collection = await getCollectionSelect({ id: collectionId }, { id: true, userId: true });

  const isOwner = CollectionPolicies.isOwner(collection.userId, userId);
  const membership = isOwner
    ? null
    : await findFirstCollectionMember({ collectionId: collection.id, userId }, { id: true });
  const isMember = isOwner || Boolean(membership);

  CollectionPolicies.assertCanView(collection.userId, userId, isMember);
};

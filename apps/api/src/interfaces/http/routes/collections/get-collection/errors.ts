import { findFirstCollectionMember } from "@/infra/db/repositories/collection-member/get-collection-member";
import type { CollectionEntity } from "@cookmate/domain/collection";

export const getCollectionErrors = async (
  collection: CollectionEntity,
  userId: string
): Promise<void> => {
  const isOwner = collection.isOwner(userId);

  const membership = isOwner
    ? null
    : await findFirstCollectionMember({ collectionId: collection.id, userId }, { id: true });
  const isMember = isOwner || Boolean(membership);

  collection.assertCanViewMembers(userId, isMember);
};

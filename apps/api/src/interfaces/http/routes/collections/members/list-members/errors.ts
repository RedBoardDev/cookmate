import { CollectionEntity } from "@cookmate/domain/collection";
import { findFirstCollectionMember } from "@/infra/db/repositories/collection-member/get-collection-member";

export const listMembersErrors = async (collection: CollectionEntity, userId: string): Promise<void> => {
  const isOwner = collection.isOwner(userId);

  const membership = isOwner
    ? null
    : await findFirstCollectionMember({ collectionId: collection.id, userId }, { id: true });
  const isMember = isOwner || Boolean(membership);

  collection.assertCanViewMembers(userId, isMember);
};
import type { CollectionEntity } from "@cookmate/domain/collection";
import { findFirstCollectionMember } from "@/infra/db/repositories/collection-member/get-collection-member";
import { CollectionMemberAlreadyExistsError } from "@cookmate/domain/collection-member";

export const addMemberErrors = async (
  collection: CollectionEntity,
  userToAddId: string
): Promise<void> => {
  const existingMember = await findFirstCollectionMember(
    { collectionId: collection.id, userId: userToAddId },
    { id: true }
  );
  if (existingMember) throw new CollectionMemberAlreadyExistsError();
};

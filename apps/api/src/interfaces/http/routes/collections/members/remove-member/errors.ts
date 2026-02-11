import { CollectionPolicies } from "@cookmate/domain";
import { getCollectionSelect } from "@/infra/db/repositories/collection/get-collection";

export const removeMemberErrors = async (
  collectionId: string,
  currentUserId: string,
  memberId: string,
): Promise<void> => {
  const collection = await getCollectionSelect({ id: collectionId }, { userId: true });

  CollectionPolicies.assertOwner(collection.userId, currentUserId);
  CollectionPolicies.assertCanRemoveMember(collection.userId, memberId);
};

import { CollectionPolicies } from "@cookmate/domain";
import { getCollectionSelect } from "@/infra/db/repositories/collection/get-collection";

export const deleteCollectionErrors = async (collectionId: string, userId: string): Promise<void> => {
  const collection = await getCollectionSelect({ id: collectionId }, { userId: true });
  CollectionPolicies.assertOwner(collection.userId, userId);
};

import { getCollectionSelect } from "@/infra/db/repositories/collection/get-collection";
import { CollectionPolicies } from "@cookmate/domain";

export const deleteCollectionErrors = async (collectionId: string, userId: string): Promise<void> => {
  const collection = await getCollectionSelect({ id: collectionId }, { userId: true });
  CollectionPolicies.assertOwner(collection.userId, userId);
};

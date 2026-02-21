import { CollectionPolicies } from "@cookmate/domain/collection";
import { getCollectionSelect } from "@/infra/db/repositories/collection/get-collection";

export const deleteCollectionErrors = async (collectionId: string, userId: string): Promise<void> => {
  const collection = await getCollectionSelect({ id: collectionId }, { ownerId: true });
  CollectionPolicies.assertOwner(collection.ownerId, userId);
};

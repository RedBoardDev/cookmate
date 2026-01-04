import { findFirstCollectionMember } from "@/infra/db/repositories/collection-member/get-collection-member";
import { CollectionPolicies } from "@cookmate/domain";
import type { SelectResult } from "./select";

export const getCollectionErrors = async (
  collection: SelectResult,
  userId: string
) => {
  const isOwner = CollectionPolicies.isOwner(collection.userId, userId);
  const membership = isOwner
    ? null
    : await findFirstCollectionMember({ collectionId: collection.id, userId }, { id: true });
  const isMember = isOwner || Boolean(membership);

  CollectionPolicies.assertCanView(collection.userId, userId, isMember);

  return isOwner;
};

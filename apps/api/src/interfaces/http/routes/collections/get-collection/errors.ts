import { CollectionPolicies } from "@cookmate/domain/collection";
import type { SelectResult } from "./select";

export const getCollectionErrors = (collection: SelectResult, userId: string): void => {
  CollectionPolicies.assertOwner(collection.ownerId, userId);
};

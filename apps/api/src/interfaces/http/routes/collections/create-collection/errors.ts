import { countCollections } from "@/infra/db/repositories/collection/count-collections";
import { CollectionLimitReachedError } from "@cookmate/domain/collection";

const MAX_COLLECTIONS_PER_USER = 15;

export const createCollectionErrors = async (userId: string): Promise<void> => {
  const total = await countCollections({ userId });
  if (total >= MAX_COLLECTIONS_PER_USER) {
    throw new CollectionLimitReachedError(MAX_COLLECTIONS_PER_USER);
  }
};

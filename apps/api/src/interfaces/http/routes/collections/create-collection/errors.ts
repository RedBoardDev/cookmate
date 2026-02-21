import { UserPolicies } from "@cookmate/domain/user";
import { countCollections } from "@/infra/db/repositories/collection/count-collections";

export const createCollectionErrors = async (userId: string): Promise<void> => {
  const total = await countCollections({ ownerId: userId });
  UserPolicies.assertReachMaxCollections(total);
};

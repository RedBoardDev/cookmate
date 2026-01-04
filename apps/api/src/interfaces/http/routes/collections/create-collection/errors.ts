import { countCollections } from "@/infra/db/repositories/collection/count-collections";
import { UserPolicies } from "@cookmate/domain/user";

export const createCollectionErrors = async (userId: string): Promise<void> => {
  const total = await countCollections({ userId });
  UserPolicies.assertReachMaxCollections(total);
};

import { CollectionPolicies } from "@cookmate/domain/collection";
import type { Prisma } from "@/generated/prisma/client";
import { getCollectionSelect } from "@/infra/db/repositories/collection/get-collection";
import { findFirstCollectionMember } from "@/infra/db/repositories/collection-member/get-collection-member";
import { getRecipeSelect } from "@/infra/db/repositories/recipe/get-recipe";

const selectCollection = {
  id: true,
  userId: true,
} satisfies Prisma.CollectionSelect;

export const updateRecipeCollectionsErrors = async (
  recipeId: string,
  collectionIds: string[],
  userId: string,
): Promise<void> => {
  await getRecipeSelect({ id: recipeId }, { id: true, userId: true });

  // * Verify each collection exists and user is owner or member
  for (const collectionId of collectionIds) {
    const collection = await getCollectionSelect({ id: collectionId }, selectCollection);

    const isOwner = CollectionPolicies.isOwner(collection.userId, userId);
    const membership = isOwner
      ? null
      : await findFirstCollectionMember({ collectionId: collection.id, userId }, { id: true });
    const isMember = isOwner || Boolean(membership);

    CollectionPolicies.assertCanAddRecipe(collection.userId, userId, isMember);
  }
};

import { CollectionPolicies } from "@cookmate/domain/collection";
import type { Prisma } from "@/generated/prisma/client";
import { getCollectionSelect } from "@/infra/db/repositories/collection/get-collection";
import { getRecipeSelect } from "@/infra/db/repositories/recipe/get-recipe";

const selectCollection = {
  id: true,
  ownerId: true,
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
    CollectionPolicies.assertOwner(collection.ownerId, userId);
  }
};

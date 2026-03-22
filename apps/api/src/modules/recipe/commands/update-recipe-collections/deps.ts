import { CollectionPolicies } from "@cookmate/domain/collection";
import { collectionReader } from "@/modules/collection";
import { recipeReader } from "../../infra/prisma/recipe-reader";
import { recipeWriter } from "../../infra/prisma/recipe-writer";

export type UpdateRecipeCollectionsDeps = {
  getCurrentCollectionIds: (recipeId: string) => Promise<string[]>;
  assertCollectionOwnership: (collectionId: string, userId: string) => Promise<void>;
  syncRecipeCollections: (input: { recipeId: string; collectionIds: string[] }) => Promise<{ success: boolean }>;
};

export const defaultUpdateRecipeCollectionsDeps: UpdateRecipeCollectionsDeps = {
  getCurrentCollectionIds: async (recipeId) => {
    const recipe = await recipeReader.getById(
      { id: recipeId },
      {
        collections: {
          select: { id: true },
        },
      },
    );

    return recipe.collections.map((collection) => collection.id);
  },
  assertCollectionOwnership: async (collectionId, userId) => {
    const collection = await collectionReader.getById({ id: collectionId }, { ownerId: true });
    CollectionPolicies.assertOwner(collection.ownerId, userId);
  },
  syncRecipeCollections: async ({ recipeId, collectionIds }) =>
    recipeWriter.updateCollections({
      recipeId,
      collectionIds,
    }),
};

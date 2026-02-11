import { getPrisma } from "@/infra/db/prisma";
import { getRecipeSelect } from "@/infra/db/repositories/recipe/get-recipe";
import { arraysEqual } from "@/shared/utils/array-utils";
import { handleError } from "@/shared/utils/handle-error";

interface UpdateRecipeCollectionsInput {
  recipeId: string;
  collectionIds: string[];
}

const getCurrentCollectionIds = async (recipeId: string): Promise<string[]> => {
  const recipe = await getRecipeSelect(
    { id: recipeId },
    {
      collections: {
        select: { id: true },
      },
    },
  );
  return recipe.collections.map((c) => c.id);
};

const syncRecipeCollections = async (
  recipeId: string,
  targetCollectionIds: string[],
  currentCollectionIds: string[],
): Promise<void> => {
  const toDisconnect = currentCollectionIds.filter((id) => !targetCollectionIds.includes(id)).map((id) => ({ id }));

  const toConnect = targetCollectionIds.filter((id) => !currentCollectionIds.includes(id)).map((id) => ({ id }));

  await getPrisma().recipe.update({
    where: { id: recipeId },
    data: {
      collections: {
        ...(toDisconnect.length > 0 && { disconnect: toDisconnect }),
        ...(toConnect.length > 0 && { connect: toConnect }),
      },
    },
  });
};

const updateRecipeCollectionsFn = async (input: UpdateRecipeCollectionsInput) => {
  const currentCollectionIds = await getCurrentCollectionIds(input.recipeId);

  // * Check if update is needed by comparing arrays
  if (arraysEqual(currentCollectionIds, input.collectionIds)) {
    return { success: true };
  }

  await syncRecipeCollections(input.recipeId, input.collectionIds, currentCollectionIds);

  return { success: true };
};

export const updateRecipeCollections = handleError(updateRecipeCollectionsFn);

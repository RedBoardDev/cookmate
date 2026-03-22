import { arraysEqual } from "@/shared/utils/array-utils";
import { handleError } from "@/shared/utils/handle-error";
import type { UpdateRecipeCollectionsCommand, UpdateRecipeCollectionsResult } from "./contract";
import { defaultUpdateRecipeCollectionsDeps } from "./deps";

const deps = defaultUpdateRecipeCollectionsDeps;

function uniqueCollectionIds(collectionIds: string[]): string[] {
  return [...new Set(collectionIds)];
}

export const executeUpdateRecipeCollections = handleError(
  async (input: UpdateRecipeCollectionsCommand): Promise<UpdateRecipeCollectionsResult> => {
    const targetCollectionIds = uniqueCollectionIds(input.collectionIds);
    const currentCollectionIds = await deps.getCurrentCollectionIds(input.recipeId);

    for (const collectionId of targetCollectionIds) {
      await deps.assertCollectionOwnership(collectionId, input.userId);
    }

    if (arraysEqual(currentCollectionIds, targetCollectionIds)) {
      return { success: true };
    }

    return deps.syncRecipeCollections({
      recipeId: input.recipeId,
      collectionIds: targetCollectionIds,
    });
  },
);

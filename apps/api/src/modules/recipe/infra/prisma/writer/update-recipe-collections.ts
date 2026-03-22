import { getPrisma } from "@/infra/db/prisma";
import { handleError } from "@/shared/utils/handle-error";

export const updateCollections = handleError(
  async (input: { recipeId: string; collectionIds: string[] }): Promise<{ success: boolean }> => {
    const recipe = await getPrisma().recipe.findUniqueOrThrow({
      where: { id: input.recipeId },
      select: {
        collections: {
          select: { id: true },
        },
      },
    });

    const currentCollectionIds = recipe.collections.map((collection) => collection.id);
    const toDisconnect = currentCollectionIds.filter((id) => !input.collectionIds.includes(id)).map((id) => ({ id }));
    const toConnect = input.collectionIds.filter((id) => !currentCollectionIds.includes(id)).map((id) => ({ id }));

    if (toDisconnect.length === 0 && toConnect.length === 0) {
      return { success: true };
    }

    await getPrisma().recipe.update({
      where: { id: input.recipeId },
      data: {
        collections: {
          ...(toDisconnect.length > 0 && { disconnect: toDisconnect }),
          ...(toConnect.length > 0 && { connect: toConnect }),
        },
      },
    });

    return { success: true };
  },
);

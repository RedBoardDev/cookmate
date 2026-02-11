import { HttpStatus } from "@/shared/enums/http-status.enum";
import type { RouteHandler } from "@/shared/lib/route";
import { updateRecipeCollections } from "./db-access";
import { updateRecipeCollectionsErrors } from "./errors";
import type { schemas } from "./schema";

export const updateRecipeCollectionsHandler: RouteHandler<typeof schemas> = async (ctx) => {
  const { recipeId } = ctx.params;
  const { collectionIds } = ctx.body;
  const { id: userId } = ctx.user;

  await updateRecipeCollectionsErrors(recipeId, collectionIds, userId);

  const result = await updateRecipeCollections({
    recipeId,
    collectionIds,
  });

  return { status: HttpStatus.OK, data: result };
};

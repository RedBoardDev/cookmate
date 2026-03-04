import { HttpStatus } from "@/shared/enums/http-status.enum";
import type { RouteHandler } from "@/shared/lib/route";
import { updateRecipe } from "./db-access";
import { updateRecipeErrors } from "./errors";
import type { schemas } from "./schema";

export const updateRecipeHandler: RouteHandler<typeof schemas> = async (ctx) => {
  const { recipeId } = ctx.params;
  const { id: userId } = ctx.user;

  const existingRecipe = await updateRecipeErrors(recipeId, userId);

  const updatedRecipe = await updateRecipe({
    recipeId,
    userId,
    existingRecipe,
    ...ctx.body,
  });

  return {
    status: HttpStatus.OK,
    data: updatedRecipe,
  };
};

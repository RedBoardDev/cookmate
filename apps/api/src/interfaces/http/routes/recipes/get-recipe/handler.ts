import { getRecipeSelect } from "@/infra/db/repositories/recipe/get-recipe";
import { HttpStatus } from "@/shared/enums/http-status.enum";
import type { RouteHandler } from "@/shared/lib/route";
import { schemas } from "./schema";
import { selectConfig } from "./select";
import { getRecipeErrors } from "./errors";

export const getRecipeHandler: RouteHandler<typeof schemas> = async (ctx) => {
  const { recipeId } = ctx.params;
  const { id: userId } = ctx.user;

  const recipe = await getRecipeSelect({ id: recipeId }, selectConfig.select);

  getRecipeErrors(recipe, userId);

  return {
    status: HttpStatus.OK,
    data: selectConfig.transform(recipe),
  };
};

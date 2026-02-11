import { getRecipeSelect } from "@/infra/db/repositories/recipe/get-recipe";
import type { RecipeSelectResult } from "@/infra/db/repositories/recipe/types";
import { HttpStatus } from "@/shared/enums/http-status.enum";
import type { RouteHandler } from "@/shared/lib/route";
import { getRecipeIdByShortUrlErrors } from "./errors";
import type { schemas } from "./schema";

const select = {
  id: true,
  userId: true,
} as const;

export type RecipeByShortUrlSelectResult = RecipeSelectResult<typeof select>;

export const getRecipeIdByShortUrlHandler: RouteHandler<typeof schemas> = async (ctx) => {
  const { shortUrl } = ctx.params;
  const { id: userId } = ctx.user;

  const recipe = await getRecipeSelect({ shortUrl }, select);

  getRecipeIdByShortUrlErrors(recipe, userId);

  return {
    status: HttpStatus.OK,
    data: { id: recipe.id },
  };
};

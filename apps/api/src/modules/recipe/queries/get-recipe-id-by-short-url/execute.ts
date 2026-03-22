import { RecipePolicies } from "@cookmate/domain/recipe";
import type { z } from "zod";
import { handleError } from "@/shared/utils/handle-error";
import type { params, response } from "../../http/routes/get-recipe-id-by-short-url/schema";
import { recipeReader } from "../../infra/prisma/recipe-reader";

const select = {
  id: true,
  userId: true,
} as const;

export type GetRecipeIdByShortUrlInput = z.infer<typeof params> & {
  readonly userId: string;
};

export type GetRecipeIdByShortUrlResult = z.infer<(typeof response)[200]>;

const executeGetRecipeIdByShortUrlFn = async (
  input: GetRecipeIdByShortUrlInput,
): Promise<GetRecipeIdByShortUrlResult> => {
  const recipe = await recipeReader.getById({ shortUrl: input.shortUrl }, select);

  RecipePolicies.assertCanView(recipe.userId, input.userId);

  return { id: recipe.id };
};

export const executeGetRecipeIdByShortUrl = handleError(executeGetRecipeIdByShortUrlFn);

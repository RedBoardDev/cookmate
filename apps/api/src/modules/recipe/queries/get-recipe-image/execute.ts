import { RecipePolicies } from "@cookmate/domain/recipe";
import type { z } from "zod";
import { handleError } from "@/shared/utils/handle-error";
import type { params, response } from "../../http/routes/get-recipe-image/schema";
import { selectConfig } from "../../http/routes/get-recipe-image/select";
import { recipeImageReader } from "../../infra/prisma/recipe-image-reader";
import { recipeReader } from "../../infra/prisma/recipe-reader";

export type GetRecipeImageInput = z.infer<typeof params> & {
  readonly userId: string;
};

export type GetRecipeImageResult = z.infer<(typeof response)[200]>;

const getRecipeImageExecuteFn = async (input: GetRecipeImageInput): Promise<GetRecipeImageResult> => {
  const recipeImage = await recipeImageReader.getById({ id: input.imageId }, selectConfig.select);
  const recipe = await recipeReader.getById({ id: recipeImage.recipeId }, { id: true, userId: true });

  RecipePolicies.assertCanView(recipe.userId, input.userId);

  return selectConfig.transform(recipeImage);
};

export const executeGetRecipeImage = handleError(getRecipeImageExecuteFn);

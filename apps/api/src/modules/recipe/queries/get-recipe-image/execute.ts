import { RecipePolicies } from "@cookmate/domain/recipe";
import { handleError } from "@/shared/utils/handle-error";
import { getRecipeImageSelect } from "../../infra/prisma/recipe-image-reader";
import { getRecipeSelect } from "../../infra/prisma/recipe-reader";
import { selectConfig } from "../../http/routes/get-recipe-image/select";
import type { z } from "zod";
import type { params, response } from "../../http/routes/get-recipe-image/schema";

export type GetRecipeImageInput = z.infer<typeof params> & {
  readonly userId: string;
};

export type GetRecipeImageResult = z.infer<(typeof response)[200]>;

const getRecipeImageExecuteFn = async (input: GetRecipeImageInput): Promise<GetRecipeImageResult> => {
  const recipeImage = await getRecipeImageSelect({ id: input.imageId }, selectConfig.select);
  const recipe = await getRecipeSelect({ id: recipeImage.recipeId }, { id: true, userId: true });

  RecipePolicies.assertCanView(recipe.userId, input.userId);

  return selectConfig.transform(recipeImage);
};

export const executeGetRecipeImage = handleError(getRecipeImageExecuteFn);

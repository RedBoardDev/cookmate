import { RecipePolicies } from "@cookmate/domain/recipe";
import type { z } from "zod";
import type { params, response } from "../../http/routes/get-recipe/schema";
import { selectConfig } from "../../http/routes/get-recipe/select";
import { recipeReader } from "../../infra/prisma/recipe-reader";

export type GetRecipeInput = z.infer<typeof params> & {
  readonly userId: string;
};

export type GetRecipeResult = z.infer<(typeof response)[200]>;

export async function executeGetRecipe(input: GetRecipeInput): Promise<GetRecipeResult> {
  const recipe = await recipeReader.getById({ id: input.recipeId }, selectConfig.select);

  RecipePolicies.assertCanView(recipe.userId, input.userId);

  return selectConfig.transform(recipe);
}

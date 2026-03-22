import type { z } from "zod";
import type { params, response } from "../../http/routes/get-recipe/schema";
import { selectConfig } from "../../http/routes/get-recipe/select";
import { getRecipeSelect } from "../../infra/prisma/recipe-reader";
import { RecipePolicies } from "@cookmate/domain/recipe";

export type GetRecipeInput = z.infer<typeof params> & {
  readonly userId: string;
};

export type GetRecipeResult = z.infer<(typeof response)[200]>;

export async function executeGetRecipe(input: GetRecipeInput): Promise<GetRecipeResult> {
  const recipe = await getRecipeSelect({ id: input.recipeId }, selectConfig.select);

  RecipePolicies.assertCanView(recipe.userId, input.userId);

  return selectConfig.transform(recipe);
}

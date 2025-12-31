import type { Prisma } from "@/generated/prisma/client";
import { getPrisma } from "@/infra/db/prisma";

/**
 * COUNT
 */
const countRecipeIngredientsQuery = (where: Prisma.RecipeIngredientWhereInput) => getPrisma().recipeIngredient.count({ where: { ...where } });

export type countRecipeIngredientsQueryType = Awaited<ReturnType<typeof countRecipeIngredientsQuery>>;

export const countRecipeIngredients = async (where: Prisma.RecipeIngredientWhereInput): Promise<countRecipeIngredientsQueryType> => {
  return await countRecipeIngredientsQuery(where);
};

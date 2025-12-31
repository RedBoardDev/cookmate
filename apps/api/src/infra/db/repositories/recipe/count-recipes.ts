import type { Prisma } from "@/generated/prisma/client";
import { getPrisma } from "@/infra/db/prisma";

/**
 * COUNT
 */
const countRecipesQuery = (where: Prisma.RecipeWhereInput) => getPrisma().recipe.count({ where: { ...where } });

export type countRecipesQueryType = Awaited<ReturnType<typeof countRecipesQuery>>;

export const countRecipes = async (where: Prisma.RecipeWhereInput): Promise<countRecipesQueryType> => {
  return await countRecipesQuery(where);
};

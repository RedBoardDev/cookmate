import type { Prisma } from "@/generated/prisma/client";
import { getPrisma } from "@/infra/db/prisma";

/**
 * COUNT
 */
const countDiscoverRecipesQuery = (where: Prisma.DiscoverRecipeWhereInput) =>
  getPrisma().discoverRecipe.count({ where: { ...where } });

export type countDiscoverRecipesQueryType = Awaited<ReturnType<typeof countDiscoverRecipesQuery>>;

export const countDiscoverRecipes = async (
  where: Prisma.DiscoverRecipeWhereInput,
): Promise<countDiscoverRecipesQueryType> => {
  return await countDiscoverRecipesQuery(where);
};

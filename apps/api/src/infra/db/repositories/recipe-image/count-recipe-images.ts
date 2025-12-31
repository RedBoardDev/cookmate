import type { Prisma } from "@/generated/prisma/client";
import { getPrisma } from "@/infra/db/prisma";

/**
 * COUNT
 */
const countRecipeImagesQuery = (where: Prisma.RecipeImageWhereInput) => getPrisma().recipeImage.count({ where: { ...where } });

export type countRecipeImagesQueryType = Awaited<ReturnType<typeof countRecipeImagesQuery>>;

export const countRecipeImages = async (where: Prisma.RecipeImageWhereInput): Promise<countRecipeImagesQueryType> => {
  return await countRecipeImagesQuery(where);
};

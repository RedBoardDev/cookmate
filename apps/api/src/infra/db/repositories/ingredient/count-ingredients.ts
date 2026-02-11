import type { Prisma } from "@/generated/prisma/client";
import { getPrisma } from "@/infra/db/prisma";

/**
 * COUNT
 */
const countIngredientsQuery = (where: Prisma.IngredientWhereInput) =>
  getPrisma().ingredient.count({ where: { ...where } });

export type countIngredientsQueryType = Awaited<ReturnType<typeof countIngredientsQuery>>;

export const countIngredients = async (where: Prisma.IngredientWhereInput): Promise<countIngredientsQueryType> => {
  return await countIngredientsQuery(where);
};

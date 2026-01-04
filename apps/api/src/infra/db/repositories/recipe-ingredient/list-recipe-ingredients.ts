import type { Prisma } from "@/generated/prisma/client";
import { getPrisma } from "@/infra/db/prisma";
import { handleError } from "@/shared/utils/handle-error";
import { paginationForComplexQuery, type Pagination } from "@/shared/lib/pagination";
import type { RecipeIngredientSelectResult } from "./types";

/**
 * LIST
 */
const listRecipeIngredientsSelectFn = async <TSelect extends Prisma.RecipeIngredientSelect>(
  where: Prisma.RecipeIngredientWhereInput,
  select: TSelect,
  orderBy?:
    | Prisma.RecipeIngredientOrderByWithRelationInput
    | Prisma.RecipeIngredientOrderByWithRelationInput[],
  pagination?: Pagination
): Promise<RecipeIngredientSelectResult<TSelect>[]> => {
  const paginationQuery = await paginationForComplexQuery(pagination, () =>
    countRecipeIngredientsAboveId(pagination?.findId, where)
  );

  return getPrisma().recipeIngredient.findMany({
    where,
    select,
    orderBy: orderBy ?? { id: "desc" },
    ...paginationQuery,
  });
};

export const listRecipeIngredientsSelect = handleError(listRecipeIngredientsSelectFn);

/**
 * COUNT
 */
const countRecipeIngredientsAboveId = async (
  id: string | undefined,
  where?: Prisma.RecipeIngredientWhereInput
): Promise<number | undefined> => {
  if (!id) return undefined;
  return getPrisma().recipeIngredient.count({
    where: { ...where, id: { gt: id } },
  });
};

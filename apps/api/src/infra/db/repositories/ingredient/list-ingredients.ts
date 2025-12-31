import type { Prisma } from "@/generated/prisma/client";
import { getPrisma } from "@/infra/db/prisma";
import { handleError } from "@/shared/utils/handle-error";
import { paginationForComplexQuery, type Pagination } from "@/shared/lib/pagination";
import type { IngredientSelectResult } from "./types";

/**
 * LIST
 */
const listIngredientsSelectFn = async <TSelect extends Prisma.IngredientSelect>(
  where: Prisma.IngredientWhereInput,
  select: TSelect,
  orderBy?: Prisma.IngredientOrderByWithRelationInput | Prisma.IngredientOrderByWithRelationInput[],
  pagination?: Pagination
): Promise<IngredientSelectResult<TSelect>[]> => {
  const paginationQuery = await paginationForComplexQuery(pagination, () =>
    countIngredientsAboveId(pagination?.findId, where)
  );

  return getPrisma().ingredient.findMany({
    where,
    select,
    orderBy: orderBy ?? { id: "desc" },
    ...paginationQuery,
  });
};

export const listIngredientsSelect = handleError(listIngredientsSelectFn);

/**
 * COUNT
 */
const countIngredientsAboveId = async (
  id: string | undefined,
  where?: Prisma.IngredientWhereInput
): Promise<number | undefined> => {
  if (!id) return undefined;
  return getPrisma().ingredient.count({
    where: { ...where, id: { gt: id } },
  });
};

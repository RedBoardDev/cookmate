import type { Prisma } from "@/generated/prisma/client";
import { getPrisma } from "@/infra/db/prisma";
import { handleError } from "@/shared/utils/handle-error";
import { paginationForComplexQuery, type Pagination } from "@/shared/lib/pagination";
import type { RecipeSelectResult } from "./types";

/**
 * LIST
 */
const listRecipesSelectFn = async <TSelect extends Prisma.RecipeSelect>(
  where: Prisma.RecipeWhereInput,
  select: TSelect,
  orderBy?: Prisma.RecipeOrderByWithRelationInput | Prisma.RecipeOrderByWithRelationInput[],
  pagination?: Pagination
): Promise<RecipeSelectResult<TSelect>[]> => {
  const paginationQuery = await paginationForComplexQuery(pagination, () =>
    countRecipesAboveId(pagination?.findId, where)
  );

  return getPrisma().recipe.findMany({
    where,
    select,
    orderBy: orderBy ?? { id: "desc" },
    ...paginationQuery,
  });
};

export const listRecipesSelect = handleError(listRecipesSelectFn);

/**
 * COUNT
 */
const countRecipesAboveId = async (
  id: string | undefined,
  where?: Prisma.RecipeWhereInput
): Promise<number | undefined> => {
  if (!id) return undefined;
  return getPrisma().recipe.count({
    where: { ...where, id: { gt: id } },
  });
};

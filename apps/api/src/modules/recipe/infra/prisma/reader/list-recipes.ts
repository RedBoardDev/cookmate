
import type { Prisma } from "@/generated/prisma/client";
import { getPrisma } from "@/infra/db/prisma";
import { type Pagination, paginationForComplexQuery } from "@/shared/lib/pagination";
import { handleError } from "@/shared/utils/handle-error";
import type { RecipeSelectResult } from "./types";

const countAboveId = async (
  id: string | undefined,
  where?: Prisma.RecipeWhereInput,
): Promise<number | undefined> => {
  if (!id) return undefined;
  return getPrisma().recipe.count({
    where: { ...where, id: { gt: id } },
  });
};

const listFn = async <TSelect extends Prisma.RecipeSelect>(
  where: Prisma.RecipeWhereInput,
  select: TSelect,
  orderBy?: Prisma.RecipeOrderByWithRelationInput | Prisma.RecipeOrderByWithRelationInput[],
  pagination?: Pagination,
): Promise<RecipeSelectResult<TSelect>[]> => {
  const paginationQuery = await paginationForComplexQuery(pagination, () => countAboveId(pagination?.findId, where));

  return getPrisma().recipe.findMany({
    where,
    select,
    orderBy: orderBy ?? { id: "desc" },
    ...paginationQuery,
  });
};

export const list = handleError(listFn);

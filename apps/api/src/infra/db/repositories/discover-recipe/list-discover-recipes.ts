import type { Prisma } from "@/generated/prisma/client";
import { getPrisma } from "@/infra/db/prisma";
import { type Pagination, paginationForComplexQuery } from "@/shared/lib/pagination";
import { handleError } from "@/shared/utils/handle-error";
import type { DiscoverRecipeSelectResult } from "./types";

/**
 * LIST
 */
const listDiscoverRecipesSelectFn = async <TSelect extends Prisma.DiscoverRecipeSelect>(
  where: Prisma.DiscoverRecipeWhereInput,
  select: TSelect,
  orderBy?: Prisma.DiscoverRecipeOrderByWithRelationInput | Prisma.DiscoverRecipeOrderByWithRelationInput[],
  pagination?: Pagination,
): Promise<DiscoverRecipeSelectResult<TSelect>[]> => {
  const paginationQuery = await paginationForComplexQuery(pagination, () =>
    countDiscoverRecipesAboveId(pagination?.findId, where),
  );

  return getPrisma().discoverRecipe.findMany({
    where,
    select,
    orderBy: orderBy ?? { id: "desc" },
    ...paginationQuery,
  });
};

export const listDiscoverRecipesSelect = handleError(listDiscoverRecipesSelectFn);

/**
 * COUNT
 */
const countDiscoverRecipesAboveId = async (
  id: string | undefined,
  where?: Prisma.DiscoverRecipeWhereInput,
): Promise<number | undefined> => {
  if (!id) return undefined;
  return getPrisma().discoverRecipe.count({
    where: { ...where, id: { gt: id } },
  });
};

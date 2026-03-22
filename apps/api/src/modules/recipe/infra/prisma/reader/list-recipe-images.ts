import type { Prisma } from "@/generated/prisma/client";
import { getPrisma } from "@/infra/db/prisma";
import { type Pagination, paginationForComplexQuery } from "@/shared/lib/pagination";
import { handleError } from "@/shared/utils/handle-error";
import type { RecipeImageSelectResult } from "./recipe-image-types";

const countAboveId = async (
  id: string | undefined,
  where?: Prisma.RecipeImageWhereInput,
): Promise<number | undefined> => {
  if (!id) return undefined;
  return getPrisma().recipeImage.count({
    where: { ...where, id: { gt: id } },
  });
};

const listFn = async <TSelect extends Prisma.RecipeImageSelect>(
  where: Prisma.RecipeImageWhereInput,
  select: TSelect,
  orderBy?: Prisma.RecipeImageOrderByWithRelationInput | Prisma.RecipeImageOrderByWithRelationInput[],
  pagination?: Pagination,
): Promise<RecipeImageSelectResult<TSelect>[]> => {
  const paginationQuery = await paginationForComplexQuery(pagination, () => countAboveId(pagination?.findId, where));

  return getPrisma().recipeImage.findMany({
    where,
    select,
    orderBy: orderBy ?? { id: "desc" },
    ...paginationQuery,
  });
};

export const list = handleError(listFn);

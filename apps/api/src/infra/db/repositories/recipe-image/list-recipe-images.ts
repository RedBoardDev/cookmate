import type { Prisma } from "@/generated/prisma/client";
import { getPrisma } from "@/infra/db/prisma";
import { type Pagination, paginationForComplexQuery } from "@/shared/lib/pagination";
import { handleError } from "@/shared/utils/handle-error";
import type { RecipeImageSelectResult } from "./types";

/**
 * LIST
 */
const listRecipeImagesSelectFn = async <TSelect extends Prisma.RecipeImageSelect>(
  where: Prisma.RecipeImageWhereInput,
  select: TSelect,
  orderBy?: Prisma.RecipeImageOrderByWithRelationInput | Prisma.RecipeImageOrderByWithRelationInput[],
  pagination?: Pagination,
): Promise<RecipeImageSelectResult<TSelect>[]> => {
  const paginationQuery = await paginationForComplexQuery(pagination, () =>
    countRecipeImagesAboveId(pagination?.findId, where),
  );

  return getPrisma().recipeImage.findMany({
    where,
    select,
    orderBy: orderBy ?? { id: "desc" },
    ...paginationQuery,
  });
};

export const listRecipeImagesSelect = handleError(listRecipeImagesSelectFn);

/**
 * COUNT
 */
const countRecipeImagesAboveId = async (
  id: string | undefined,
  where?: Prisma.RecipeImageWhereInput,
): Promise<number | undefined> => {
  if (!id) return undefined;
  return getPrisma().recipeImage.count({
    where: { ...where, id: { gt: id } },
  });
};

import type { Prisma } from "@/generated/prisma/client";
import { getPrisma } from "@/infra/db/prisma";
import { handleError } from "@/shared/utils/handle-error";
import { DiscoverRecipeNotFoundError } from "@/domain/discover-recipe/errors";
import type { DiscoverRecipeSelectResult } from "./types";

/**
 * GET
 */
const getDiscoverRecipeSelectFn = async <TSelect extends Prisma.DiscoverRecipeSelect>(
  where: Prisma.DiscoverRecipeWhereUniqueInput,
  select: TSelect
): Promise<DiscoverRecipeSelectResult<TSelect>> => {
  const discoverRecipe = await getPrisma().discoverRecipe.findUnique({ where, select });
  if (!discoverRecipe) throw new DiscoverRecipeNotFoundError(where.id);
  return discoverRecipe;
};

export const getDiscoverRecipeSelect = handleError(getDiscoverRecipeSelectFn);

/**
 * FIND FIRST
 */
const findFirstDiscoverRecipeFn = async <TSelect extends Prisma.DiscoverRecipeSelect>(
  where: Prisma.DiscoverRecipeWhereInput,
  select: TSelect
): Promise<DiscoverRecipeSelectResult<TSelect> | null> => {
  return getPrisma().discoverRecipe.findFirst({ where, select });
};

export const findFirstDiscoverRecipe = handleError(findFirstDiscoverRecipeFn);

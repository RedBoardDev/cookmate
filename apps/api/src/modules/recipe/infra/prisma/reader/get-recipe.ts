import { RecipeNotFoundError } from "@cookmate/domain/recipe";
import type { Prisma } from "@/generated/prisma/client";
import { getPrisma } from "@/infra/db/prisma";
import { handleError } from "@/shared/utils/handle-error";
import type { RecipeSelectResult } from "./types";

const getByIdFn = async <TSelect extends Prisma.RecipeSelect>(
  where: Prisma.RecipeWhereUniqueInput,
  select: TSelect,
): Promise<RecipeSelectResult<TSelect>> => {
  const recipe = await getPrisma().recipe.findUnique({ where, select });
  if (!recipe) {
    throw new RecipeNotFoundError(where.id);
  }
  return recipe;
};

export const getById = handleError(getByIdFn);

const findFirstFn = async <TSelect extends Prisma.RecipeSelect>(
  where: Prisma.RecipeWhereInput,
  select: TSelect,
): Promise<RecipeSelectResult<TSelect> | null> => {
  return getPrisma().recipe.findFirst({ where, select });
};

export const findFirst = handleError(findFirstFn);

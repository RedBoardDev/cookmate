import type { Prisma } from "@/generated/prisma/client";
import { getPrisma } from "@/infra/db/prisma";
import { handleError } from "@/shared/utils/handle-error";
import { RecipeNotFoundError } from "@cookmate/domain/recipe";
import type { RecipeSelectResult } from "./types";

/**
 * GET
 */
const getRecipeSelectFn = async <TSelect extends Prisma.RecipeSelect>(
  where: Prisma.RecipeWhereUniqueInput,
  select: TSelect
): Promise<RecipeSelectResult<TSelect>> => {
  const recipe = await getPrisma().recipe.findUnique({ where, select });
  if (!recipe) throw new RecipeNotFoundError(where.id);
  return recipe;
};

export const getRecipeSelect = handleError(getRecipeSelectFn);

/**
 * FIND FIRST
 */
const findFirstRecipeFn = async <TSelect extends Prisma.RecipeSelect>(
  where: Prisma.RecipeWhereInput,
  select: TSelect
): Promise<RecipeSelectResult<TSelect> | null> => {
  return getPrisma().recipe.findFirst({ where, select });
};

export const findFirstRecipe = handleError(findFirstRecipeFn);

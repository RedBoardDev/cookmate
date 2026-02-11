import { RecipeIngredientNotFoundError } from "@cookmate/domain/recipe-ingredient";
import type { Prisma } from "@/generated/prisma/client";
import { getPrisma } from "@/infra/db/prisma";
import { handleError } from "@/shared/utils/handle-error";
import type { RecipeIngredientSelectResult } from "./types";

/**
 * GET
 */
const getRecipeIngredientSelectFn = async <TSelect extends Prisma.RecipeIngredientSelect>(
  where: Prisma.RecipeIngredientWhereUniqueInput,
  select: TSelect,
): Promise<RecipeIngredientSelectResult<TSelect>> => {
  const recipeIngredient = await getPrisma().recipeIngredient.findUnique({ where, select });
  if (!recipeIngredient) throw new RecipeIngredientNotFoundError(where.id);
  return recipeIngredient;
};

export const getRecipeIngredientSelect = handleError(getRecipeIngredientSelectFn);

/**
 * FIND FIRST
 */
const findFirstRecipeIngredientFn = async <TSelect extends Prisma.RecipeIngredientSelect>(
  where: Prisma.RecipeIngredientWhereInput,
  select: TSelect,
): Promise<RecipeIngredientSelectResult<TSelect> | null> => {
  return getPrisma().recipeIngredient.findFirst({ where, select });
};

export const findFirstRecipeIngredient = handleError(findFirstRecipeIngredientFn);

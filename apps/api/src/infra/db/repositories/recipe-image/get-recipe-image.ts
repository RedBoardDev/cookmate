import type { Prisma } from "@/generated/prisma/client";
import { getPrisma } from "@/infra/db/prisma";
import { handleError } from "@/shared/utils/handle-error";
import { RecipeImageNotFoundError } from "@cookmate/domain/recipe-image";
import type { RecipeImageSelectResult } from "./types";

/**
 * GET
 */
const getRecipeImageSelectFn = async <TSelect extends Prisma.RecipeImageSelect>(
  where: Prisma.RecipeImageWhereUniqueInput,
  select: TSelect
): Promise<RecipeImageSelectResult<TSelect>> => {
  const recipeImage = await getPrisma().recipeImage.findUnique({ where, select });
  if (!recipeImage) throw new RecipeImageNotFoundError(where.id);
  return recipeImage;
};

export const getRecipeImageSelect = handleError(getRecipeImageSelectFn);

/**
 * FIND FIRST
 */
const findFirstRecipeImageFn = async <TSelect extends Prisma.RecipeImageSelect>(
  where: Prisma.RecipeImageWhereInput,
  select: TSelect
): Promise<RecipeImageSelectResult<TSelect> | null> => {
  return getPrisma().recipeImage.findFirst({ where, select });
};

export const findFirstRecipeImage = handleError(findFirstRecipeImageFn);

import { RecipeImageNotFoundError } from "@cookmate/domain/recipe-image";
import type { Prisma } from "@/generated/prisma/client";
import { getPrisma } from "@/infra/db/prisma";
import { handleError } from "@/shared/utils/handle-error";
import type { RecipeImageSelectResult } from "./recipe-image-types";

const getByIdFn = async <TSelect extends Prisma.RecipeImageSelect>(
  where: Prisma.RecipeImageWhereUniqueInput,
  select: TSelect,
): Promise<RecipeImageSelectResult<TSelect>> => {
  const recipeImage = await getPrisma().recipeImage.findUnique({ where, select });
  if (!recipeImage) {
    throw new RecipeImageNotFoundError(where.id);
  }
  return recipeImage;
};

export const getById = handleError(getByIdFn);

const findFirstFn = async <TSelect extends Prisma.RecipeImageSelect>(
  where: Prisma.RecipeImageWhereInput,
  select: TSelect,
): Promise<RecipeImageSelectResult<TSelect> | null> => {
  return getPrisma().recipeImage.findFirst({ where, select });
};

export const findFirst = handleError(findFirstFn);

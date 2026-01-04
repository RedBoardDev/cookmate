import type { Prisma } from "@/generated/prisma/client";
import { getPrisma } from "@/infra/db/prisma";
import { handleError } from "@/shared/utils/handle-error";
import { IngredientNotFoundError } from "@cookmate/domain/ingredient";
import type { IngredientSelectResult } from "./types";

/**
 * GET
 */
const getIngredientSelectFn = async <TSelect extends Prisma.IngredientSelect>(
  where: Prisma.IngredientWhereUniqueInput,
  select: TSelect
): Promise<IngredientSelectResult<TSelect>> => {
  const ingredient = await getPrisma().ingredient.findUnique({ where, select });
  if (!ingredient) throw new IngredientNotFoundError(where.id);
  return ingredient;
};

export const getIngredientSelect = handleError(getIngredientSelectFn);

/**
 * FIND FIRST
 */
const findFirstIngredientFn = async <TSelect extends Prisma.IngredientSelect>(
  where: Prisma.IngredientWhereInput,
  select: TSelect
): Promise<IngredientSelectResult<TSelect> | null> => {
  return getPrisma().ingredient.findFirst({ where, select });
};

export const findFirstIngredient = handleError(findFirstIngredientFn);

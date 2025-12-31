import type { Prisma } from "@/generated/prisma/client";

export type IngredientSelectResult<TSelect extends Prisma.IngredientSelect> = Prisma.IngredientGetPayload<{
  select: TSelect;
}>;

export type IngredientIncludeResult<TSelect extends Prisma.IngredientInclude> = Prisma.IngredientGetPayload<{
  include: TSelect;
}>;

export type ListIngredientsSelectQueryType = IngredientSelectResult<Prisma.IngredientSelect>[];

export type GetIngredientSelectQueryType = IngredientSelectResult<Prisma.IngredientSelect>;

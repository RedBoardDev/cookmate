import type { Prisma } from "@/generated/prisma/client";

export type RecipeSelectResult<TSelect extends Prisma.RecipeSelect> = Prisma.RecipeGetPayload<{
  select: TSelect;
}>;

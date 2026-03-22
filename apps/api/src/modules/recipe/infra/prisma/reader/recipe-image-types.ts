import type { Prisma } from "@/generated/prisma/client";

export type RecipeImageSelectResult<TSelect extends Prisma.RecipeImageSelect> = Prisma.RecipeImageGetPayload<{
  select: TSelect;
}>;

import type { Prisma } from "@/generated/prisma/client";

export type CollectionSelectResult<TSelect extends Prisma.CollectionSelect> = Prisma.CollectionGetPayload<{
  select: TSelect;
}>;

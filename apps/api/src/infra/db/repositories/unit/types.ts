import type { Prisma } from "@/generated/prisma/client";

export type UnitSelectResult<TSelect extends Prisma.UnitSelect> = Prisma.UnitGetPayload<{
  select: TSelect;
}>;

export type UnitIncludeResult<TSelect extends Prisma.UnitInclude> = Prisma.UnitGetPayload<{
  include: TSelect;
}>;

export type ListUnitsSelectQueryType = UnitSelectResult<Prisma.UnitSelect>[];

export type GetUnitSelectQueryType = UnitSelectResult<Prisma.UnitSelect>;

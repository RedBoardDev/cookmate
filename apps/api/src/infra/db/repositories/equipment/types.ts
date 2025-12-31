import type { Prisma } from "@/generated/prisma/client";

export type EquipmentSelectResult<TSelect extends Prisma.EquipmentSelect> = Prisma.EquipmentGetPayload<{
  select: TSelect;
}>;

export type EquipmentIncludeResult<TSelect extends Prisma.EquipmentInclude> = Prisma.EquipmentGetPayload<{
  include: TSelect;
}>;

export type ListEquipmentsSelectQueryType = EquipmentSelectResult<Prisma.EquipmentSelect>[];

export type GetEquipmentSelectQueryType = EquipmentSelectResult<Prisma.EquipmentSelect>;

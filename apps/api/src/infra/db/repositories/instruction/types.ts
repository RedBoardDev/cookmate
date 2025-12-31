import type { Prisma } from "@/generated/prisma/client";

export type InstructionSelectResult<TSelect extends Prisma.InstructionSelect> = Prisma.InstructionGetPayload<{
  select: TSelect;
}>;

export type InstructionIncludeResult<TSelect extends Prisma.InstructionInclude> = Prisma.InstructionGetPayload<{
  include: TSelect;
}>;

export type ListInstructionsSelectQueryType = InstructionSelectResult<Prisma.InstructionSelect>[];

export type GetInstructionSelectQueryType = InstructionSelectResult<Prisma.InstructionSelect>;

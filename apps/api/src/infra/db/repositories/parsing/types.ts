import type { Prisma } from "@/generated/prisma/client";

export type ParsingJobSelectResult<TSelect extends Prisma.ParsingJobSelect> = Prisma.ParsingJobGetPayload<{
  select: TSelect;
}>;

export type ParsingJobIncludeResult<TInclude extends Prisma.ParsingJobInclude> = Prisma.ParsingJobGetPayload<{
  include: TInclude;
}>;

export type ListParsingJobsSelectQueryType = ParsingJobSelectResult<Prisma.ParsingJobSelect>[];

export type GetParsingJobSelectQueryType = ParsingJobSelectResult<Prisma.ParsingJobSelect>;

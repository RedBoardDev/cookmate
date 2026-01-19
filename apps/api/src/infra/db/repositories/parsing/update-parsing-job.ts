import type { Prisma } from "@/generated/prisma/client";
import { getPrisma } from "@/infra/db/prisma";
import { handleError } from "@/shared/utils/handle-error";
import { ParsingJobNotFoundError } from "@cookmate/domain/recipe-parsing";
import type { ParsingJobSelectResult } from "./types";

/**
 * UPDATE
 */
const updateParsingJobFn = async <TSelect extends Prisma.ParsingJobSelect>(
  where: Prisma.ParsingJobWhereUniqueInput,
  data: Prisma.ParsingJobUpdateInput,
  select: TSelect
): Promise<ParsingJobSelectResult<TSelect>> => {
  const existing = await getPrisma().parsingJob.findUnique({
    where,
    select: { id: true },
  });
  if (!existing) throw new ParsingJobNotFoundError(where.id ?? "unknown");

  return getPrisma().parsingJob.update({ where, data, select });
};

export const updateParsingJob = handleError(updateParsingJobFn);

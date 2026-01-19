import type { Prisma } from "@/generated/prisma/client";
import { getPrisma } from "@/infra/db/prisma";
import { handleError } from "@/shared/utils/handle-error";
import { ParsingJobNotFoundError } from "@cookmate/domain/recipe-parsing";
import type { ParsingJobSelectResult } from "./types";

/**
 * GET
 */
const getParsingJobSelectFn = async <TSelect extends Prisma.ParsingJobSelect>(
  where: Prisma.ParsingJobWhereUniqueInput,
  select: TSelect
): Promise<ParsingJobSelectResult<TSelect>> => {
  const job = await getPrisma().parsingJob.findUnique({ where, select });
  if (!job) throw new ParsingJobNotFoundError(where.id ?? "unknown");
  return job;
};

export const getParsingJobSelect = handleError(getParsingJobSelectFn);

/**
 * FIND FIRST
 */
const findFirstParsingJobFn = async <TSelect extends Prisma.ParsingJobSelect>(
  where: Prisma.ParsingJobWhereInput,
  select: TSelect
): Promise<ParsingJobSelectResult<TSelect> | null> => {
  return getPrisma().parsingJob.findFirst({ where, select });
};

export const findFirstParsingJob = handleError(findFirstParsingJobFn);

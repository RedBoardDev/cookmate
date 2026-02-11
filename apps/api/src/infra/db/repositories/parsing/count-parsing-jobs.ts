import type { Prisma } from "@/generated/prisma/client";
import { getPrisma } from "@/infra/db/prisma";

/**
 * COUNT
 */
const countParsingJobsQuery = (where: Prisma.ParsingJobWhereInput) =>
  getPrisma().parsingJob.count({ where: { ...where } });

export type countParsingJobsQueryType = Awaited<ReturnType<typeof countParsingJobsQuery>>;

export const countParsingJobs = async (where: Prisma.ParsingJobWhereInput): Promise<countParsingJobsQueryType> => {
  return await countParsingJobsQuery(where);
};

import type { Prisma } from "@/generated/prisma/client";
import { getPrisma } from "@/infra/db/prisma";

/**
 * COUNT
 */
const countInstructionsQuery = (where: Prisma.InstructionWhereInput) => getPrisma().instruction.count({ where: { ...where } });

export type countInstructionsQueryType = Awaited<ReturnType<typeof countInstructionsQuery>>;

export const countInstructions = async (where: Prisma.InstructionWhereInput): Promise<countInstructionsQueryType> => {
  return await countInstructionsQuery(where);
};

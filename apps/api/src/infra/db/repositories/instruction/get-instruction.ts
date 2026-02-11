import { InstructionNotFoundError } from "@cookmate/domain/instruction";
import type { Prisma } from "@/generated/prisma/client";
import { getPrisma } from "@/infra/db/prisma";
import { handleError } from "@/shared/utils/handle-error";
import type { InstructionSelectResult } from "./types";

/**
 * GET
 */
const getInstructionSelectFn = async <TSelect extends Prisma.InstructionSelect>(
  where: Prisma.InstructionWhereUniqueInput,
  select: TSelect,
): Promise<InstructionSelectResult<TSelect>> => {
  const instruction = await getPrisma().instruction.findUnique({ where, select });
  if (!instruction) throw new InstructionNotFoundError(where.id);
  return instruction;
};

export const getInstructionSelect = handleError(getInstructionSelectFn);

/**
 * FIND FIRST
 */
const findFirstInstructionFn = async <TSelect extends Prisma.InstructionSelect>(
  where: Prisma.InstructionWhereInput,
  select: TSelect,
): Promise<InstructionSelectResult<TSelect> | null> => {
  return getPrisma().instruction.findFirst({ where, select });
};

export const findFirstInstruction = handleError(findFirstInstructionFn);

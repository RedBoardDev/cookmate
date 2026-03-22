import type { Prisma } from "@/generated/prisma/client";
import { getPrisma } from "@/infra/db/prisma";

const countFn = (where: Prisma.RecipeWhereInput) => getPrisma().recipe.count({ where: { ...where } });

export const count = async (where: Prisma.RecipeWhereInput): Promise<number> => countFn(where);

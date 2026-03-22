import type { Prisma } from "@/generated/prisma/client";
import { getPrisma } from "@/infra/db/prisma";

const countFn = (where: Prisma.RecipeImageWhereInput) => getPrisma().recipeImage.count({ where: { ...where } });

export const count = async (where: Prisma.RecipeImageWhereInput): Promise<number> => countFn(where);

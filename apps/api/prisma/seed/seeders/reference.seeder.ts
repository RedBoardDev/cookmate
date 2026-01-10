import type {
  Equipment,
  Ingredient,
  PrismaClient,
  Unit,
} from "../../../src/generated/prisma/client";
import { EQUIPMENTS } from "../data/equipments";
import { INGREDIENTS } from "../data/ingredients";
import { UNITS } from "../data/units";
import { logger } from "../lib/logger";

export type ReferenceSeedResult = {
  ingredients: Ingredient[];
  equipments: Equipment[];
  units: Unit[];
};

export const seedReferenceData = async (
  prisma: PrismaClient
): Promise<ReferenceSeedResult> => {
  logger.info("Seeding reference data...");

  await prisma.ingredient.createMany({
    data: INGREDIENTS.map((name) => ({ name })),
    skipDuplicates: true,
  });

  await prisma.unit.createMany({
    data: UNITS,
    skipDuplicates: true,
  });

  await prisma.equipment.createMany({
    data: EQUIPMENTS.map((name) => ({ name })),
    skipDuplicates: true,
  });

  const [ingredients, units, equipments] = await prisma.$transaction([
    prisma.ingredient.findMany({ orderBy: { name: "asc" } }),
    prisma.unit.findMany({ orderBy: { name: "asc" } }),
    prisma.equipment.findMany({ orderBy: { name: "asc" } }),
  ]);

  logger.success(
    `Reference data seeded (${ingredients.length} ingredients, ${units.length} units, ` +
      `${equipments.length} equipments)`
  );

  return { ingredients, units, equipments };
};

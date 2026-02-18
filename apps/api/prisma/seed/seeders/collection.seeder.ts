import { faker } from "@faker-js/faker";
import type { Collection, Prisma, PrismaClient, Recipe } from "../../../src/generated/prisma/client";
import type { SeedConfig } from "../config";
import { buildCollectionSeed } from "../factories/collection.factory";
import { logger } from "../lib/logger";
import type { SeededUser } from "./user.seeder";

export type CollectionSeedResult = {
  collections: Collection[];
};

const pickCount = (min: number, max: number): number => faker.number.int({ min, max });

const pickRecipes = (recipes: Recipe[], max: number): Recipe[] => {
  if (recipes.length === 0) {
    return [];
  }
  const count = Math.min(pickCount(1, max), recipes.length);
  return faker.helpers.arrayElements(recipes, count);
};

const ensureUniqueName = (name: string, used: Set<string>, index: number): string => {
  if (!used.has(name)) {
    return name;
  }
  let suffix = index;
  let candidate = `${name} ${suffix}`;
  while (used.has(candidate)) {
    suffix += 1;
    candidate = `${name} ${suffix}`;
  }
  return candidate;
};

export const seedCollections = async (
  prisma: PrismaClient,
  users: SeededUser[],
  recipesByUser: Map<string, Recipe[]>,
  config: SeedConfig,
): Promise<CollectionSeedResult> => {
  logger.info("Seeding collections...");

  const collections: Collection[] = [];
  const members: Prisma.CollectionMemberCreateManyInput[] = [];

  for (const user of users) {
    const userRecipes = recipesByUser.get(user.id) ?? [];
    const collectionCount = pickCount(config.collectionsPerUser.min, config.collectionsPerUser.max);
    const usedNames = new Set<string>();
    const assignedRecipeIds = new Set<string>();
    const userCollections: Collection[] = [];

    for (let i = 0; i < collectionCount; i += 1) {
      const seed = buildCollectionSeed();
      const name = ensureUniqueName(seed.name, usedNames, i + 1);
      usedNames.add(name);

      const selectedRecipes = pickRecipes(userRecipes, Math.min(userRecipes.length, 6));
      for (const recipe of selectedRecipes) {
        assignedRecipeIds.add(recipe.id);
      }

      const collection = await prisma.collection.create({
        data: {
          name,
          description: seed.description,
          emoji: seed.emoji,
          visibility: seed.visibility,
          shortUrl: seed.shortUrl,
          userId: user.id,
          recipes:
            selectedRecipes.length > 0
              ? {
                  connect: selectedRecipes.map((recipe) => ({ id: recipe.id })),
                }
              : undefined,
        },
      });

      collections.push(collection);
      userCollections.push(collection);

      const otherUsers = users.filter((candidate) => candidate.id !== user.id);
      if (otherUsers.length === 0) {
        continue;
      }

      const memberCount = Math.min(otherUsers.length, faker.number.int({ min: 0, max: 2 }));
      const selectedMembers = faker.helpers.arrayElements(otherUsers, memberCount);

      for (const member of selectedMembers) {
        members.push({
          collectionId: collection.id,
          userId: member.id,
        });
      }
    }

    if (userRecipes.length > 0 && userCollections.length > 0) {
      const unassigned = userRecipes.filter((recipe) => !assignedRecipeIds.has(recipe.id));

      if (unassigned.length > 0) {
        const fallback = faker.helpers.arrayElement(userCollections);
        await prisma.collection.update({
          where: { id: fallback.id },
          data: {
            recipes: {
              connect: unassigned.map((recipe) => ({ id: recipe.id })),
            },
          },
        });
      }
    }
  }

  if (members.length > 0) {
    await prisma.collectionMember.createMany({
      data: members,
      skipDuplicates: true,
    });
  }

  logger.success(`Collections seeded (${collections.length} collections, ` + `${members.length} members)`);

  return { collections };
};

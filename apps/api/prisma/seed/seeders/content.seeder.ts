import { faker } from "@faker-js/faker";
import type {
  DiscoverRecipe,
  Ingredient,
  Prisma,
  PrismaClient,
  Recipe,
  Unit,
} from "../../../src/generated/prisma/client";
import type { SeedConfig } from "../config";
import { buildInstructions, buildRecipeImages, buildRecipeIngredients } from "../factories/recipe-content.factory";
import { logger } from "../lib/logger";

export type ContentSeedInput = {
  recipes: Recipe[];
  discoverRecipes: DiscoverRecipe[];
  ingredients: Ingredient[];
  units: Unit[];
  config: SeedConfig;
};

const pickCount = (min: number, max: number): number => faker.number.int({ min, max });

export const seedContent = async (prisma: PrismaClient, input: ContentSeedInput): Promise<void> => {
  logger.info("Seeding recipe content...");

  const ingredientIds = input.ingredients.map((ingredient) => ingredient.id);
  const unitIds = input.units.map((unit) => unit.id);

  const images: Prisma.RecipeImageCreateManyInput[] = [];
  const ingredients: Prisma.RecipeIngredientCreateManyInput[] = [];
  const instructions: Prisma.InstructionCreateManyInput[] = [];

  const imagesMin = input.config.content.imagesPerRecipe.min;
  const imagesMax = input.config.content.imagesPerRecipe.max;
  const ingredientsMin = input.config.content.ingredientsPerRecipe.min;
  const ingredientsMax = input.config.content.ingredientsPerRecipe.max;
  const instructionsMin = input.config.content.instructionsPerRecipe.min;
  const instructionsMax = input.config.content.instructionsPerRecipe.max;

  const addContent = (target: { recipeId?: string; discoverRecipeId?: string }) => {
    const recipeImages = buildRecipeImages(pickCount(imagesMin, imagesMax));
    const recipeIngredients = buildRecipeIngredients(ingredientIds, unitIds, pickCount(ingredientsMin, ingredientsMax));
    const recipeInstructions = buildInstructions(pickCount(instructionsMin, instructionsMax));

    images.push(
      ...recipeImages.map((image) => ({
        ...image,
        ...target,
      })),
    );

    ingredients.push(
      ...recipeIngredients.map((ingredient) => ({
        ...ingredient,
        ...target,
      })),
    );

    instructions.push(
      ...recipeInstructions.map((instruction) => ({
        ...instruction,
        ...target,
      })),
    );
  };

  for (const recipe of input.recipes) {
    addContent({ recipeId: recipe.id });
  }

  for (const discover of input.discoverRecipes) {
    addContent({ discoverRecipeId: discover.id });
  }

  if (images.length > 0) {
    await prisma.recipeImage.createMany({ data: images });
  }

  if (ingredients.length > 0) {
    await prisma.recipeIngredient.createMany({ data: ingredients });
  }

  if (instructions.length > 0) {
    await prisma.instruction.createMany({ data: instructions });
  }

  logger.success(
    `Recipe content seeded (${images.length} images, ` +
      `${ingredients.length} ingredients, ${instructions.length} instructions)`,
  );
};

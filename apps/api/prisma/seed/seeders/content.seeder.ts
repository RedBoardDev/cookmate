import { faker } from "@faker-js/faker";
import type { Prisma, PrismaClient, Recipe } from "../../../src/generated/prisma/client";
import type { SeedConfig } from "../config";
import {
  buildRecipeImages,
  buildRecipeIngredients,
  buildRecipeInstructions,
} from "../factories/recipe-content.factory";
import { logger } from "../lib/logger";
import type { RecipeContentProfile } from "./recipe.seeder";

export type ContentSeedInput = {
  recipes: Recipe[];
  ingredientNames: string[];
  contentProfilesByRecipeId: Map<string, RecipeContentProfile>;
  config: SeedConfig;
};

const pickCount = (min: number, max: number): number => faker.number.int({ min, max });

export const seedContent = async (prisma: PrismaClient, input: ContentSeedInput): Promise<void> => {
  logger.info("Seeding recipe content...");

  const images: Prisma.RecipeImageCreateManyInput[] = [];
  const ingredients: Prisma.RecipeIngredientCreateManyInput[] = [];
  const instructions: Prisma.RecipeInstructionCreateManyInput[] = [];

  const imagesMin = input.config.content.imagesPerRecipe.min;
  const imagesMax = input.config.content.imagesPerRecipe.max;
  const ingredientsMin = input.config.content.ingredientsPerRecipe.min;
  const ingredientsMax = input.config.content.ingredientsPerRecipe.max;
  const instructionsMin = input.config.content.instructionsPerRecipe.min;
  const instructionsMax = input.config.content.instructionsPerRecipe.max;

  const addContent = (recipeId: string) => {
    const profile = input.contentProfilesByRecipeId.get(recipeId) ?? "normal";

    const imageCount =
      profile === "no_images"
        ? 0
        : profile === "image_heavy"
          ? pickCount(Math.max(imagesMin, 3), Math.max(imagesMax, 6))
          : pickCount(imagesMin, imagesMax);
    const ingredientCount =
      profile === "minimal"
        ? pickCount(1, 3)
        : profile === "rich"
          ? pickCount(Math.max(ingredientsMin, 10), Math.max(ingredientsMax, 16))
          : pickCount(ingredientsMin, ingredientsMax);
    const instructionCount =
      profile === "minimal"
        ? pickCount(1, 2)
        : profile === "rich"
          ? pickCount(Math.max(instructionsMin, 8), Math.max(instructionsMax, 14))
          : pickCount(instructionsMin, instructionsMax);

    const recipeImages = buildRecipeImages(imageCount);
    const recipeIngredients = buildRecipeIngredients(input.ingredientNames, ingredientCount, {
      quantityMode:
        profile === "fractional_quantities"
          ? "fractional_heavy"
          : profile === "mostly_optional"
            ? "mostly_without_quantity"
            : "mixed",
      optionalChance: profile === "mostly_optional" ? 0.45 : 0.1,
    });
    const recipeInstructions = buildRecipeInstructions(instructionCount, {
      durationMode:
        profile === "minimal"
          ? "without_duration"
          : profile === "rich" || profile === "image_heavy"
            ? "all_with_duration"
            : "mixed",
    });

    images.push(
      ...recipeImages.map((image) => ({
        ...image,
        recipeId,
      })),
    );

    ingredients.push(
      ...recipeIngredients.map((ingredient) => ({
        ...ingredient,
        recipeId,
      })),
    );

    instructions.push(
      ...recipeInstructions.map((instruction) => ({
        ...instruction,
        recipeId,
      })),
    );
  };

  for (const recipe of input.recipes) {
    addContent(recipe.id);
  }

  if (images.length > 0) {
    await prisma.recipeImage.createMany({ data: images });
  }

  if (ingredients.length > 0) {
    await prisma.recipeIngredient.createMany({ data: ingredients });
  }

  if (instructions.length > 0) {
    await prisma.recipeInstruction.createMany({ data: instructions });
  }

  logger.success(
    `Recipe content seeded (${images.length} images, ` +
      `${ingredients.length} ingredients, ${instructions.length} instructions)`,
  );
};

import type { z } from "zod";
import type { Prisma } from "@/generated/prisma/client";
import { getPrisma } from "@/infra/db/prisma";
import { handleError } from "@/shared/utils/handle-error";
import { parseRecipe, parseRecipeIngredients, parseRecipeInstructions } from "../create-recipe/helpers/parse-recipe";
import type { EditableRecipe } from "./errors";
import type { body } from "./schema";

type UpdateRecipeInput = z.infer<typeof body> & {
  recipeId: string;
  userId: string;
  existingRecipe: EditableRecipe;
};

const updateRecipeFn = async (input: UpdateRecipeInput) => {
  const now = new Date();

  const parseInput = {
    name: input.name,
    description: input.description,
    servings: input.servings,
    yieldUnitLabel: input.yieldUnitLabel,
    prepTimeMin: input.prepTimeMin,
    cookTimeMin: input.cookTimeMin,
    difficulty: input.difficulty,
    budget: input.budget,
    categories: input.categories,
    attributes: input.attributes,
    source: input.existingRecipe.source,
    sourceUrl: input.existingRecipe.sourceUrl,
    ingredients: input.ingredients,
    instructions: input.instructions,
    images: [],
    userId: input.userId,
    shortUrl: input.existingRecipe.shortUrl,
  } satisfies Parameters<typeof parseRecipe>[0];

  const recipe = parseRecipe(parseInput, now);
  const ingredients = parseRecipeIngredients(parseInput);
  const instructions = parseRecipeInstructions(parseInput);

  const ingredientCreates: Prisma.RecipeIngredientCreateWithoutRecipeInput[] = ingredients.map((ingredient) => ({
    name: ingredient.name,
    quantity: ingredient.quantity,
    unit: ingredient.unit,
    note: ingredient.note,
    optional: ingredient.optional,
    order: ingredient.order,
    createdAt: now,
    updatedAt: now,
  }));

  const instructionCreates: Prisma.RecipeInstructionCreateWithoutRecipeInput[] = instructions.map((instruction) => ({
    text: instruction.text,
    durationMin: instruction.durationMin,
    order: instruction.order,
    createdAt: now,
    updatedAt: now,
  }));

  return getPrisma().recipe.update({
    where: { id: input.recipeId },
    data: {
      name: recipe.name,
      description: recipe.description,
      servings: recipe.servings,
      yieldUnitLabel: recipe.yieldUnitLabel,
      prepTimeMin: recipe.prepTimeMin,
      cookTimeMin: recipe.cookTimeMin,
      totalTimeMin: recipe.totalTimeMin,
      difficulty: recipe.difficulty,
      budget: recipe.budget,
      categories: recipe.categories,
      attributes: recipe.attributes,
      updatedAt: now,
      recipeIngredients: {
        deleteMany: {},
        ...(ingredientCreates.length > 0 && {
          create: ingredientCreates,
        }),
      },
      recipeInstructions: {
        deleteMany: {},
        ...(instructionCreates.length > 0 && {
          create: instructionCreates,
        }),
      },
    },
    select: {
      id: true,
      shortUrl: true,
    },
  });
};

export const updateRecipe = handleError(updateRecipeFn);

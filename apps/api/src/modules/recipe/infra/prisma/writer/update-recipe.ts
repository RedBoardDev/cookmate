import { InvalidInstructionDataError, instructionField } from "@cookmate/domain/instruction";
import { InvalidRecipeDataError, recipePropsSchema } from "@cookmate/domain/recipe";
import { InvalidRecipeIngredientDataError, recipeIngredientField } from "@cookmate/domain/recipe-ingredient";
import { z } from "zod";
import type { Prisma } from "@/generated/prisma/client";
import { getPrisma } from "@/infra/db/prisma";
import type { UpdateRecipeWriteInput } from "@/modules/recipe/commands/update-recipe/deps";
import { handleError } from "@/shared/utils/handle-error";

const recipeIngredientSchema = z.object({
  ...recipeIngredientField,
});

const recipeInstructionSchema = z.object({
  ...instructionField,
});

export const update = handleError(async (input: UpdateRecipeWriteInput) => {
  const now = new Date();

  const recipe = recipePropsSchema.safeParse({
    name: input.name,
    description: input.description ?? null,
    servings: input.servings,
    yieldUnitLabel: input.yieldUnitLabel ?? null,
    prepTimeMin: input.prepTimeMin,
    cookTimeMin: input.cookTimeMin,
    totalTimeMin: input.prepTimeMin + input.cookTimeMin,
    difficulty: input.difficulty,
    budget: input.budget,
    categories: input.categories ?? [],
    attributes: input.attributes ?? [],
    source: input.existingRecipe.source,
    sourceUrl: input.existingRecipe.sourceUrl,
    shortUrl: input.existingRecipe.shortUrl,
    userId: input.userId,
    createdAt: now,
    updatedAt: now,
  });

  if (!recipe.success) {
    throw new InvalidRecipeDataError();
  }

  const ingredientCreates: Prisma.RecipeIngredientCreateWithoutRecipeInput[] = input.ingredients.map(
    (ingredient, index) => {
      const parsedIngredient = recipeIngredientSchema.safeParse({
        name: ingredient.name,
        quantity: ingredient.quantity ?? null,
        unit: ingredient.unit ?? null,
        note: ingredient.note ?? null,
        optional: ingredient.optional ?? false,
        order: index,
      });

      if (!parsedIngredient.success) {
        throw new InvalidRecipeIngredientDataError();
      }

      return {
        ...parsedIngredient.data,
        createdAt: now,
        updatedAt: now,
      };
    },
  );

  const instructionCreates: Prisma.RecipeInstructionCreateWithoutRecipeInput[] = input.instructions.map(
    (instruction, index) => {
      const parsedInstruction = recipeInstructionSchema.safeParse({
        text: instruction.text,
        durationMin: instruction.durationMin ?? null,
        order: index,
      });

      if (!parsedInstruction.success) {
        throw new InvalidInstructionDataError();
      }

      return {
        ...parsedInstruction.data,
        createdAt: now,
        updatedAt: now,
      };
    },
  );

  return getPrisma().recipe.update({
    where: { id: input.recipeId },
    data: {
      name: recipe.data.name,
      description: recipe.data.description,
      servings: recipe.data.servings,
      yieldUnitLabel: recipe.data.yieldUnitLabel,
      prepTimeMin: recipe.data.prepTimeMin,
      cookTimeMin: recipe.data.cookTimeMin,
      totalTimeMin: recipe.data.totalTimeMin,
      difficulty: recipe.data.difficulty,
      budget: recipe.data.budget,
      categories: recipe.data.categories,
      attributes: recipe.data.attributes,
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
});

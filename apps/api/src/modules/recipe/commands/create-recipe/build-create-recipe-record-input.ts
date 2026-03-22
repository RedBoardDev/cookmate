import { InvalidInstructionDataError, instructionField } from "@cookmate/domain/instruction";
import { InvalidRecipeDataError, recipePropsSchema } from "@cookmate/domain/recipe";
import { InvalidRecipeImageDataError, recipeImageField } from "@cookmate/domain/recipe-image";
import { InvalidRecipeIngredientDataError, recipeIngredientField } from "@cookmate/domain/recipe-ingredient";
import { z } from "zod";
import type { S3PutObjectOutput } from "@/shared/types/s3.types";
import type { CreateRecipeCommand } from "./contract";
import type { CreateRecipeRecordInput } from "./deps";

const recipeIngredientSchema = z.object({
  ...recipeIngredientField,
});

const recipeInstructionSchema = z.object({
  ...instructionField,
});

const recipeImageSchema = z.object({
  ...recipeImageField,
});

function assertUploadTarget(
  uploadTarget: S3PutObjectOutput | undefined,
  message: string,
): asserts uploadTarget is S3PutObjectOutput {
  if (!uploadTarget) {
    throw new InvalidRecipeImageDataError(message);
  }
}

export function buildCreateRecipeRecordInput(input: {
  command: CreateRecipeCommand;
  recipeId: string;
  shortUrl: string;
  uploadTargets: S3PutObjectOutput[];
  now: Date;
}): CreateRecipeRecordInput {
  const { command, now, recipeId, shortUrl, uploadTargets } = input;

  const recipe = recipePropsSchema.safeParse({
    name: command.name,
    description: command.description ?? null,
    servings: command.servings,
    yieldUnitLabel: command.yieldUnitLabel ?? null,
    prepTimeMin: command.prepTimeMin,
    cookTimeMin: command.cookTimeMin,
    totalTimeMin: command.prepTimeMin + command.cookTimeMin,
    difficulty: command.difficulty,
    budget: command.budget,
    categories: command.categories ?? [],
    attributes: command.attributes ?? [],
    source: command.source ?? "MANUAL",
    sourceUrl: command.sourceUrl ?? null,
    shortUrl,
    userId: command.userId,
    createdAt: now,
    updatedAt: now,
  });

  if (!recipe.success) {
    throw new InvalidRecipeDataError();
  }

  const ingredients = command.ingredients.map((ingredient, index) => {
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
  });

  const instructions = command.instructions.map((instruction, index) => {
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
  });

  const images = command.images.map((image, index) => {
    const uploadTarget = uploadTargets[index];
    assertUploadTarget(uploadTarget, "Recipe image upload target could not be generated.");

    const parsedImage = recipeImageSchema.safeParse({
      storageKey: uploadTarget.storageKey,
      name: image.name,
      mimeType: image.mimeType,
      size: image.size,
      order: index,
    });

    if (!parsedImage.success) {
      throw new InvalidRecipeImageDataError();
    }

    return {
      ...parsedImage.data,
      createdAt: now,
      updatedAt: now,
    };
  });

  return {
    id: recipeId,
    ...recipe.data,
    ingredients,
    instructions,
    images,
  };
}

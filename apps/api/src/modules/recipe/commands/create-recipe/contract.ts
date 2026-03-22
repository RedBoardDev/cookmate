import { instructionFields } from "@cookmate/domain/instruction";
import { recipeFields } from "@cookmate/domain/recipe";
import { recipeImageFields } from "@cookmate/domain/recipe-image";
import { recipeIngredientFields } from "@cookmate/domain/recipe-ingredient";
import { z } from "zod";
import { AllowedMimeTypes } from "@/shared/types/s3.types";

export const MAX_RECIPE_IMAGES = 5;

const allowedRecipeImageMimeTypes = Object.values(AllowedMimeTypes) as [AllowedMimeTypes, ...AllowedMimeTypes[]];

const ingredientSchema = z.object({
  ...recipeIngredientFields.name,
  quantity: recipeIngredientFields.quantity.quantity.optional(),
  unit: recipeIngredientFields.unit.unit.optional(),
  note: recipeIngredientFields.note.note.optional(),
  optional: recipeIngredientFields.optional.optional.default(false),
});

const instructionSchema = z.object({
  ...instructionFields.text,
  durationMin: instructionFields.durationMin.durationMin.optional(),
});

const imageSchema = z.object({
  ...recipeImageFields.name,
  mimeType: z.enum(allowedRecipeImageMimeTypes),
  ...recipeImageFields.size,
});

const uploadTargetSchema = z.object({
  ...recipeImageFields.storageKey,
  uploadUrl: z.url(),
  expiresIn: z.number().int().positive(),
});

const createdRecipeImageSchema = z.object({
  id: z.uuid(),
  ...recipeImageFields.name,
  mimeType: z.enum(allowedRecipeImageMimeTypes),
  ...recipeImageFields.size,
  ...recipeImageFields.order,
  ...uploadTargetSchema.shape,
});

export const createRecipeBodySchema = z.object({
  ...recipeFields.name,
  description: recipeFields.description.description.optional(),
  ...recipeFields.servings,
  yieldUnitLabel: recipeFields.yieldUnitLabel.yieldUnitLabel.optional(),
  ...recipeFields.prepTimeMin,
  ...recipeFields.cookTimeMin,
  ...recipeFields.difficulty,
  budget: recipeFields.budget.budget,
  categories: recipeFields.categories.categories,
  attributes: recipeFields.attributes.attributes.optional(),
  source: recipeFields.source.source.optional(),
  sourceUrl: recipeFields.sourceUrl.sourceUrl.optional(),
  ingredients: z.array(ingredientSchema),
  instructions: z.array(instructionSchema),
  images: z.array(imageSchema).max(MAX_RECIPE_IMAGES).default([]),
});

export const createRecipeResponseSchema = z.object({
  id: z.uuid(),
  ...recipeFields.shortUrl,
  images: z.array(createdRecipeImageSchema),
});

export type CreateRecipeBody = z.infer<typeof createRecipeBodySchema>;
export type CreateRecipeCommand = CreateRecipeBody & { readonly userId: string };
export type CreateRecipeResult = z.infer<typeof createRecipeResponseSchema>;

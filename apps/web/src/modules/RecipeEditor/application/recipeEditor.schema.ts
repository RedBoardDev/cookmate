import { recipeField } from "@cookmate/domain/recipe";
import { z } from "zod";
import type { ImagesMimeTypeEnumKey } from "@/generated/types";
import { imagesMimeTypeEnum } from "@/generated/types";

export const MAX_RECIPE_IMAGES = 5;
export const RECIPE_IMAGE_MIME_TYPES = Object.values(imagesMimeTypeEnum) as readonly ImagesMimeTypeEnumKey[];
export const RECIPE_IMAGE_ACCEPT = RECIPE_IMAGE_MIME_TYPES.join(", ");

const recipeImageMimeTypeTuple = RECIPE_IMAGE_MIME_TYPES as [ImagesMimeTypeEnumKey, ...ImagesMimeTypeEnumKey[]];

export const recipeEditorIngredientSchema = z.object({
  name: z.string().trim().min(1),
  quantity: z.number().nonnegative().nullable(),
  unit: z.string().trim().min(1).nullable(),
  note: z.string().trim().min(1).nullable().optional(),
  optional: z.boolean(),
  order: z.number().int().min(0),
});

export const recipeEditorInstructionSchema = z.object({
  text: z.string().trim().min(1),
  durationMin: z.number().int().min(0).nullable(),
  order: z.number().int().min(0),
});

export const recipeEditorImageSchema = z.object({
  name: z.string().trim().min(1).max(100),
  mimeType: z.enum(recipeImageMimeTypeTuple),
  size: z.number().int().nonnegative(),
});

export type RecipeEditorImageInput = z.infer<typeof recipeEditorImageSchema>;

export const recipeEditorFormSchema = z
  .object({
    name: recipeField.name,
    description: recipeField.description,
    servings: recipeField.servings,
    yieldUnitLabel: recipeField.yieldUnitLabel,
    prepTimeMin: recipeField.prepTimeMin,
    cookTimeMin: recipeField.cookTimeMin,
    totalTimeMin: recipeField.totalTimeMin,
    difficulty: recipeField.difficulty.nullable(),
    budget: recipeField.budget.nullable(),
    categories: recipeField.categories.min(1),
    attributes: recipeField.attributes,
    ingredients: z.array(recipeEditorIngredientSchema).min(1),
    instructions: z.array(recipeEditorInstructionSchema).min(1),
  })
  .superRefine((input, ctx) => {
    if (input.difficulty === null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Recipe difficulty is required.",
        path: ["difficulty"],
      });
    }

    if (input.budget === null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Recipe budget is required.",
        path: ["budget"],
      });
    }
  });

export type RecipeEditorFormValues = z.infer<typeof recipeEditorFormSchema>;

export class RecipeEditorValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RecipeEditorValidationError";
  }
}

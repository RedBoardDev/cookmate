import { instructionSchema, recipeImageSchema, recipeIngredientSchema, recipeSchema } from "@cookmate/domain";
import { z } from "zod";
import type { Prisma } from "@/generated/prisma/client";

const select = {
  id: true,
  name: true,
  description: true,
  servings: true,
  yieldUnitLabel: true,
  prepTimeMin: true,
  cookTimeMin: true,
  totalTimeMin: true,
  difficulty: true,
  budget: true,
  categories: true,
  attributes: true,
  source: true,
  sourceUrl: true,
  shortUrl: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
  recipeIngredients: {
    select: {
      id: true,
      name: true,
      quantity: true,
      unit: true,
      note: true,
      optional: true,
      order: true,
      recipeId: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: { order: "asc" as const },
  },
  recipeInstructions: {
    select: {
      id: true,
      text: true,
      durationMin: true,
      order: true,
      recipeId: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: { order: "asc" as const },
  },
  images: {
    select: {
      id: true,
      storageKey: true,
      name: true,
      mimeType: true,
      size: true,
      order: true,
      recipeId: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: { order: "asc" as const },
  },
  collections: {
    select: {
      id: true,
      name: true,
      emoji: true,
    },
  },
} satisfies Prisma.RecipeSelect;

export type SelectResult = Prisma.RecipeGetPayload<{ select: typeof select }>;

export const responseSchema = recipeSchema.extend({
  ingredients: z.array(recipeIngredientSchema),
  instructions: z.array(instructionSchema),
  images: z.array(recipeImageSchema),
  collections: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      emoji: z.string(),
    }),
  ),
});

export type ResponseDto = z.infer<typeof responseSchema>;

const transform = (data: SelectResult): ResponseDto => {
  const { recipeIngredients, recipeInstructions, ...recipe } = data;
  return {
    ...recipe,
    ingredients: recipeIngredients.map((ingredient) => ({
      ...ingredient,
      quantity: ingredient.quantity === null ? null : ingredient.quantity.toNumber(),
    })),
    instructions: recipeInstructions,
  };
};

export const selectConfig = {
  select,
  schema: responseSchema,
  transform,
};

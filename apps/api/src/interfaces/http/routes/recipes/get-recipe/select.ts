import type { Prisma } from "@/generated/prisma/client";
import {
  recipeSnapshotSchema,
  recipeIngredientSnapshotSchema,
  instructionSnapshotSchema,
  recipeImageSnapshotSchema,
  equipmentSnapshotSchema,
} from "@cookmate/domain";
import { z } from "zod";

const select = {
  id: true,
  title: true,
  description: true,
  servings: true,
  prepTimeMin: true,
  cookTimeMin: true,
  restTimeMin: true,
  totalTimeMin: true,
  difficulty: true,
  budget: true,
  tags: true,
  source: true,
  sourceUrl: true,
  shortUrl: true,
  userId: true,
  forkedFromDiscoverId: true,
  createdAt: true,
  updatedAt: true,
  ingredients: {
    select: {
      id: true,
      quantity: true,
      preparation: true,
      optional: true,
      order: true,
      ingredientId: true,
      unitId: true,
      recipeId: true,
      discoverRecipeId: true,
      createdAt: true,
      updatedAt: true,
      ingredient: {
        select: {
          id: true,
          name: true,
        },
      },
      unit: {
        select: {
          id: true,
          name: true,
          abbreviation: true,
        },
      },
    },
    orderBy: { order: "asc" as const },
  },
  instructions: {
    select: {
      id: true,
      text: true,
      durationMin: true,
      order: true,
      recipeId: true,
      discoverRecipeId: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: { order: "asc" as const },
  },
  images: {
    select: {
      id: true,
      s3Url: true,
      name: true,
      mimeType: true,
      size: true,
      order: true,
      recipeId: true,
      discoverRecipeId: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: { order: "asc" as const },
  },
  equipments: {
    select: {
      id: true,
      name: true,
      createdAt: true,
    },
  },
} satisfies Prisma.RecipeSelect;

export type SelectResult = Prisma.RecipeGetPayload<{ select: typeof select }>;

export const responseSchema = recipeSnapshotSchema.extend({
  ingredients: z.array(
    recipeIngredientSnapshotSchema.extend({
      ingredient: z.object({
        id: z.string(),
        name: z.string(),
      }),
      unit: z
        .object({
          id: z.string(),
          name: z.string(),
          abbreviation: z.string().nullable(),
        })
        .nullable(),
    })
  ),
  instructions: z.array(instructionSnapshotSchema),
  images: z.array(recipeImageSnapshotSchema),
  equipments: z.array(equipmentSnapshotSchema),
});

export type ResponseDto = z.infer<typeof responseSchema>;

const transform = (data: SelectResult): ResponseDto => {
  return data;
};

export const selectConfig = {
  select,
  schema: responseSchema,
  transform,
};

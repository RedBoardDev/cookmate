import type { Prisma } from "@/generated/prisma/client";
import { recipeImageSnapshotSchema } from "@cookmate/domain";
import { z } from "zod";

const select = {
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
} satisfies Prisma.RecipeImageSelect;

export type SelectResult = Prisma.RecipeImageGetPayload<{ select: typeof select }>;

export const responseSchema = recipeImageSnapshotSchema;

export type ResponseDto = z.infer<typeof responseSchema>;

const transform = (data: SelectResult): ResponseDto => data;

export const selectConfig = {
  select,
  schema: responseSchema,
  transform,
};

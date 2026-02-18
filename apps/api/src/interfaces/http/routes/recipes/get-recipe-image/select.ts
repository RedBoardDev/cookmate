import { recipeImageSchema } from "@cookmate/domain";
import type { z } from "zod";
import type { Prisma } from "@/generated/prisma/client";

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

export const responseSchema = recipeImageSchema;

export type ResponseDto = z.infer<typeof responseSchema>;

const transform = (data: SelectResult): ResponseDto => data;

export const selectConfig = {
  select,
  schema: responseSchema,
  transform,
};

import { recipeImageSchema } from "@cookmate/domain";
import { z } from "zod";
import type { Prisma } from "@/generated/prisma/client";
import type { SelectConfig } from "@/shared/types/select-config";

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

type SelectResult = Prisma.RecipeImageGetPayload<{ select: typeof select }>[];

const responseSchema = z.array(recipeImageSchema);

type ResponseDto = z.infer<typeof responseSchema>;

const transform = (data: SelectResult): ResponseDto => data;

export const selectConfig: SelectConfig<typeof select, SelectResult, ResponseDto> = {
  select,
  schema: responseSchema,
  transform,
};

export type { SelectResult, ResponseDto };

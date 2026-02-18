import { recipeSchema } from "@cookmate/domain";
import { z } from "zod";
import type { Prisma } from "@/generated/prisma/client";
import type { SelectConfig } from "@/shared/types/select-config";

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
  collections: {
    select: {
      id: true,
      name: true,
      emoji: true,
    },
  },
} satisfies Prisma.RecipeSelect;

type SelectResult = Prisma.RecipeGetPayload<{ select: typeof select }>[];

const responseSchema = z.array(recipeSchema);

type ResponseDto = z.infer<typeof responseSchema>;

const transform = (data: SelectResult): ResponseDto => data;

export const selectConfig: SelectConfig<typeof select, SelectResult, ResponseDto> = {
  select,
  schema: responseSchema,
  transform,
};

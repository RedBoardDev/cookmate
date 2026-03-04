import { recipeSchema } from "@cookmate/domain";
import { InvalidRecipeDataError } from "@cookmate/domain/recipe";
import { z } from "zod";
import type { Prisma } from "@/generated/prisma/client";
import type { SelectConfig } from "@/shared/types/select-config";

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

function assertRequiredRecipeFields(recipe: {
  difficulty: SelectResult[number]["difficulty"];
  budget: SelectResult[number]["budget"];
  shortUrl: SelectResult[number]["shortUrl"];
}): asserts recipe is {
  difficulty: NonNullable<SelectResult[number]["difficulty"]>;
  budget: NonNullable<SelectResult[number]["budget"]>;
  shortUrl: NonNullable<SelectResult[number]["shortUrl"]>;
} {
  if (recipe.difficulty === null) {
    throw new InvalidRecipeDataError("Recipe difficulty is required");
  }

  if (recipe.budget === null) {
    throw new InvalidRecipeDataError("Recipe budget is required");
  }

  if (recipe.shortUrl === null) {
    throw new InvalidRecipeDataError("Recipe shortUrl is required");
  }
}

const transform = (data: SelectResult): ResponseDto =>
  data.map((recipe) => {
    assertRequiredRecipeFields(recipe);

    return {
      ...recipe,
    };
  });

export const selectConfig: SelectConfig<typeof select, SelectResult, ResponseDto> = {
  select,
  schema: responseSchema,
  transform,
};

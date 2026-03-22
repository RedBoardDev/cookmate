import type { Budget, Difficulty, RecipeAttribute, RecipeCategory, RecipeSource } from "@/generated/prisma/enums";
import { getPrisma } from "@/infra/db/prisma";
import type { CreatedRecipeRecord, CreateRecipeRecordInput } from "@/modules/recipe/commands/create-recipe/deps";
import { handleError } from "@/shared/utils/handle-error";

export const create = handleError(async (input: CreateRecipeRecordInput): Promise<CreatedRecipeRecord> => {
  return getPrisma().recipe.create({
    data: {
      id: input.id,
      name: input.name,
      description: input.description,
      servings: input.servings,
      yieldUnitLabel: input.yieldUnitLabel,
      prepTimeMin: input.prepTimeMin,
      cookTimeMin: input.cookTimeMin,
      totalTimeMin: input.totalTimeMin,
      difficulty: input.difficulty as Difficulty,
      budget: input.budget as Budget,
      categories: input.categories as RecipeCategory[],
      attributes: input.attributes as RecipeAttribute[],
      source: input.source as RecipeSource,
      sourceUrl: input.sourceUrl,
      shortUrl: input.shortUrl,
      userId: input.userId,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
      recipeIngredients: {
        create: input.ingredients,
      },
      recipeInstructions: {
        create: input.instructions,
      },
      ...(input.images.length > 0 && {
        images: {
          create: input.images,
        },
      }),
    },
    select: {
      id: true,
      shortUrl: true,
      images: {
        select: {
          id: true,
          storageKey: true,
          name: true,
          mimeType: true,
          size: true,
          order: true,
        },
        orderBy: { order: "asc" },
      },
    },
  });
});

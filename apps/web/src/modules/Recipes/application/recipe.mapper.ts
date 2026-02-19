import type { RecipeBudget, RecipeDifficulty, RecipeSource, RecipeTag } from "@cookmate/domain/recipe";
import type { GetRecipes200 } from "@/generated/types";
import { RecipeEntity } from "@/modules/Recipes/domain/entity/recipe.entity";

type RecipeData = GetRecipes200["data"][number];

export const RecipeMapper = {
  toDomain(data: RecipeData): RecipeEntity {
    return RecipeEntity.create({
      recipe: {
        id: data.id,
        title: data.title,
        description: data.description,
        servings: data.servings,
        prepTimeMin: data.prepTimeMin,
        cookTimeMin: data.cookTimeMin,
        restTimeMin: data.restTimeMin,
        totalTimeMin: data.totalTimeMin,
        difficulty: data.difficulty as RecipeDifficulty | null,
        budget: data.budget as RecipeBudget | null,
        tags: data.tags as RecipeTag[],
        source: data.source as RecipeSource,
        sourceUrl: data.sourceUrl,
        shortUrl: data.shortUrl,
        userId: data.userId,
        forkedFromDiscoverId: data.forkedFromDiscoverId,
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt),
      },
      imageUrl: null,
      href: `/recipes/${data.id}`,
    });
  },
};

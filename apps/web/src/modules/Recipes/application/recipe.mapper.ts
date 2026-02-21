import type {
  RecipeAttribute,
  RecipeBudget,
  RecipeCategory,
  RecipeDifficulty,
  RecipeSource,
} from "@cookmate/domain/recipe";
import type { GetRecipes200 } from "@/generated/types";
import { RecipeEntity } from "@/modules/Recipes/domain/entity/recipe.entity";

type RecipeData = GetRecipes200["data"][number];

export const RecipeMapper = {
  toDomain(data: RecipeData): RecipeEntity {
    return RecipeEntity.create({
      recipe: {
        id: data.id,
        name: data.name,
        description: data.description,
        servings: data.servings,
        yieldUnitLabel: data.yieldUnitLabel,
        prepTimeMin: data.prepTimeMin,
        cookTimeMin: data.cookTimeMin,
        totalTimeMin: data.totalTimeMin,
        difficulty: data.difficulty as RecipeDifficulty | null,
        budget: data.budget as RecipeBudget | null,
        categories: data.categories as RecipeCategory[],
        attributes: data.attributes as RecipeAttribute[],
        source: data.source as RecipeSource,
        sourceUrl: data.sourceUrl,
        shortUrl: data.shortUrl,
        userId: data.userId,
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt),
      },
      imageUrl: null,
      href: `/recipes/${data.id}`,
    });
  },
};

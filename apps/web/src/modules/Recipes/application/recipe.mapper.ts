import type {
  RecipeAttribute,
  RecipeBudget,
  RecipeCategory,
  RecipeDifficulty,
  RecipeSource,
} from "@cookmate/domain/recipe";
import { BUDGETS, DIFFICULTIES, SOURCES } from "@cookmate/domain/shared/value-objects";
import type { GetRecipes200 } from "@/generated/types";
import { RecipeEntity } from "@/modules/Recipes/domain/entity/recipe.entity";

type RecipeData = GetRecipes200["data"][number];

function normalizeRecipeDifficulty(value: RecipeData["difficulty"]): RecipeDifficulty {
  if (DIFFICULTIES.includes(value as RecipeDifficulty)) {
    return value as RecipeDifficulty;
  }

  throw new Error("Recipe difficulty is required.");
}

function normalizeRecipeBudget(value: RecipeData["budget"]): RecipeBudget {
  if (BUDGETS.includes(value as RecipeBudget)) {
    return value as RecipeBudget;
  }

  throw new Error("Recipe budget is required.");
}

function normalizeRecipeSource(value: RecipeData["source"]): RecipeSource {
  if (SOURCES.includes(value as RecipeSource)) {
    return value as RecipeSource;
  }

  throw new Error("Recipe source is required.");
}

function normalizeRecipeShortUrl(value: RecipeData["shortUrl"]): string {
  if (typeof value === "string" && value.trim().length > 0) {
    return value;
  }

  throw new Error("Recipe shortUrl is required.");
}

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
        difficulty: normalizeRecipeDifficulty(data.difficulty),
        budget: normalizeRecipeBudget(data.budget),
        categories: data.categories as RecipeCategory[],
        attributes: data.attributes as RecipeAttribute[],
        source: normalizeRecipeSource(data.source),
        sourceUrl: data.sourceUrl,
        shortUrl: normalizeRecipeShortUrl(data.shortUrl),
        userId: data.userId,
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt),
      },
      imageUrl: null,
      href: `/recipes/${data.id}`,
    });
  },
};

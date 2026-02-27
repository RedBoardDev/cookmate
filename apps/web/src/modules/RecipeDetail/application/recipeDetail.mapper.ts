import type { RecipeCategory } from "@cookmate/domain/recipe";
import type { GetRecipesRecipeid200, GetRecipesRecipeidImages200 } from "@/generated/types";
import { RecipeDetailImagesMapper } from "@/modules/RecipeDetail/application/recipeDetailImages.mapper";
import { RecipeDetailIngredientsMapper } from "@/modules/RecipeDetail/application/recipeDetailIngredients.mapper";
import { RecipeDetailInstructionsMapper } from "@/modules/RecipeDetail/application/recipeDetailInstructions.mapper";
import { RecipeDetailAggregate } from "@/modules/RecipeDetail/domain/entity/recipeDetail.aggregate";
import { RecipeDifficulty } from "@/modules/RecipeDetail/domain/vo/recipeDifficulty.vo";
import { RecipeDuration } from "@/modules/RecipeDetail/domain/vo/recipeDuration.vo";
import { RecipeServings } from "@/modules/RecipeDetail/domain/vo/recipeServings.vo";
import { RecipeSourceVO } from "@/modules/RecipeDetail/domain/vo/recipeSource.vo";

type RecipeData = GetRecipesRecipeid200["data"];

function normalizeRecipeShortUrl(value: RecipeData["shortUrl"]): string {
  if (typeof value === "string" && value.trim().length > 0) {
    return value;
  }

  throw new Error("Recipe shortUrl is required.");
}

export const RecipeDetailMapper = {
  toDomain(
    apiData?: GetRecipesRecipeid200 | null,
    imageData?: GetRecipesRecipeidImages200["data"] | null,
  ): RecipeDetailAggregate | null {
    if (!apiData?.data) {
      return null;
    }

    const recipe = apiData.data;

    return RecipeDetailAggregate.create({
      id: recipe.id,
      name: recipe.name,
      description: recipe.description,
      servings: RecipeServings.create(recipe.servings),
      duration: RecipeDuration.create(recipe.totalTimeMin),
      difficulty: RecipeDifficulty.create(recipe.difficulty),
      categories: recipe.categories as RecipeCategory[],
      source: RecipeSourceVO.create(recipe.source),
      sourceUrl: recipe.sourceUrl,
      shortUrl: normalizeRecipeShortUrl(recipe.shortUrl),
      ingredients: RecipeDetailIngredientsMapper.toDomain(recipe.ingredients),
      instructions: RecipeDetailInstructionsMapper.toDomain(recipe.instructions),
      images: RecipeDetailImagesMapper.toDomain(imageData),
      collectionIds: recipe.collections.map((collection) => collection.id),
    });
  },
};

import type { Recipe, RecipeBudget, RecipeDifficulty, RecipeSource, RecipeTag } from "@cookmate/domain/recipe";
import { BUDGETS, DIFFICULTIES, SOURCES, TAGS } from "@cookmate/domain/shared/value-objects";
import type { GetRecipesRecipeid200 } from "@/generated/types";
import {
  RecipeDetailAggregate,
  type RecipeTones,
  recipeTones,
} from "@/modules/RecipeDetail/domain/entity/recipeDetail.aggregate";
import { RecipeDuration } from "@/modules/RecipeDetail/domain/vo/recipeDuration.vo";
import { RecipeImages } from "@/modules/RecipeDetail/domain/vo/recipeImages.vo";
import { RecipeIngredient } from "@/modules/RecipeDetail/domain/vo/recipeIngredient.vo";
import { RecipeInstruction } from "@/modules/RecipeDetail/domain/vo/recipeInstruction.vo";

type RecipeData = GetRecipesRecipeid200["data"];

const DEFAULT_RECIPE_SOURCE: RecipeSource = "MANUAL";

function normalizeRecipeDifficulty(value: RecipeData["difficulty"]): RecipeDifficulty | null {
  if (!value) {
    return null;
  }

  return DIFFICULTIES.includes(value as RecipeDifficulty) ? (value as RecipeDifficulty) : null;
}

function normalizeRecipeBudget(value: RecipeData["budget"]): RecipeBudget | null {
  if (!value) {
    return null;
  }

  return BUDGETS.includes(value as RecipeBudget) ? (value as RecipeBudget) : null;
}

function normalizeRecipeSource(value: RecipeData["source"]): RecipeSource {
  return SOURCES.includes(value as RecipeSource) ? (value as RecipeSource) : DEFAULT_RECIPE_SOURCE;
}

function normalizeRecipeTags(values: RecipeData["tags"]): RecipeTag[] {
  return values.filter((value): value is RecipeTag => TAGS.includes(value as RecipeTag));
}

function mapRecipe(data: RecipeData): Recipe {
  return {
    id: data.id,
    title: data.title,
    description: data.description,
    servings: data.servings,
    prepTimeMin: data.prepTimeMin,
    cookTimeMin: data.cookTimeMin,
    restTimeMin: data.restTimeMin,
    totalTimeMin: data.totalTimeMin,
    difficulty: normalizeRecipeDifficulty(data.difficulty),
    budget: normalizeRecipeBudget(data.budget),
    tags: normalizeRecipeTags(data.tags),
    source: normalizeRecipeSource(data.source),
    sourceUrl: data.sourceUrl,
    shortUrl: data.shortUrl,
    userId: data.userId,
    forkedFromDiscoverId: data.forkedFromDiscoverId,
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
  };
}

function mapImages(images: RecipeData["images"]): RecipeImages {
  const items = images
    .slice()
    .sort((a, b) => a.order - b.order)
    .map((image) => ({
      src: image.s3Url,
      alt: image.name,
    }));

  return RecipeImages.create(items);
}

function mapIngredients(ingredients: RecipeData["ingredients"]): RecipeIngredient[] {
  return ingredients
    .slice()
    .sort((a, b) => a.order - b.order)
    .map((ingredient) => {
      const amountParts: string[] = [];

      if (ingredient.quantity !== null && ingredient.quantity !== undefined) {
        amountParts.push(ingredient.quantity.toString());
      }

      if (ingredient.unit?.abbreviation) {
        amountParts.push(ingredient.unit.abbreviation);
      } else if (ingredient.unit?.name) {
        amountParts.push(ingredient.unit.name);
      }

      const amount = amountParts.length > 0 ? amountParts.join(" ") : null;

      return RecipeIngredient.create({
        name: ingredient.ingredient.name,
        amount,
        note: ingredient.preparation,
      });
    });
}

function mapInstructions(instructions: RecipeData["instructions"]): RecipeInstruction[] {
  return instructions
    .slice()
    .sort((a, b) => a.order - b.order)
    .map((instruction, index) => {
      const duration =
        instruction.durationMin !== null && instruction.durationMin !== undefined
          ? RecipeDuration.create(instruction.durationMin)
          : null;

      return RecipeInstruction.create({
        step: index + 1,
        description: instruction.text,
        duration,
        tip: null,
      });
    });
}

function selectHeroTone(recipeId: string): RecipeTones {
  const hash = recipeId.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return recipeTones[hash % recipeTones.length];
}

export const RecipeDetailMapper = {
  toDomain(apiData?: GetRecipesRecipeid200 | null): RecipeDetailAggregate | null {
    if (!apiData?.data) {
      return null;
    }

    const recipe = mapRecipe(apiData.data);
    const ingredients = mapIngredients(apiData.data.ingredients);
    const instructions = mapInstructions(apiData.data.instructions);
    const images = mapImages(apiData.data.images);
    const heroTone = selectHeroTone(recipe.id);
    const collectionIds = apiData.data.collections.map((collection) => collection.id);

    return RecipeDetailAggregate.create({
      recipe,
      ingredients,
      instructions,
      images,
      heroTone,
      collectionIds,
    });
  },
};

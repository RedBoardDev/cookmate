import type { RecipeAttribute, RecipeBudget, RecipeCategory, RecipeDifficulty } from "@cookmate/domain/recipe";
import type { MessageDescriptor } from "@lingui/core";
import { msg } from "@lingui/core/macro";

export const RECIPE_CATEGORY_LABELS: Record<RecipeCategory, MessageDescriptor> = {
  MAIN_COURSE: msg`Main course`,
  APPETIZER: msg`Appetizer`,
  SIDE_DISH: msg`Side dish`,
  DESSERT: msg`Dessert`,
  DRINK: msg`Drink`,
  BREAKFAST: msg`Breakfast`,
  SNACK: msg`Snack`,
  SOUP: msg`Soup`,
  SALAD: msg`Salad`,
  SAUCE: msg`Sauce`,
};

export const RECIPE_DIFFICULTY_LABELS: Record<RecipeDifficulty, MessageDescriptor> = {
  EASY: msg`Easy`,
  MEDIUM: msg`Medium`,
  HARD: msg`Hard`,
};

export const RECIPE_BUDGET_LABELS: Record<RecipeBudget, MessageDescriptor> = {
  LOW: msg`Low`,
  MEDIUM: msg`Medium`,
  HIGH: msg`High`,
};

export const RECIPE_ATTRIBUTE_LABELS: Record<RecipeAttribute, MessageDescriptor> = {
  QUICK: msg`Quick`,
  EASY: msg`Easy`,
  HEALTHY: msg`Healthy`,
  VEGETARIAN: msg`Vegetarian`,
};

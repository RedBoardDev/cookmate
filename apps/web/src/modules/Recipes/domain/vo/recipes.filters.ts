import type { RecipeCategory } from "@cookmate/domain/recipe";
import { RECIPE_CATEGORIES } from "@cookmate/domain/shared/value-objects";
import type { MessageDescriptor } from "@lingui/core";
import { msg } from "@lingui/core/macro";

export type QuickFilterId = "all" | RecipeCategory;

export type QuickFilterOption = { id: QuickFilterId; label: MessageDescriptor };

export const QUICK_FILTER_LABELS: Record<RecipeCategory, MessageDescriptor> = {
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

export const QUICK_FILTER_OPTIONS: QuickFilterOption[] = [
  { id: "all", label: msg`All` },
  ...RECIPE_CATEGORIES.map((category) => ({
    id: category,
    label: QUICK_FILTER_LABELS[category],
  })),
];

export const DEFAULT_QUICK_FILTERS: QuickFilterId[] = ["all"];

import type { RecipeTag } from "@cookmate/domain/recipe";
import type { MessageDescriptor } from "@lingui/core";
import { msg } from "@lingui/core/macro";

export type QuickFilterId = "all" | RecipeTag;

export type QuickFilterOption = { id: QuickFilterId; label: MessageDescriptor };

export const QUICK_FILTER_OPTIONS: QuickFilterOption[] = [
  { id: "all", label: msg`All` },
  { id: "MAIN_COURSE", label: msg`Main course` },
  { id: "APPETIZER", label: msg`Appetizer` },
  { id: "SIDE_DISH", label: msg`Side dish` },
  { id: "DESSERT", label: msg`Dessert` },
  { id: "DRINK", label: msg`Drink` },
  { id: "QUICK", label: msg`Quick` },
  { id: "EASY", label: msg`Easy` },
  { id: "HEALTHY", label: msg`Healthy` },
  { id: "VEGETARIAN", label: msg`Vegetarian` },
];

export const DEFAULT_QUICK_FILTERS: QuickFilterId[] = ["all"];

export const QUICK_FILTER_LABELS: Record<RecipeTag, MessageDescriptor> = {
  MAIN_COURSE: msg`Main course`,
  APPETIZER: msg`Appetizer`,
  SIDE_DISH: msg`Side dish`,
  DESSERT: msg`Dessert`,
  DRINK: msg`Drink`,
  QUICK: msg`Quick`,
  EASY: msg`Easy`,
  HEALTHY: msg`Healthy`,
  VEGETARIAN: msg`Vegetarian`,
};

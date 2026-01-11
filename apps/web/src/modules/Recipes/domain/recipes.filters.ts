import type { RecipeTag } from "@cookmate/domain/recipe";

export type QuickFilterId = "all" | RecipeTag;

export type QuickFilterOption = { id: QuickFilterId; label: string };

export const QUICK_FILTER_OPTIONS: QuickFilterOption[] = [
  { id: "all", label: "All" },
  { id: "MAIN_COURSE", label: "Main course" },
  { id: "APPETIZER", label: "Appetizer" },
  { id: "SIDE_DISH", label: "Side dish" },
  { id: "DESSERT", label: "Dessert" },
  { id: "DRINK", label: "Drink" },
  { id: "QUICK", label: "Quick" },
  { id: "EASY", label: "Easy" },
  { id: "HEALTHY", label: "Healthy" },
  { id: "VEGETARIAN", label: "Vegetarian" }
];

export const DEFAULT_QUICK_FILTERS: QuickFilterId[] = ["all"];

export const QUICK_FILTER_LABELS: Record<RecipeTag, string> = {
  MAIN_COURSE: "Main course",
  APPETIZER: "Appetizer",
  SIDE_DISH: "Side dish",
  DESSERT: "Dessert",
  DRINK: "Drink",
  QUICK: "Quick",
  EASY: "Easy",
  HEALTHY: "Healthy",
  VEGETARIAN: "Vegetarian"
};

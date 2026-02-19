import type { RecipeTag } from "@cookmate/domain/recipe";
import { TAGS } from "@cookmate/domain/shared/value-objects";
import type { MessageDescriptor } from "@lingui/core";
import { msg } from "@lingui/core/macro";

export type QuickFilterId = "all" | RecipeTag;

export type QuickFilterOption = { id: QuickFilterId; label: MessageDescriptor };

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

export const QUICK_FILTER_OPTIONS: QuickFilterOption[] = [
  { id: "all", label: msg`All` },
  ...TAGS.map((tag) => ({
    id: tag,
    label: QUICK_FILTER_LABELS[tag],
  })),
];

export const DEFAULT_QUICK_FILTERS: QuickFilterId[] = ["all"];

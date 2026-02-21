import type { RecipeCategory } from "@cookmate/domain/recipe";
import { useMemo } from "react";
import type { GetRecipesQueryParams } from "@/generated/types";
import type { QuickFilterId } from "@/modules/Recipes/domain/vo/recipes.filters";
import { useSelectableIds } from "@/modules/Recipes/ui/hooks/useSelectableIds";

const ALL_FILTER_ID: QuickFilterId = "all";

type QuickFilterApiParams = Pick<GetRecipesQueryParams, "whereCategories">;

export function useQuickFilters(initialFilters: QuickFilterId[]) {
  const { selectedIds, isSelected, toggle } = useSelectableIds(initialFilters, {
    allId: ALL_FILTER_ID,
    syncWithInitial: true,
  });

  const apiParams = useMemo<QuickFilterApiParams | undefined>(() => {
    if (selectedIds.includes(ALL_FILTER_ID)) {
      return undefined;
    }

    const categories = selectedIds.filter(
      (filter): filter is RecipeCategory => filter !== ALL_FILTER_ID,
    );

    return categories.length > 0 ? { whereCategories: categories } : undefined;
  }, [selectedIds]);

  return {
    isSelected,
    toggleFilter: toggle,
    apiParams,
  };
}

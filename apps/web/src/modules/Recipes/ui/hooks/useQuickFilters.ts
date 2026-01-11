import { useMemo } from "react";
import type { QuickFilterId } from "@/modules/Recipes/domain/recipes.filters";
import type { RecipeTag } from "@cookmate/domain/recipe";
import { useSelectableIds } from "@/modules/Recipes/ui/hooks/useSelectableIds";

const ALL_FILTER_ID: QuickFilterId = "all";

export function useQuickFilters(initialFilters: QuickFilterId[]) {
  const { selectedIds, isSelected, toggle } = useSelectableIds(initialFilters, {
    allId: ALL_FILTER_ID,
    syncWithInitial: true
  });

  const apiParams = useMemo(() => {
    if (selectedIds.includes(ALL_FILTER_ID)) {
      return undefined;
    }

    const tags = selectedIds.filter(
      (filter): filter is RecipeTag => filter !== ALL_FILTER_ID
    );

    return tags.length > 0 ? { whereTags: tags } : undefined;
  }, [selectedIds]);

  return {
    isSelected,
    toggleFilter: toggle,
    apiParams
  };
}

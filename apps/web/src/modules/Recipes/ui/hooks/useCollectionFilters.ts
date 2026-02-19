import { useMemo } from "react";
import type { GetRecipesQueryParams } from "@/generated/types";
import { useSelectableIds } from "@/modules/Recipes/ui/hooks/useSelectableIds";

export const ALL_COLLECTION_FILTER_ID = "all";

type CollectionFilterApiParams = Pick<GetRecipesQueryParams, "whereCollectionIds">;

export function useCollectionFilters(initialIds: string[] = [ALL_COLLECTION_FILTER_ID]) {
  const { selectedIds, isSelected, toggle } = useSelectableIds(initialIds, {
    allId: ALL_COLLECTION_FILTER_ID,
  });

  const apiParams = useMemo<CollectionFilterApiParams | undefined>(() => {
    if (selectedIds.includes(ALL_COLLECTION_FILTER_ID)) {
      return undefined;
    }

    return selectedIds.length > 0 ? { whereCollectionIds: selectedIds } : undefined;
  }, [selectedIds]);

  return {
    selectedIds,
    isSelected,
    toggleCollection: toggle,
    apiParams,
  };
}

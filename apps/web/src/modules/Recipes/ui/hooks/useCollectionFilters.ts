import { useMemo } from "react";
import { useSelectableIds } from "@/modules/Recipes/ui/hooks/useSelectableIds";

const ALL_COLLECTION_ID = "all";

export function useCollectionFilters(initialIds: string[] = [ALL_COLLECTION_ID]) {
  const { selectedIds, isSelected, toggle } = useSelectableIds(initialIds, {
    allId: ALL_COLLECTION_ID
  });

  const apiParams = useMemo(() => {
    if (selectedIds.includes(ALL_COLLECTION_ID)) {
      return undefined;
    }
    return selectedIds.length > 0 ? { whereCollectionIds: selectedIds } : undefined;
  }, [selectedIds]);

  return {
    selectedIds,
    isSelected,
    toggleCollection: toggle,
    apiParams
  };
}

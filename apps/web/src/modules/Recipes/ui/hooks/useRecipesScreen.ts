import { useCallback, useMemo } from "react";
import { useRecipeCollections } from "@/modules/Recipes/api/useRecipeCollections";
import { useRecipes } from "@/modules/Recipes/api/useRecipes";
import { toRecipesQueryParams } from "@/modules/Recipes/application/recipes-query.schema";
import { DEFAULT_QUICK_FILTERS } from "@/modules/Recipes/domain/vo/recipes.filters";
import { ALL_COLLECTION_FILTER_ID, useCollectionFilters } from "@/modules/Recipes/ui/hooks/useCollectionFilters";
import { useQuickFilters } from "@/modules/Recipes/ui/hooks/useQuickFilters";
import { useDevSkeleton } from "@/shared/ui/hooks/useDevSkeleton";

export function useRecipesScreen() {
  const forceLoading = useDevSkeleton();

  const {
    selectedIds: selectedCollectionIds,
    toggleCollection,
    apiParams: collectionFiltersApiParams,
  } = useCollectionFilters();
  const {
    isSelected: isQuickFilterSelected,
    toggleFilter,
    apiParams: quickFiltersApiParams,
  } = useQuickFilters(DEFAULT_QUICK_FILTERS);

  const filters = useMemo(
    () =>
      toRecipesQueryParams({
        whereCollectionIds: collectionFiltersApiParams?.whereCollectionIds,
        whereTags: quickFiltersApiParams?.whereTags,
      }),
    [collectionFiltersApiParams?.whereCollectionIds, quickFiltersApiParams?.whereTags],
  );

  const recipesQuery = useRecipes(filters);
  const collectionsQuery = useRecipeCollections();

  const retry = useCallback(() => {
    void recipesQuery.refetch();
    void collectionsQuery.refetch();
  }, [collectionsQuery.refetch, recipesQuery.refetch]);

  const collectionsCount = useMemo(() => {
    if (selectedCollectionIds.includes(ALL_COLLECTION_FILTER_ID)) {
      return collectionsQuery.collections.length;
    }

    return selectedCollectionIds.length;
  }, [collectionsQuery.collections.length, selectedCollectionIds]);

  return {
    recipes: recipesQuery.recipes,
    collections: collectionsQuery.collections,
    totalRecipes: recipesQuery.totalItems,
    collectionsCount,
    selectedCollectionIds,
    isQuickFilterSelected,
    onToggleQuickFilter: toggleFilter,
    onToggleCollection: toggleCollection,
    isLoading: forceLoading || recipesQuery.isLoading || collectionsQuery.isLoading,
    error: forceLoading ? null : (recipesQuery.error ?? collectionsQuery.error),
    retry,
  };
}

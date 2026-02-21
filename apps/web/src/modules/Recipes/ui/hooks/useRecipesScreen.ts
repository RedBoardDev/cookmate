import { useCallback, useMemo } from "react";
import { useInfiniteRecipes } from "@/modules/Recipes/api/useInfiniteRecipes";
import { useRecipeCollections } from "@/modules/Recipes/api/useRecipeCollections";
import { DEFAULT_QUICK_FILTERS } from "@/modules/Recipes/domain/vo/recipes.filters";
import { ALL_COLLECTION_FILTER_ID, useCollectionFilters } from "@/modules/Recipes/ui/hooks/useCollectionFilters";
import { useRecipesInfiniteParams } from "@/modules/Recipes/ui/hooks/useRecipesInfiniteParams";
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

  const recipesQueryParams = useRecipesInfiniteParams({
    whereCollectionIds: collectionFiltersApiParams?.whereCollectionIds,
    whereCategories: quickFiltersApiParams?.whereCategories,
  });

  const recipesQuery = useInfiniteRecipes(recipesQueryParams);
  const collectionsQuery = useRecipeCollections();

  const retry = useCallback(() => {
    void Promise.all([recipesQuery.refetch(), collectionsQuery.refetch()]).catch(() => undefined);
  }, [collectionsQuery.refetch, recipesQuery.refetch]);

  const loadMore = useCallback(() => {
    if (!recipesQuery.hasNextPage || recipesQuery.isFetchingNextPage) {
      return;
    }

    void recipesQuery.fetchNextPage({ cancelRefetch: false }).catch(() => undefined);
  }, [recipesQuery.fetchNextPage, recipesQuery.hasNextPage, recipesQuery.isFetchingNextPage]);

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
    loadMoreError: forceLoading ? null : recipesQuery.loadMoreError,
    hasNextPage: recipesQuery.hasNextPage,
    isFetchingNextPage: recipesQuery.isFetchingNextPage,
    loadMore,
    retry,
  };
}

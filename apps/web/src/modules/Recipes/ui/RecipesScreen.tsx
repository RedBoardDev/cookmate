"use client";

import { useMemo } from "react";
import { RecipesView } from "@/modules/Recipes/ui/RecipesView";
import { RecipesErrorState } from "@/modules/Recipes/ui/states/RecipesErrorState";
import { useDevSkeleton } from "@/shared/ui/hooks/useDevSkeleton";
import { useRecipesData } from "@/modules/Recipes/api/useRecipesData";
import { useQuickFilters } from "@/modules/Recipes/ui/hooks/useQuickFilters";
import { useCollectionFilters } from "@/modules/Recipes/ui/hooks/useCollectionFilters";
import {
  DEFAULT_QUICK_FILTERS,
  QUICK_FILTER_OPTIONS
} from "@/modules/Recipes/domain/recipes.filters";

export function RecipesScreen() {
  const forceLoading = useDevSkeleton();

  const { isSelected, toggleFilter, apiParams: quickFiltersApiParams } = useQuickFilters(
    DEFAULT_QUICK_FILTERS
  );
  const {
    selectedIds: selectedCollectionIds,
    toggleCollection,
    apiParams: collectionsApiParams
  } = useCollectionFilters();

  const {
    recipes,
    collections,
    totalItems,
    isLoading,
    error,
    retry
  } = useRecipesData({
    filters: quickFiltersApiParams || collectionsApiParams
      ? {
        ...(collectionsApiParams ?? {}),
        ...(quickFiltersApiParams ?? {})
      }
      : undefined
  });

  const collectionsCount = useMemo(() => {
    if (selectedCollectionIds.includes("all")) {
      return collections.length;
    }
    return selectedCollectionIds.length;
  }, [selectedCollectionIds, collections.length]);


  if (!forceLoading && error) {
    return <RecipesErrorState onRetry={retry} />;
  }

  return (
    <RecipesView
      isLoading={forceLoading || isLoading}
      totalRecipes={totalItems}
      collectionsCount={collectionsCount}
      recipes={recipes}
      collections={collections}
      selectedCollectionIds={selectedCollectionIds}
      onToggleCollection={toggleCollection}
      quickFilters={QUICK_FILTER_OPTIONS}
      isQuickFilterSelected={isSelected}
      onToggleQuickFilter={toggleFilter}
    />
  );
}

"use client";

import type { ReactNode } from "react";
import { QUICK_FILTER_OPTIONS } from "@/modules/Recipes/domain/vo/recipes.filters";
import { RecipesFiltersProvider } from "@/modules/Recipes/ui/context/RecipesFiltersContext";
import { useRecipesScreen } from "@/modules/Recipes/ui/hooks/useRecipesScreen";
import { RecipesView } from "@/modules/Recipes/ui/RecipesView";
import { RecipesErrorState } from "@/modules/Recipes/ui/states/RecipesErrorState";

interface RecipesScreenProps {
  onManageCollections?: () => void;
  collectionsModal?: ReactNode;
  addRecipeAction?: ReactNode;
}

export function RecipesScreen({ onManageCollections, collectionsModal, addRecipeAction }: RecipesScreenProps) {
  const {
    recipes,
    collections,
    totalRecipes,
    collectionsCount,
    selectedCollectionIds,
    isQuickFilterSelected,
    onToggleQuickFilter,
    onToggleCollection,
    isLoading,
    loadMoreError,
    hasNextPage,
    isRefreshing,
    isFetchingNextPage,
    loadMore,
    error,
    retry,
  } = useRecipesScreen();

  if (error) {
    return <RecipesErrorState onRetry={retry} />;
  }

  return (
    <RecipesFiltersProvider
      value={{
        collections,
        collectionsCount,
        selectedCollectionIds,
        onToggleCollection,
        onManageCollections,
        quickFilters: QUICK_FILTER_OPTIONS,
        isQuickFilterSelected,
        onToggleQuickFilter,
      }}
    >
      <RecipesView
        isLoading={isLoading}
        totalRecipes={totalRecipes}
        recipes={recipes}
        hasNextPage={hasNextPage}
        isRefreshing={isRefreshing}
        isFetchingNextPage={isFetchingNextPage}
        hasLoadMoreError={loadMoreError !== null}
        onLoadMore={loadMore}
        onRetryLoadMore={loadMore}
        collectionsModal={collectionsModal}
        addRecipeAction={addRecipeAction}
      />
    </RecipesFiltersProvider>
  );
}

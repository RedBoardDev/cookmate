"use client";

import type { ReactNode } from "react";
import { QUICK_FILTER_OPTIONS } from "@/modules/Recipes/domain/vo/recipes.filters";
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
    <RecipesView
      isLoading={isLoading}
      totalRecipes={totalRecipes}
      collectionsCount={collectionsCount}
      recipes={recipes}
      collections={collections}
      selectedCollectionIds={selectedCollectionIds}
      onToggleCollection={onToggleCollection}
      quickFilters={QUICK_FILTER_OPTIONS}
      isQuickFilterSelected={isQuickFilterSelected}
      onToggleQuickFilter={onToggleQuickFilter}
      hasNextPage={hasNextPage}
      isRefreshing={isRefreshing}
      isFetchingNextPage={isFetchingNextPage}
      hasLoadMoreError={loadMoreError !== null}
      onLoadMore={loadMore}
      onRetryLoadMore={loadMore}
      onManageCollections={onManageCollections}
      collectionsModal={collectionsModal}
      addRecipeAction={addRecipeAction}
    />
  );
}

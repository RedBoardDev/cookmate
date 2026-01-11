"use client";

import { RecipesCollections } from "@/modules/Recipes/ui/components/RecipesCollections";
import { RecipesEmptyState } from "@/modules/Recipes/ui/states/RecipesEmptyState";
import { RecipesFilters } from "@/modules/Recipes/ui/components/RecipesFilters";
import { RecipesGrid } from "@/modules/Recipes/ui/components/RecipesGrid";
import { RecipesHeader } from "@/modules/Recipes/ui/components/RecipesHeader";
import type { RecipeAggregate } from "@/modules/Recipes/domain/recipe.aggregate";
import type { CollectionAggregate } from "@/modules/Recipes/domain/collection.aggregate";
import type {
  QuickFilterId,
  QuickFilterOption
} from "@/modules/Recipes/domain/recipes.filters";

interface RecipesViewProps {
  isLoading?: boolean;
  totalRecipes: number;
  collectionsCount: number;
  recipes: RecipeAggregate[];
  collections: CollectionAggregate[];
  selectedCollectionIds: string[];
  onToggleCollection: (collectionId: string) => void;
  quickFilters: QuickFilterOption[];
  isQuickFilterSelected: (filter: QuickFilterId) => boolean;
  onToggleQuickFilter: (filter: QuickFilterId) => void;
}

export function RecipesView({
  isLoading = false,
  totalRecipes,
  collectionsCount,
  recipes,
  collections,
  selectedCollectionIds,
  onToggleCollection,
  quickFilters,
  isQuickFilterSelected,
  onToggleQuickFilter
}: RecipesViewProps) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10">
      <div className="flex flex-col gap-8">
        <RecipesHeader
          totalRecipes={totalRecipes}
          collectionsCount={collectionsCount}
          isLoading={isLoading}
        />
        <RecipesCollections
          collections={collections}
          totalRecipes={totalRecipes}
          selectedIds={selectedCollectionIds}
          onToggle={onToggleCollection}
          isLoading={isLoading}
        />
        <RecipesFilters
          quickFilters={quickFilters}
          isSelected={isQuickFilterSelected}
          onToggle={onToggleQuickFilter}
          isLoading={isLoading}
        />
        {isLoading ? (
          <RecipesGrid recipes={recipes} isLoading />
        ) : recipes.length === 0 ? (
          <RecipesEmptyState />
        ) : (
          <RecipesGrid recipes={recipes} />
        )}
      </div>
    </section>
  );
}

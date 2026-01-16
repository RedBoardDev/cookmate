"use client";

import { RecipesCollections } from "@/modules/Recipes/ui/components/RecipesCollections";
import { RecipesEmptyState } from "@/modules/Recipes/ui/states/RecipesEmptyState";
import { RecipesFilters } from "@/modules/Recipes/ui/components/RecipesFilters";
import { RecipesGrid } from "@/modules/Recipes/ui/components/RecipesGrid";
import { RecipesHeader } from "@/modules/Recipes/ui/components/RecipesHeader";
import type { RecipeAggregate } from "@/modules/Recipes/domain/recipe.aggregate";
import type { CollectionAggregate } from "@/modules/Recipes/domain/collection.aggregate";
import { Card } from "@/shared/ui/primitives/card";
import { cn } from "@/shared/lib/utils";
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
    <section className="mx-auto w-full max-w-6xl px-4 pb-16 pt-8 md:pb-20">
      <div className="flex flex-col gap-8 md:gap-10">
        <Card
          variant="soft"
          border="soft"
          shadow="elevated"
          radius="2xl"
          padding="sm"
          className={cn(
            "md:rounded-3xl md:p-6",
            "motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-2"
          )}
        >
          <div className="flex flex-col gap-6">
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
          </div>
        </Card>
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

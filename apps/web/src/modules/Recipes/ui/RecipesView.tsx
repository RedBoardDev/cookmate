"use client";

import type React from "react";
import type { CollectionEntity } from "@/modules/Recipes/domain/entity/collection.entity";
import type { RecipeEntity } from "@/modules/Recipes/domain/entity/recipe.entity";
import type { QuickFilterId, QuickFilterOption } from "@/modules/Recipes/domain/vo/recipes.filters";
import { RecipesCollections } from "@/modules/Recipes/ui/components/RecipesCollections";
import { RecipesFilters } from "@/modules/Recipes/ui/components/RecipesFilters";
import { RecipesGrid } from "@/modules/Recipes/ui/components/RecipesGrid";
import { RecipesHeader } from "@/modules/Recipes/ui/components/RecipesHeader";
import { RecipesEmptyState } from "@/modules/Recipes/ui/states/RecipesEmptyState";
import { cn } from "@/shared/lib/utils";
import { Card } from "@/shared/ui/primitives/card";

interface RecipesViewProps {
  isLoading?: boolean;
  totalRecipes: number;
  collectionsCount: number;
  recipes: RecipeEntity[];
  collections: CollectionEntity[];
  selectedCollectionIds: string[];
  onToggleCollection: (collectionId: string) => void;
  quickFilters: QuickFilterOption[];
  isQuickFilterSelected: (filter: QuickFilterId) => boolean;
  onToggleQuickFilter: (filter: QuickFilterId) => void;
  onManageCollections?: () => void;
  collectionsModal?: React.ReactNode;
  addRecipeAction?: React.ReactNode;
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
  onToggleQuickFilter,
  onManageCollections,
  collectionsModal,
  addRecipeAction,
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
            "motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-2",
          )}
        >
          <div className="flex flex-col gap-6">
            <RecipesHeader totalRecipes={totalRecipes} collectionsCount={collectionsCount} isLoading={isLoading} />
            <RecipesCollections
              collections={collections}
              totalRecipes={totalRecipes}
              selectedIds={selectedCollectionIds}
              onToggle={onToggleCollection}
              isLoading={isLoading}
              onManageClick={onManageCollections}
            />
            {collectionsModal}
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
          <RecipesEmptyState addRecipeAction={addRecipeAction} />
        ) : (
          <RecipesGrid recipes={recipes} />
        )}
      </div>
    </section>
  );
}

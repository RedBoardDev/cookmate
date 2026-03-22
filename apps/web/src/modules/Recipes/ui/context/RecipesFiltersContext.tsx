"use client";

import { createContext, useContext } from "react";
import type { CollectionEntity } from "@/modules/Recipes/domain/entity/collection.entity";
import type { QuickFilterId, QuickFilterOption } from "@/modules/Recipes/domain/vo/recipes.filters";

interface RecipesFiltersContextValue {
  collections: CollectionEntity[];
  collectionsCount: number;
  selectedCollectionIds: string[];
  onToggleCollection: (id: string) => void;
  onManageCollections?: () => void;
  quickFilters: QuickFilterOption[];
  isQuickFilterSelected: (id: QuickFilterId) => boolean;
  onToggleQuickFilter: (id: QuickFilterId) => void;
}

const RecipesFiltersContext = createContext<RecipesFiltersContextValue | null>(null);

export const RecipesFiltersProvider = RecipesFiltersContext.Provider;

export function useRecipesFilters(): RecipesFiltersContextValue {
  const context = useContext(RecipesFiltersContext);
  if (!context) {
    throw new Error("useRecipesFilters must be used within RecipesFiltersProvider");
  }
  return context;
}

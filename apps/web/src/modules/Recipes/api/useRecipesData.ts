"use client";

import { useMemo } from "react";
import { useRecipes } from "@/modules/Recipes/api/useRecipes";
import { useRecipeCollections } from "@/modules/Recipes/api/useRecipeCollections";
import { RecipeMapper } from "@/modules/Recipes/application/recipe.mapper";
import { CollectionMapper } from "@/modules/Recipes/application/collection.mapper";
import { RecipeAggregate } from "@/modules/Recipes/domain/recipe.aggregate";
import { CollectionAggregate } from "@/modules/Recipes/domain/collection.aggregate";
import type { GetRecipesQueryParams } from "@/generated/types";

interface UseRecipesDataParams {
  filters?: GetRecipesQueryParams;
}

export function useRecipesData({ filters }: UseRecipesDataParams = {}) {
  const recipesQuery = useRecipes(filters);
  const collectionsQuery = useRecipeCollections();

  const recipes = useMemo(() => {
    const data = recipesQuery.data?.data ?? [];
    return data.map((item) =>
      RecipeAggregate.create({
        recipe: RecipeMapper.toDomain(item),
        imageUrl: null,
        href: `/recipes/${item.id}`
      })
    );
  }, [recipesQuery.data]);

  const totalItems = useMemo(
    () =>
      recipesQuery.data?.metadata?.pagination.totalItems ?? recipes.length,
    [recipesQuery.data?.metadata?.pagination.totalItems, recipes.length]
  );

  const collections = useMemo(() => {
    const data = collectionsQuery.data?.data ?? [];
    return data.map((item) =>
      CollectionAggregate.create({
        collection: CollectionMapper.toDomain(item),
        recipeCount: item.recipeCount
      })
    );
  }, [collectionsQuery.data]);

  const isLoading = recipesQuery.isLoading || collectionsQuery.isLoading;
  const error = recipesQuery.error || collectionsQuery.error;

  const retry = () => {
    recipesQuery.refetch();
    collectionsQuery.refetch();
  };

  return {
    recipes,
    collections,
    totalItems,
    isLoading,
    error,
    retry
  };
}

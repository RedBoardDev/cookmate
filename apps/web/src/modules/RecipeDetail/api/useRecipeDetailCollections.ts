"use client";

import { useMemo } from "react";
import { useGetCollections } from "@/generated/hooks";
import { RecipeDetailCollectionMapper } from "@/modules/RecipeDetail/application/recipeDetailCollection.mapper";

export function useRecipeDetailCollections() {
  const apiQuery = useGetCollections(undefined, {
    query: {
      retry: false,
    },
  });

  const collections = useMemo(() => {
    const data = apiQuery.data?.data ?? [];
    return data.map((collection) => RecipeDetailCollectionMapper.toDomain(collection));
  }, [apiQuery.data]);

  return {
    collections,
    error: apiQuery.error,
    isLoading: apiQuery.isLoading,
    refetch: apiQuery.refetch,
  };
}

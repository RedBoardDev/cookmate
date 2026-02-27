"use client";

import { useGetRecipesRecipeidImages } from "@/generated/hooks";

export function useRecipeDetailImages(recipeId: string) {
  const apiQuery = useGetRecipesRecipeidImages(recipeId, undefined, {
    query: {
      retry: false,
      enabled: recipeId.length > 0,
    },
  });

  return {
    images: apiQuery.data?.data ?? [],
    error: apiQuery.error,
    isLoading: apiQuery.isLoading,
    refetch: apiQuery.refetch,
  };
}

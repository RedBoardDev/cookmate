"use client";

import { useGetRecipesRecipeid } from "@/generated/hooks";

export function useRecipeDetail(recipeId: string) {
  const apiQuery = useGetRecipesRecipeid(recipeId, {
    query: {
      retry: false,
      enabled: recipeId.length > 0,
    },
  });

  return {
    recipe: apiQuery.data,
    error: apiQuery.error,
    isLoading: apiQuery.isLoading,
    refetch: apiQuery.refetch,
  };
}

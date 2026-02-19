"use client";

import { useMemo } from "react";
import { useGetRecipesRecipeid } from "@/generated/hooks";
import { RecipeDetailMapper } from "@/modules/RecipeDetail/application/recipeDetail.mapper";

export function useRecipeDetail(recipeId: string) {
  const apiQuery = useGetRecipesRecipeid(recipeId, {
    query: {
      retry: false,
      enabled: recipeId.length > 0,
    },
  });

  const detail = useMemo(() => {
    return RecipeDetailMapper.toDomain(apiQuery.data);
  }, [apiQuery.data]);

  return {
    detail,
    error: apiQuery.error,
    isLoading: apiQuery.isLoading,
    refetch: apiQuery.refetch,
  };
}

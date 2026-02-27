"use client";

import { useCallback, useMemo } from "react";
import { useRecipeDetail } from "@/modules/RecipeDetail/api/useRecipeDetail";
import { useRecipeDetailImages } from "@/modules/RecipeDetail/api/useRecipeDetailImages";
import { RecipeDetailMapper } from "@/modules/RecipeDetail/application/recipeDetail.mapper";

export function useRecipeDetailAggregate(recipeId: string) {
  const recipeQuery = useRecipeDetail(recipeId);
  const imagesQuery = useRecipeDetailImages(recipeId);

  const detail = useMemo(() => {
    return RecipeDetailMapper.toDomain(recipeQuery.recipe, imagesQuery.images);
  }, [imagesQuery.images, recipeQuery.recipe]);

  const refetch = useCallback(() => {
    return Promise.all([recipeQuery.refetch(), imagesQuery.refetch()]);
  }, [imagesQuery.refetch, recipeQuery.refetch]);

  return {
    detail,
    error: recipeQuery.error ?? imagesQuery.error,
    isLoading: recipeQuery.isLoading || imagesQuery.isLoading,
    refetch,
  };
}

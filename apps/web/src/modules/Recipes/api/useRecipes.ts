"use client";

import { useMemo } from "react";
import { useGetRecipes } from "@/generated/hooks";
import type { GetRecipesQueryParams } from "@/generated/types";
import { RecipeMapper } from "@/modules/Recipes/application/recipe.mapper";

const DEFAULT_PAGE_SIZE = 20;

export function useRecipes(params?: GetRecipesQueryParams) {
  const queryParams = useMemo(
    () => ({
      pageSize: params?.pageSize ?? DEFAULT_PAGE_SIZE,
      ...params,
    }),
    [params],
  );

  const apiQuery = useGetRecipes(queryParams, {
    query: {
      retry: false,
      placeholderData: (previous) => previous,
    },
  });

  const recipes = useMemo(() => {
    const data = apiQuery.data?.data ?? [];
    return data.map((item) => RecipeMapper.toDomain(item));
  }, [apiQuery.data]);

  const totalItems = useMemo(
    () => apiQuery.data?.metadata?.pagination.totalItems ?? recipes.length,
    [apiQuery.data?.metadata?.pagination.totalItems, recipes.length],
  );

  return {
    recipes,
    totalItems,
    error: apiQuery.error,
    isLoading: apiQuery.isLoading,
    refetch: apiQuery.refetch,
  };
}

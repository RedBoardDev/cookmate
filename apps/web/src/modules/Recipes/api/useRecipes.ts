"use client";

import { useGetRecipes } from "@/generated/hooks";
import type { GetRecipesQueryParams } from "@/generated/types";

export function useRecipes(params?: GetRecipesQueryParams) {
  const queryParams = {
    pageSize: 20,
    ...params
  };

  const apiQuery = useGetRecipes(queryParams, {
    query: {
      retry: false,
      placeholderData: (previous) => previous
    }
  });

  return {
    data: apiQuery.data,
    error: apiQuery.error,
    isLoading: apiQuery.isLoading,
    refetch: apiQuery.refetch
  };
}

"use client";

import { useGetCollections } from "@/generated/hooks";

export function useRecipeCollections() {
  const apiQuery = useGetCollections(undefined, {
    query: {
      retry: false
    }
  });

  return {
    data: apiQuery.data,
    error: apiQuery.error,
    isLoading: apiQuery.isLoading,
    refetch: apiQuery.refetch
  };
}

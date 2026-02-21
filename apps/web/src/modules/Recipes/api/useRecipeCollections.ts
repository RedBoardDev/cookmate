"use client";

import { useMemo } from "react";
import { useGetCollections } from "@/generated/hooks";
import { CollectionMapper } from "@/modules/Recipes/application/collection.mapper";

export function useRecipeCollections() {
  const apiQuery = useGetCollections(undefined, {
    query: {
      retry: false,
    },
  });

  const collections = useMemo(() => {
    const data = apiQuery.data?.data ?? [];
    return data.map((item) => CollectionMapper.toDomain(item));
  }, [apiQuery.data]);

  return {
    collections,
    error: apiQuery.error,
    isLoading: apiQuery.isLoading,
    refetch: apiQuery.refetch,
  };
}

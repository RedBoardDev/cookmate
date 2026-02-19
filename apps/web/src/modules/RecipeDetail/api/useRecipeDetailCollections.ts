"use client";

import { useMemo } from "react";
import { useGetCollections } from "@/generated/hooks";
import type { GetCollectionsQueryParams } from "@/generated/types";
import { RecipeDetailCollectionMapper } from "@/modules/RecipeDetail/application/recipeDetailCollection.mapper";

type UseRecipeDetailCollectionsOptions = {
  whereRole?: GetCollectionsQueryParams["whereRole"];
};

export function useRecipeDetailCollections(options: UseRecipeDetailCollectionsOptions = {}) {
  const params: GetCollectionsQueryParams | undefined = options.whereRole
    ? { whereRole: options.whereRole }
    : undefined;

  const apiQuery = useGetCollections(params, {
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

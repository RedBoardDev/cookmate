"use client";

import { useMemo } from "react";
import { useGetCollections } from "@/generated/hooks";
import type { GetCollectionsQueryParams } from "@/generated/types";
import { CollectionMapper } from "@/modules/Recipes/application/collection.mapper";

type UseRecipeCollectionsOptions = {
  whereRole?: GetCollectionsQueryParams["whereRole"];
};

export function useRecipeCollections(options: UseRecipeCollectionsOptions = {}) {
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
    return data.map((item) => CollectionMapper.toDomain(item));
  }, [apiQuery.data]);

  return {
    collections,
    error: apiQuery.error,
    isLoading: apiQuery.isLoading,
    refetch: apiQuery.refetch,
  };
}

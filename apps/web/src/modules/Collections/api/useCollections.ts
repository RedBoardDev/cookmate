"use client";

import { useMemo } from "react";
import { useGetCollections } from "@/generated/hooks";
import type { GetCollectionsQueryParams } from "@/generated/types";
import { CollectionMapper } from "@/modules/Collections/application/collection.mapper";

type UseCollectionsOptions = {
  whereRole?: GetCollectionsQueryParams["whereRole"];
};

export function useCollections(options: UseCollectionsOptions = {}) {
  const params: GetCollectionsQueryParams | undefined = options.whereRole
    ? { whereRole: options.whereRole }
    : undefined;

  const apiQuery = useGetCollections(params, {
    query: {
      retry: false,
    },
  });

  const collections = useMemo(() => {
    if (!apiQuery.data?.data) {
      return [];
    }

    return apiQuery.data.data.map((data) => CollectionMapper.toDomain(data));
  }, [apiQuery.data]);

  return {
    collections,
    error: apiQuery.error,
    isLoading: apiQuery.isLoading,
  };
}

"use client";

import { useMemo } from "react";
import { useGetCollections } from "@/generated/hooks";
import { CollectionMapper } from "@/modules/Collections/application/collection.mapper";

export function useCollections() {
  const apiQuery = useGetCollections(undefined, {
    query: {
      retry: false
    }
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
    isLoading: apiQuery.isLoading
  };
}

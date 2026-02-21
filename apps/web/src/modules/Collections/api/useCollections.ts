"use client";

import { useMemo } from "react";
import { useGetCollections } from "@/generated/hooks";
import { CollectionMapper } from "@/modules/Collections/application/collection.mapper";

export function useCollections() {
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
  };
}

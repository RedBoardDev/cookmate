"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useDeleteCollectionsCollectionid } from "@/generated/hooks";
import { getCollectionsQueryKey } from "@/generated/hooks/CollectionsHooks/useGetCollections";
import type { ApiError } from "@/shared/core/network/api-error";

type UseDeleteCollectionOptions = {
  onSuccess?: () => void;
  onError?: (error: ApiError) => void;
};

export function useDeleteCollection(options: UseDeleteCollectionOptions = {}) {
  const queryClient = useQueryClient();

  const deleteCollection = useDeleteCollectionsCollectionid({
    mutation: {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: getCollectionsQueryKey(),
        });
        options.onSuccess?.();
      },
      onError: (error) => {
        options.onError?.(error as ApiError);
      },
    },
  });

  return {
    ...deleteCollection,
    mutate: (collectionId: string) => {
      deleteCollection.mutate({ collectionId });
    },
  };
}

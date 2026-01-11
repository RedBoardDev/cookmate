"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useDeleteCollectionsCollectionid } from "@/generated/hooks";
import { getCollectionsQueryKey } from "@/generated/hooks/CollectionsHooks/useGetCollections";

export function useDeleteCollection() {
  const queryClient = useQueryClient();

  const deleteCollection = useDeleteCollectionsCollectionid({
    mutation: {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: getCollectionsQueryKey()
        });
      }
    }
  });

  return {
    ...deleteCollection,
    mutate: (collectionId: string) => {
      deleteCollection.mutate({ collectionId });
    }
  };
}

"use client";

import { useQueryClient } from "@tanstack/react-query";
import { usePostCollections } from "@/generated/hooks";
import { getCollectionsQueryKey } from "@/generated/hooks/CollectionsHooks/useGetCollections";
import type { PostCollectionsMutationResponse } from "@/generated/types";
import type { CreateCollectionInput } from "@/modules/Collections/application/collection.schema";
import type { ApiError } from "@/shared/core/network/api-error";

type UseCreateCollectionOptions = {
  onSuccess?: (data: PostCollectionsMutationResponse) => void;
  onError?: (error: ApiError) => void;
};

export function useCreateCollection(options: UseCreateCollectionOptions = {}) {
  const queryClient = useQueryClient();

  const createCollection = usePostCollections({
    mutation: {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries({
          queryKey: getCollectionsQueryKey(),
        });
        options.onSuccess?.(data);
      },
      onError: (error) => {
        options.onError?.(error);
      },
    },
  });

  type MutateOptions = Parameters<typeof createCollection.mutate>[1];

  return {
    ...createCollection,
    mutate: (input: CreateCollectionInput, mutateOptions?: MutateOptions) => {
      createCollection.mutate(
        {
          data: {
            name: input.name,
            emoji: input.emoji,
            description: input.description,
          },
        },
        mutateOptions,
      );
    },
  };
}

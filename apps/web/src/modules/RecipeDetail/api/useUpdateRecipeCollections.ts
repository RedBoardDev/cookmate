"use client";

import { useQueryClient } from "@tanstack/react-query";
import {
  getCollectionsQueryKey,
  getRecipesRecipeidQueryKey,
  usePatchRecipesRecipeidCollections,
} from "@/generated/hooks";
import type { ApiError } from "@/shared/lib/api-error";

type UseUpdateRecipeCollectionsOptions = {
  recipeId: string;
  onSuccess?: () => void;
  onError?: (error: ApiError) => void;
};

export function useUpdateRecipeCollections(options: UseUpdateRecipeCollectionsOptions) {
  const queryClient = useQueryClient();

  const updateCollections = usePatchRecipesRecipeidCollections({
    mutation: {
      onSuccess: async () => {
        await Promise.all([
          queryClient.invalidateQueries({
            queryKey: getRecipesRecipeidQueryKey(options.recipeId),
          }),
          queryClient.invalidateQueries({
            queryKey: getCollectionsQueryKey(),
          }),
        ]);
        options.onSuccess?.();
      },
      onError: (error) => {
        options.onError?.(error);
      },
    },
  });

  type MutateOptions = Parameters<typeof updateCollections.mutate>[1];

  return {
    ...updateCollections,
    mutate: (collectionIds: string[], mutateOptions?: MutateOptions) => {
      updateCollections.mutate(
        {
          recipeId: options.recipeId,
          data: {
            collectionIds,
          },
        },
        mutateOptions,
      );
    },
  };
}

"use client";

import { useQueryClient } from "@tanstack/react-query";
import { getRecipesQueryKey, usePostRecipes } from "@/generated/hooks";
import type { PostRecipesMutationRequest, PostRecipesMutationResponse } from "@/generated/types";
import type { ApiError } from "@/shared/core/network/api-error";

type UseCreateRecipeOptions = {
  onSuccess?: (data: PostRecipesMutationResponse) => void;
  onError?: (error: ApiError) => void;
};

export function useCreateRecipe(options: UseCreateRecipeOptions = {}) {
  const queryClient = useQueryClient();

  const createRecipe = usePostRecipes({
    mutation: {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries({
          queryKey: getRecipesQueryKey(),
        });
        options.onSuccess?.(data);
      },
      onError: (error) => {
        options.onError?.(error);
      },
    },
  });

  type MutateOptions = Parameters<typeof createRecipe.mutate>[1];
  type MutateAsyncOptions = Parameters<typeof createRecipe.mutateAsync>[1];

  return {
    ...createRecipe,
    error: createRecipe.error as ApiError | null,
    mutate: (input: PostRecipesMutationRequest, mutateOptions?: MutateOptions) => {
      createRecipe.mutate(
        {
          data: input,
        },
        mutateOptions,
      );
    },
    mutateAsync: (input: PostRecipesMutationRequest, mutateOptions?: MutateAsyncOptions) => {
      return createRecipe.mutateAsync(
        {
          data: input,
        },
        mutateOptions,
      );
    },
  };
}

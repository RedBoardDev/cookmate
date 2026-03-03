"use client";

import { useQueryClient } from "@tanstack/react-query";
import { getRecipesQueryKey, getRecipesRecipeidQueryKey, usePutRecipesRecipeid } from "@/generated/hooks";
import type { PutRecipesRecipeidMutationRequest, PutRecipesRecipeidMutationResponse } from "@/generated/types";
import type { ApiError } from "@/shared/core/network/api-error";

interface UpdateRecipeInput {
  recipeId: string;
  data: PutRecipesRecipeidMutationRequest;
}

type UseUpdateRecipeOptions = {
  onSuccess?: (data: PutRecipesRecipeidMutationResponse, input: UpdateRecipeInput) => void;
  onError?: (error: ApiError) => void;
};

export function useUpdateRecipe(options: UseUpdateRecipeOptions = {}) {
  const queryClient = useQueryClient();

  const updateRecipe = usePutRecipesRecipeid({
    mutation: {
      onSuccess: async (data, input) => {
        await Promise.all([
          queryClient.invalidateQueries({
            queryKey: getRecipesQueryKey(),
          }),
          queryClient.invalidateQueries({
            queryKey: getRecipesRecipeidQueryKey(input.recipeId),
          }),
        ]);

        options.onSuccess?.(data, input);
      },
      onError: (error) => {
        options.onError?.(error);
      },
      retry: false,
    },
  });

  return {
    ...updateRecipe,
    error: updateRecipe.error as ApiError | null,
  };
}

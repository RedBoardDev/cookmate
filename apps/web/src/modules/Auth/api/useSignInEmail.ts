"use client";

import { useQueryClient } from "@tanstack/react-query";
import { getSessionQueryKey, useSignInEmail as useSignInEmailGenerated } from "@/generated/hooks";
import type { SignInEmailMutationResponse } from "@/generated/types";
import type { ResponseErrorConfig } from "@/shared/core/network/httpClient";

type UseSignInEmailOptions = {
  onSuccess?: (data: SignInEmailMutationResponse) => void;
  onError?: (error: ResponseErrorConfig) => void;
};

export function useSignInEmail(options: UseSignInEmailOptions = {}) {
  const queryClient = useQueryClient();

  return useSignInEmailGenerated({
    mutation: {
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: getSessionQueryKey() });
        options.onSuccess?.(data);
      },
      onError: (error) => {
        options.onError?.(error);
      },
    },
  });
}

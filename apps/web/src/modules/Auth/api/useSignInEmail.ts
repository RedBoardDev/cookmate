"use client";

import { useSignInEmail as useSignInEmailGenerated } from "@/generated/hooks";
import { getSessionQueryKey } from "@/generated/hooks";
import type {
  SignInEmailMutationResponse,
  SignInEmailMutationRequest
} from "@/generated/types";
import type { ResponseErrorConfig } from "@/shared/lib/httpClient";
import { useQueryClient } from "@tanstack/react-query";

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
      }
    }
  });
}

export type SignInEmailInput = SignInEmailMutationRequest;

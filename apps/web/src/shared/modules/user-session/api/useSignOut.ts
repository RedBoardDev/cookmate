"use client";

import { useQueryClient } from "@tanstack/react-query";
import { getSessionQueryKey, useSignOut as useSignOutGenerated } from "@/generated/hooks";

type UseSignOutOptions = {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
};

export function useSignOut(options: UseSignOutOptions = {}) {
  const queryClient = useQueryClient();

  return useSignOutGenerated({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getSessionQueryKey() });
        options.onSuccess?.();
      },
      onError: (error) => {
        options.onError?.(error);
      },
    },
  });
}

"use client";

import { useSignOut as useSignOutGenerated } from "@/generated/hooks";
import { getSessionQueryKey } from "@/generated/hooks";
import { useQueryClient } from "@tanstack/react-query";

type UseSignOutOptions = {
  onSuccess?: () => void;
};

export function useSignOut(options: UseSignOutOptions = {}) {
  const queryClient = useQueryClient();

  return useSignOutGenerated({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getSessionQueryKey() });
        options.onSuccess?.();
      }
    }
  });
}

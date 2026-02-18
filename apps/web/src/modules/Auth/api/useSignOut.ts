"use client";

import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getSessionQueryKey, useSignOut as useSignOutGenerated } from "@/generated/hooks";

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
      },
      onError: () => {
        toast.error("Sign out failed. Please try again.");
      },
    },
  });
}

"use client";

import { useQueryClient } from "@tanstack/react-query";
import type { ResponseErrorConfig } from "@/shared/lib/httpClient";
import { useChangePassword } from "@/generated/hooks/AuthHooks/useChangePassword";
import { useSession } from "@/modules/Auth/api/useSession";
import type { ChangePasswordInput } from "../application/password.schema";
import { getSessionQueryKey } from "@/generated";

interface UseChangePasswordSettingsOptions {
  onSuccess?: () => void;
  onError?: (error: ResponseErrorConfig<any>) => void;
}

export function useChangePasswordSettings(
  options: UseChangePasswordSettingsOptions = {}
) {
  const queryClient = useQueryClient();
  const { refresh } = useSession();

  const changePassword = useChangePassword({
    mutation: {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: [getSessionQueryKey()],
        });
        await refresh();
        options.onSuccess?.();
      },
      onError: (error) => {
        options.onError?.(error);
      },
    },
  });

  return {
    ...changePassword,
    mutate: (input: ChangePasswordInput) => {
      changePassword.mutate({
        data: {
          currentPassword: input.currentPassword,
          newPassword: input.newPassword,
          revokeOtherSessions: input.revokeOtherSessions ?? false,
        },
      });
    },
  };
}

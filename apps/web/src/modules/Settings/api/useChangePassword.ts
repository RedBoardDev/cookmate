"use client";

import { useQueryClient } from "@tanstack/react-query";
import { getSessionQueryKey } from "@/generated";
import { useChangePassword } from "@/generated/hooks/AuthHooks/useChangePassword";
import type { ApiError } from "@/shared/core/network/api-error";
import { useCurrentSession } from "@/shared/modules/user-session/api/useCurrentSession";
import type { ChangePasswordInput } from "../application/password.schema";

interface UseChangePasswordSettingsOptions {
  onSuccess?: () => void;
  onError?: (error: ApiError) => void;
}

export function useChangePasswordSettings(options: UseChangePasswordSettingsOptions = {}) {
  const queryClient = useQueryClient();
  const { refresh } = useCurrentSession();

  const changePassword = useChangePassword({
    mutation: {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: getSessionQueryKey(),
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

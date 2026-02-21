import { useQueryClient } from "@tanstack/react-query";
import { getSessionQueryKey } from "@/generated";
import { useUpdateUser } from "@/generated/hooks/AuthHooks/useUpdateUser";
import type { ApiError } from "@/shared/core/network/api-error";
import { useCurrentSession } from "@/shared/modules/user-session/api/useCurrentSession";
import type { UpdateProfileInput } from "../application/settings.schema";

interface UseUpdateUserSettingsOptions {
  onSuccess?: () => void;
  onError?: (error: ApiError) => void;
}

export function useUpdateUserSettings(options: UseUpdateUserSettingsOptions = {}) {
  const queryClient = useQueryClient();
  const { refresh } = useCurrentSession();

  const updateUser = useUpdateUser({
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
    ...updateUser,
    mutate: (input: UpdateProfileInput) => {
      updateUser.mutate({
        data: {
          name: input.name,
          image: input.avatar ?? undefined,
        },
      });
    },
  };
}

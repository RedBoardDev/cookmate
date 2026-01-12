import { useQueryClient } from "@tanstack/react-query";
import type { ResponseErrorConfig } from "@/shared/lib/httpClient";
import { useUpdateUser } from "@/generated/hooks/AuthHooks/useUpdateUser";
import { useSession } from "@/modules/Auth/api/useSession";
import type { UpdateProfileInput } from "../application/settings.schema";
import { getSessionQueryKey } from "@/generated";

interface UseUpdateUserSettingsOptions {
  onSuccess?: () => void;
  onError?: (error: ResponseErrorConfig<any>) => void;
}

export function useUpdateUserSettings(
  options: UseUpdateUserSettingsOptions = {}
) {
  const queryClient = useQueryClient();
  const { refresh } = useSession();

  const updateUser = useUpdateUser({
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

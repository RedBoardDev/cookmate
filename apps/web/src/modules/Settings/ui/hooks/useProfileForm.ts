"use client";

import { useForm } from "@tanstack/react-form";
import { useEffect } from "react";
import type { SettingsAggregate } from "@/modules/Settings/domain/entity/settings.aggregate";
import type { ApiError } from "@/shared/core/network/api-error";
import { useUpdateUserSettings } from "../../api/useUpdateUserSettings";
import { updateProfileDefaultValues, updateProfileSchema } from "../../application/settings.schema";

interface UseProfileFormOptions {
  initialData: SettingsAggregate["profile"];
  onSuccess?: () => void;
  onError?: (error: ApiError) => void;
}

export function useProfileForm({ initialData, onSuccess, onError }: UseProfileFormOptions) {
  const mutation = useUpdateUserSettings({
    onSuccess: () => {
      onSuccess?.();
    },
    onError: (error: ApiError) => {
      onError?.(error);
    },
  });

  const form = useForm({
    defaultValues: {
      ...updateProfileDefaultValues,
      ...initialData,
    },
    validators: {
      onChange: updateProfileSchema,
    },
    onSubmit: ({ value }) => {
      mutation.mutate(value);
    },
  });

  useEffect(() => {
    form.reset({
      ...updateProfileDefaultValues,
      ...initialData,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- form.reset is stable, including `form` causes infinite loop
  }, [initialData.name, initialData.avatar]);

  return {
    form,
    isSubmitting: mutation.isPending,
    error: mutation.error,
  };
}

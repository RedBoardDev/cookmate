"use client";

import { useEffect } from "react";
import { useForm } from "@tanstack/react-form";
import type { ResponseErrorConfig } from "@/shared/lib/httpClient";
import { useUpdateUserSettings } from "../../api/useUpdateUserSettings";
import {
  updateProfileSchema,
  updateProfileDefaultValues,
} from "../../application/settings.schema";
import type { SettingsAggregate } from "../../domain/settings.aggregate";

interface UseProfileFormOptions {
  initialData: SettingsAggregate["profile"];
  onSuccess?: () => void;
  onError?: (error: ResponseErrorConfig<any>) => void;
}

export function useProfileForm({
  initialData,
  onSuccess,
  onError,
}: UseProfileFormOptions) {
  const mutation = useUpdateUserSettings({
    onSuccess: () => {
      onSuccess?.();
    },
    onError: (error: ResponseErrorConfig<any>) => {
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
      const validatedData = updateProfileSchema.parse(value);
      mutation.mutate(validatedData);
    },
  });

  useEffect(() => {
    form.reset({
      ...updateProfileDefaultValues,
      ...initialData,
    });
  }, [initialData.name, initialData.avatar, form]);

  return {
    form,
    isSubmitting: mutation.isPending,
    error: mutation.error,
  };
}

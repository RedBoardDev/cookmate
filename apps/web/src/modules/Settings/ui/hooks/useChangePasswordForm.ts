"use client";

import { useLingui } from "@lingui/react/macro";
import { useForm } from "@tanstack/react-form";
import { useEffect, useMemo } from "react";
import type { ApiError } from "@/shared/core/network/api-error";
import { useChangePasswordSettings } from "../../api/useChangePassword";
import { changePasswordDefaultValues, createChangePasswordSchema } from "../../application/password.schema";

interface UseChangePasswordFormOptions {
  onSuccess?: () => void;
  onError?: (error: ApiError) => void;
}

export function useChangePasswordForm(options: UseChangePasswordFormOptions = {}) {
  const { i18n } = useLingui();
  const schema = useMemo(() => createChangePasswordSchema(i18n), [i18n]);

  const mutation = useChangePasswordSettings({
    onSuccess: () => {
      options.onSuccess?.();
    },
    onError: (error: ApiError) => {
      options.onError?.(error);
    },
  });

  const form = useForm({
    defaultValues: changePasswordDefaultValues,
    onSubmit: ({ value }) => {
      const validated = schema.parse(value);
      mutation.mutate(validated);
    },
  });

  useEffect(() => {
    if (mutation.isSuccess) {
      form.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- form.reset is stable, including `form` causes infinite loop
  }, [mutation.isSuccess]);

  return {
    form,
    isSubmitting: mutation.isPending,
    error: mutation.error,
  };
}

"use client";

import { useEffect } from "react";
import { useForm } from "@tanstack/react-form";
import type { ResponseErrorConfig } from "@/shared/lib/httpClient";
import { useChangePasswordSettings } from "../../api/useChangePassword";
import {
  changePasswordSchema,
  changePasswordDefaultValues,
} from "../../application/password.schema";

interface UseChangePasswordFormOptions {
  onSuccess?: () => void;
  onError?: (error: ResponseErrorConfig<any>) => void;
}

export function useChangePasswordForm(
  options: UseChangePasswordFormOptions = {}
) {
  const mutation = useChangePasswordSettings({
    onSuccess: () => {
      options.onSuccess?.();
    },
    onError: (error: ResponseErrorConfig<any>) => {
      options.onError?.(error);
    },
  });

  const form = useForm({
    defaultValues: changePasswordDefaultValues,
    onSubmit: ({ value }) => {
      const validatedData = changePasswordSchema.parse(value);
      mutation.mutate(validatedData);
    },
  });

  useEffect(() => {
    if (mutation.isSuccess) {
      form.reset();
    }
  }, [mutation.isSuccess, form]);

  return {
    form,
    isSubmitting: mutation.isPending,
    error: mutation.error,
  };
}

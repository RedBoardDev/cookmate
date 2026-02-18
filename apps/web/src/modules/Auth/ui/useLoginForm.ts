"use client";

import { useLingui } from "@lingui/react";
import { useForm } from "@tanstack/react-form";
import { useMemo } from "react";
import type { SignInEmailMutationResponse } from "@/generated/types";
import type { ApiError } from "@/shared/lib/api-error";
import { useSignInEmail } from "../api/useSignInEmail";
import { createLoginSchema, loginDefaultValues } from "../application/auth.schema";

type UseLoginFormOptions = {
  onSuccess?: (data: SignInEmailMutationResponse) => void;
  onError?: (error: ApiError) => void;
};

export function useLoginForm(options: UseLoginFormOptions = {}) {
  const { i18n } = useLingui();
  const loginSchema = useMemo(() => createLoginSchema(i18n), [i18n]);

  const mutation = useSignInEmail({
    onSuccess: options.onSuccess,
    onError: options.onError,
  });

  const form = useForm({
    defaultValues: loginDefaultValues,
    validators: {
      onChange: loginSchema,
    },
    onSubmit: ({ value }) => {
      mutation.mutate({
        data: {
          email: value.email,
          password: value.password,
        },
      });
    },
  });

  return {
    form,
    isSubmitting: mutation.isPending,
    error: mutation.error,
  };
}

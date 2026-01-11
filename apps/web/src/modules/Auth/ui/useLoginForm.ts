"use client";

import { useForm } from "@tanstack/react-form";
import type { ResponseErrorConfig } from "@/shared/lib/httpClient";
import { useSignInEmail } from "../api/useSignInEmail";
import type { SignInEmailMutationResponse } from "@/generated/types";
import {
  loginSchema,
  loginDefaultValues,
} from "../application/auth.schema";

type UseLoginFormOptions = {
  onSuccess?: (data: SignInEmailMutationResponse) => void;
  onError?: (error: ResponseErrorConfig<any>) => void;
};

export function useLoginForm(options: UseLoginFormOptions = {}) {
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
      const validatedData = loginSchema.parse(value);

      mutation.mutate({
        data: {
          email: validatedData.email,
          password: validatedData.password,
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

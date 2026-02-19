"use client";

import { useForm } from "@tanstack/react-form";
import { useCreateCollection } from "@/modules/Collections/api/useCreateCollection";
import {
  type CreateCollectionInput,
  createCollectionSchema,
} from "@/modules/Collections/application/collection.schema";
import type { ApiError } from "@/shared/core/network/api-error";

type UseCreateCollectionFormOptions = {
  onSuccess?: () => void;
  onError?: (error: ApiError) => void;
};

export function useCreateCollectionForm(options: UseCreateCollectionFormOptions = {}) {
  const mutation = useCreateCollection({
    onSuccess: options.onSuccess,
    onError: options.onError,
  });

  const form = useForm({
    defaultValues: {
      name: "",
      emoji: "",
      description: null as string | null,
    } satisfies CreateCollectionInput,
    validators: {
      onChange: createCollectionSchema,
    },
    onSubmit: ({ value }) => {
      mutation.mutate(value);
    },
  });

  return {
    form,
    isSubmitting: mutation.isPending,
    error: mutation.error,
  };
}

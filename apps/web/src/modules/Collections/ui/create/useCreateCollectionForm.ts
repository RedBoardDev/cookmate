"use client";

import { useForm } from "@tanstack/react-form";
import type { ResponseErrorConfig } from "@/shared/lib/httpClient";
import { useCreateCollection } from "@/modules/Collections/api/useCreateCollection";
import {
  createCollectionSchema,
  createCollectionDefaultValues,
} from "@/modules/Collections/application/collection.schema";

type UseCreateCollectionFormOptions = {
  onSuccess?: () => void;
  onError?: (error: ResponseErrorConfig<any>) => void;
};

export function useCreateCollectionForm(
  options: UseCreateCollectionFormOptions = {}
) {
  const mutation = useCreateCollection({
    onSuccess: options.onSuccess,
    onError: options.onError,
  });

  const form = useForm({
    defaultValues: createCollectionDefaultValues,
    validators: {
      onChange: createCollectionSchema,
    },
    onSubmit: ({ value }) => {
      const validatedData = createCollectionSchema.parse(value);

      mutation.mutate(validatedData);
    },
  });

  return {
    form,
    isSubmitting: mutation.isPending,
    error: mutation.error
  };
}

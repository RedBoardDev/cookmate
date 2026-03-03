"use client";

import { useState } from "react";
import { useUpdateRecipe } from "@/modules/RecipeEditor/api/useUpdateRecipe";
import { toUpdateRecipePayload } from "@/modules/RecipeEditor/application/recipeEditor.payload";
import {
  RecipeEditorValidationError,
  recipeEditorFormSchema,
  type RecipeEditorFormValues,
} from "@/modules/RecipeEditor/application/recipeEditor.schema";
import {
  getSubmissionDebugContext,
  isApiError,
  toFormValidationApiError,
} from "@/modules/RecipeEditor/ui/shared/hooks/recipeEditorSubmission.utils";
import { useRecipeEditorBaseForm } from "@/modules/RecipeEditor/ui/shared/hooks/useRecipeEditorBaseForm";
import type { ApiError } from "@/shared/core/network/api-error";

type UseEditRecipeEditorFormOptions = {
  recipeId: string;
  initialValues: RecipeEditorFormValues;
  onSuccess?: (recipeId: string) => void;
  onError?: (error: ApiError) => void;
};

export function useEditRecipeEditorForm({
  recipeId,
  initialValues,
  onSuccess,
  onError,
}: UseEditRecipeEditorFormOptions) {
  const updateMutation = useUpdateRecipe();
  const [submitError, setSubmitError] = useState<ApiError | null>(null);

  const { form } = useRecipeEditorBaseForm({
    initialValues,
    onSubmit: async (value) => {
      setSubmitError(null);

      const validation = recipeEditorFormSchema.safeParse(value);

      if (!validation.success) {
        console.error("[RecipeEditor] Recipe form validation failed before update.", {
          issues: validation.error.issues,
          ...getSubmissionDebugContext(value, []),
          mode: "edit",
        });
        const validationError = toFormValidationApiError("Please review the required recipe fields.");
        setSubmitError(validationError);
        onError?.(validationError);
        return;
      }

      try {
        const response = await updateMutation.mutateAsync({
          recipeId,
          data: toUpdateRecipePayload(validation.data),
        });
        onSuccess?.(response.data.id);
      } catch (error) {
        if (error instanceof RecipeEditorValidationError) {
          console.error("[RecipeEditor] Failed to build update recipe payload.", {
            error,
            recipeId,
            ...getSubmissionDebugContext(validation.data, []),
          });
          const validationError = toFormValidationApiError(error.message);
          setSubmitError(validationError);
          onError?.(validationError);
          return;
        }

        console.error("[RecipeEditor] Recipe update request failed.", {
          error,
          recipeId,
          ...getSubmissionDebugContext(validation.data, []),
        });
        const apiError = isApiError(error) ? error : toFormValidationApiError("Recipe update failed before request.");
        setSubmitError(apiError);
        onError?.(apiError);
      }
    },
  });

  return {
    form,
    isSubmitting: updateMutation.isPending,
    error: submitError ?? updateMutation.error,
  } as const;
}

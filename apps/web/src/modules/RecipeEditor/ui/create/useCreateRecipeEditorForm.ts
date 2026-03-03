"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useCreateRecipe } from "@/modules/RecipeEditor/api/useCreateRecipe";
import {
  type RecipeEditorCreateContext,
  toCreateRecipePayload,
} from "@/modules/RecipeEditor/application/recipeEditor.payload";
import {
  RecipeEditorValidationError,
  recipeEditorFormSchema,
  type RecipeEditorImageInput,
  type RecipeEditorFormValues,
} from "@/modules/RecipeEditor/application/recipeEditor.schema";
import { uploadRecipeImages } from "@/modules/RecipeEditor/application/uploadRecipeImages";
import type { ApiError } from "@/shared/core/network/api-error";
import {
  getSubmissionDebugContext,
  isApiError,
  toFormValidationApiError,
  toImageInputs,
  toUploadApiError,
} from "@/modules/RecipeEditor/ui/shared/hooks/recipeEditorSubmission.utils";
import { useRecipeEditorBaseForm } from "@/modules/RecipeEditor/ui/shared/hooks/useRecipeEditorBaseForm";

type UseCreateRecipeEditorFormOptions = {
  initialValues?: Partial<RecipeEditorFormValues>;
  sourceContext?: RecipeEditorCreateContext;
  onSuccess?: (recipeId: string) => void;
  onError?: (error: ApiError) => void;
  onUploadFailed?: (recipeId: string, error: ApiError) => void;
};

const defaultSourceContext = {
  source: "MANUAL",
  sourceUrl: null,
} satisfies RecipeEditorCreateContext;

export function useCreateRecipeEditorForm({
  initialValues,
  sourceContext,
  onSuccess,
  onError,
  onUploadFailed,
}: UseCreateRecipeEditorFormOptions = {}) {
  const createMutation = useCreateRecipe();
  const [photos, setPhotos] = useState<File[]>([]);
  const [submitError, setSubmitError] = useState<ApiError | null>(null);
  const [isUploadingImages, setIsUploadingImages] = useState(false);
  const resolvedSourceContext = sourceContext ?? defaultSourceContext;
  const initialValuesKey = useMemo(() => JSON.stringify(initialValues ?? null), [initialValues]);
  const hydratedValuesKeyRef = useRef(initialValuesKey);

  const { form } = useRecipeEditorBaseForm({
    initialValues,
    onSubmit: async (value) => {
      setSubmitError(null);

      let imageInputs: RecipeEditorImageInput[];
      try {
        imageInputs = toImageInputs(photos);
      } catch (error) {
        console.error("[RecipeEditor] Failed to prepare image inputs before save.", {
          error,
          photosCount: photos.length,
          mode: "create",
        });
        const uploadError = toUploadApiError(error);
        setSubmitError(uploadError);
        onError?.(uploadError);
        return;
      }

      const validation = recipeEditorFormSchema.safeParse(value);

      if (!validation.success) {
        console.error("[RecipeEditor] Recipe form validation failed before save.", {
          issues: validation.error.issues,
          ...getSubmissionDebugContext(value, photos),
          mode: "create",
        });
        const validationError = toFormValidationApiError("Please review the required recipe fields.");
        setSubmitError(validationError);
        onError?.(validationError);
        return;
      }

      let response: Awaited<ReturnType<typeof createMutation.mutateAsync>>;
      try {
        response = await createMutation.mutateAsync(
          toCreateRecipePayload(validation.data, imageInputs, resolvedSourceContext),
        );
      } catch (error) {
        if (error instanceof RecipeEditorValidationError) {
          console.error("[RecipeEditor] Failed to build create recipe payload.", {
            error,
            ...getSubmissionDebugContext(validation.data, photos),
          });
          const validationError = toFormValidationApiError(error.message);
          setSubmitError(validationError);
          onError?.(validationError);
          return;
        }

        console.error("[RecipeEditor] Recipe save request failed.", {
          error,
          ...getSubmissionDebugContext(validation.data, photos),
        });
        const apiError = isApiError(error) ? error : toFormValidationApiError("Recipe save failed before request.");
        setSubmitError(apiError);
        onError?.(apiError);
        return;
      }

      if (photos.length === 0) {
        onSuccess?.(response.data.id);
        return;
      }

      setIsUploadingImages(true);
      try {
        await uploadRecipeImages({
          files: photos,
          uploadTargets: response.data.images,
        });
        onSuccess?.(response.data.id);
      } catch (error) {
        console.error("[RecipeEditor] Recipe created but image upload failed.", {
          error,
          recipeId: response.data.id,
          photosCount: photos.length,
        });
        const uploadError = toUploadApiError(error);
        if (onUploadFailed) {
          onUploadFailed(response.data.id, uploadError);
          return;
        }

        setSubmitError(uploadError);
        onError?.(uploadError);
      } finally {
        setIsUploadingImages(false);
      }
    },
  });

  useEffect(() => {
    if (hydratedValuesKeyRef.current === initialValuesKey) {
      return;
    }

    hydratedValuesKeyRef.current = initialValuesKey;
    setPhotos([]);
    setSubmitError(null);
  }, [initialValuesKey]);

  return {
    form,
    photos,
    setPhotos,
    isSubmitting: createMutation.isPending || isUploadingImages,
    error: submitError ?? createMutation.error,
  } as const;
}

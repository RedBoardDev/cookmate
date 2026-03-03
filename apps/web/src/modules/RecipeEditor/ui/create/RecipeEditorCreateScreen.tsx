"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react/macro";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { RecipeEditorCreateContext } from "@/modules/RecipeEditor/application/recipeEditor.payload";
import type { RecipeEditorFormValues } from "@/modules/RecipeEditor/application/recipeEditor.schema";
import { getUserFacingErrorMessage } from "@/shared/core/network/api-error";
import { getRecipeDetailPath } from "@/shared/core/utils/recipePaths";
import { RecipeEditorFormView } from "../shared/RecipeEditorFormView";
import type { RecipeEditorImportState } from "../shared/recipeEditor.types";
import { useCreateRecipeEditorForm } from "./useCreateRecipeEditorForm";

interface RecipeEditorCreateScreenProps {
  prefillValues?: Partial<RecipeEditorFormValues>;
  sourceContext?: RecipeEditorCreateContext;
  importState?: RecipeEditorImportState | null;
}

export function RecipeEditorCreateScreen({ prefillValues, sourceContext, importState }: RecipeEditorCreateScreenProps) {
  const router = useRouter();
  const { t } = useLingui();

  const { form, photos, setPhotos, isSubmitting, error } = useCreateRecipeEditorForm({
    initialValues: prefillValues,
    sourceContext,
    onSuccess: (recipeId) => {
      toast.success(t(msg`Recipe created`));
      router.push(getRecipeDetailPath(recipeId));
    },
    onError: (apiError) => {
      toast.error(getUserFacingErrorMessage(t, apiError));
    },
    onUploadFailed: (recipeId) => {
      toast.error(t(msg`Recipe created, but image upload failed. You can retry from the recipe page.`));
      router.push(getRecipeDetailPath(recipeId));
    },
  });

  return (
    <RecipeEditorFormView
      mode="create"
      form={form}
      photoState={{
        photos,
        onPhotosChange: setPhotos,
      }}
      isSubmitting={isSubmitting}
      error={error}
      importState={importState}
    />
  );
}

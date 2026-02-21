"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react/macro";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { EditorImportProvider, useEditorImport } from "@/modules/NewRecipes/ui/Editor/context/EditorImportContext";
import { useCreateRecipeForm } from "@/modules/NewRecipes/ui/Editor/hooks/useCreateRecipeForm";
import { RecipeEditorFormView } from "@/modules/NewRecipes/ui/Editor/RecipeEditorFormView";
import { getUserFacingErrorMessage } from "@/shared/core/network/api-error";

function RecipeEditorScreen() {
  const router = useRouter();
  const { t } = useLingui();
  const { isImporting, parsedRecipe } = useEditorImport();

  const { form, isSubmitting, error } = useCreateRecipeForm({
    parsedRecipe,
    onSuccess: (recipeId) => {
      toast.success(t(msg`Recipe created`));
      router.push(`/recipes/${recipeId}`);
    },
    onError: (apiError) => {
      toast.error(getUserFacingErrorMessage(t, apiError));
    },
  });

  return <RecipeEditorFormView form={form} isImporting={isImporting} isSubmitting={isSubmitting} error={error} />;
}

export function RecipeEditorView() {
  return (
    <EditorImportProvider>
      <RecipeEditorScreen />
    </EditorImportProvider>
  );
}

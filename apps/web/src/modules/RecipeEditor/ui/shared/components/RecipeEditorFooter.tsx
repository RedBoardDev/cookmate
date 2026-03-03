"use client";

import { useLingui } from "@lingui/react/macro";
import type { ApiError } from "@/shared/core/network/api-error";
import { ErrorMessage } from "@/shared/ui/form/ErrorMessage";
import { Button } from "@/shared/ui/primitives/button";
import { Form } from "@/shared/ui/primitives/form";
import type { RecipeEditorMode } from "../recipeEditor.types";
import type { RecipeEditorFormApi } from "../hooks/useRecipeEditorBaseForm";

interface RecipeEditorFooterProps {
  mode: RecipeEditorMode;
  form: RecipeEditorFormApi;
  disabled?: boolean;
  isSubmitting?: boolean;
  error: ApiError | null;
}

export function RecipeEditorFooter({ mode, form, disabled, isSubmitting = false, error }: RecipeEditorFooterProps) {
  const { t } = useLingui();

  return (
    <Form form={form} className="space-y-2 pt-1">
      <ErrorMessage error={error} />
      <Button type="submit" className="h-10 w-full text-sm" disabled={disabled}>
        {isSubmitting ? t`Saving…` : mode === "edit" ? t`Save changes` : t`Save recipe`}
      </Button>
      <p className="text-center text-xs text-muted-foreground">
        {disabled
          ? t`You'll be able to save once the import is complete.`
          : mode === "edit"
            ? t`Your changes will update this recipe.`
            : t`You can always edit this recipe later.`}
      </p>
    </Form>
  );
}

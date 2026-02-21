"use client";

import { useLingui } from "@lingui/react/macro";
import type { useCreateRecipeForm } from "@/modules/NewRecipes/ui/Editor/hooks/useCreateRecipeForm";
import { ErrorMessage } from "@/shared/ui/form/ErrorMessage";
import { Button } from "@/shared/ui/primitives/button";
import { Form } from "@/shared/ui/primitives/form";

interface RecipeEditorFooterProps {
  form: ReturnType<typeof useCreateRecipeForm>["form"];
  disabled?: boolean;
  isSubmitting?: boolean;
  error: ReturnType<typeof useCreateRecipeForm>["error"];
}

export function RecipeEditorFooter({ form, disabled, isSubmitting = false, error }: RecipeEditorFooterProps) {
  const { t } = useLingui();

  return (
    <Form form={form} className="space-y-2 pt-1">
      <ErrorMessage error={error} />
      <Button type="submit" className="h-10 w-full text-sm" disabled={disabled}>
        {isSubmitting ? t`Saving…` : t`Save recipe`}
      </Button>
      <p className="text-center text-xs text-muted-foreground">
        {disabled ? t`You'll be able to save once the import is complete.` : t`You can always edit this recipe later.`}
      </p>
    </Form>
  );
}

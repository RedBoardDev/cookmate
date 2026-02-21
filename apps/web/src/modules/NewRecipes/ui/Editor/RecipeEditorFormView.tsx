"use client";

import type { useCreateRecipeForm } from "@/modules/NewRecipes/ui/Editor/hooks/useCreateRecipeForm";
import { EditorImportBanner } from "./components/EditorImportBanner";
import { RecipeEditorFooter } from "./components/RecipeEditorFooter";
import { RecipeEditorHeader } from "./components/RecipeEditorHeader";
import { RecipeIngredientsSection } from "./sections/RecipeIngredientsSection";
import { RecipeInstructionsSection } from "./sections/RecipeInstructionsSection";
import { RecipeMetaSection } from "./sections/RecipeMetaSection";
import { RecipePhotoSection } from "./sections/RecipePhotoSection";
import { RecipeTagsSection } from "./sections/RecipeTagsSection";

interface RecipeEditorFormViewProps {
  form: ReturnType<typeof useCreateRecipeForm>["form"];
  isImporting: boolean;
  isSubmitting: boolean;
  error: ReturnType<typeof useCreateRecipeForm>["error"];
}

export function RecipeEditorFormView({ form, isImporting, isSubmitting, error }: RecipeEditorFormViewProps) {
  const disabled = isImporting || isSubmitting;

  return (
    <section className="mx-auto w-full max-w-2xl space-y-4 px-4 pb-12 pt-6 md:pb-16">
      <EditorImportBanner />
      <RecipeEditorHeader disabled={disabled} />
      <RecipeMetaSection form={form} disabled={disabled} />
      <RecipePhotoSection disabled={disabled} />
      <RecipeTagsSection form={form} disabled={disabled} />
      <RecipeIngredientsSection form={form} disabled={disabled} />
      <RecipeInstructionsSection form={form} disabled={disabled} />
      <RecipeEditorFooter form={form} disabled={disabled} isSubmitting={isSubmitting} error={error} />
    </section>
  );
}

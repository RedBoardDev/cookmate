import type { ApiError } from "@/shared/core/network/api-error";
import { RecipeEditorFooter } from "./components/RecipeEditorFooter";
import { RecipeEditorHeader } from "./components/RecipeEditorHeader";
import { RecipeEditorImportBanner } from "./components/RecipeEditorImportBanner";
import type { RecipeEditorFormApi } from "./hooks/useRecipeEditorBaseForm";
import type { RecipeEditorImportState, RecipeEditorMode } from "./recipeEditor.types";
import { RecipeIngredientsSection } from "./sections/RecipeIngredientsSection";
import { RecipeInstructionsSection } from "./sections/RecipeInstructionsSection";
import { RecipeMetaSection } from "./sections/RecipeMetaSection";
import { RecipePhotoSection } from "./sections/RecipePhotoSection";
import { RecipeTagsSection } from "./sections/RecipeTagsSection";

interface RecipeEditorFormViewProps {
  mode: RecipeEditorMode;
  recipeId?: string;
  form: RecipeEditorFormApi;
  isSubmitting: boolean;
  error: ApiError | null;
  importState?: RecipeEditorImportState | null;
  photoState?: {
    photos: File[];
    onPhotosChange: (files: File[]) => void;
  };
}

export function RecipeEditorFormView({
  mode,
  recipeId,
  form,
  isSubmitting,
  error,
  importState,
  photoState,
}: RecipeEditorFormViewProps) {
  const disabled = Boolean(importState?.isImporting) || isSubmitting;

  return (
    <section className="mx-auto w-full max-w-2xl space-y-4 px-4 pb-12 pt-6 md:pb-16">
      <RecipeEditorImportBanner importState={importState} />
      <RecipeEditorHeader
        mode={mode}
        recipeId={recipeId}
        disabled={disabled}
        hasImportInProgress={Boolean(importState?.isImporting)}
      />
      <RecipeMetaSection form={form} disabled={disabled} />
      {photoState ? (
        <RecipePhotoSection photos={photoState.photos} onPhotosChange={photoState.onPhotosChange} disabled={disabled} />
      ) : null}
      <RecipeTagsSection form={form} disabled={disabled} />
      <RecipeIngredientsSection form={form} disabled={disabled} />
      <RecipeInstructionsSection form={form} disabled={disabled} />
      <RecipeEditorFooter form={form} mode={mode} disabled={disabled} isSubmitting={isSubmitting} error={error} />
    </section>
  );
}

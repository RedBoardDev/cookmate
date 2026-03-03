export type RecipeEditorMode = "create" | "edit";
export type RecipeEditorImportSource = "URL" | "TEXT" | "IMAGE" | "PDF";
export type RecipeEditorImportStep = "connecting" | "parsing" | "preparing";

export interface RecipeEditorImportState {
  isImporting: boolean;
  source: RecipeEditorImportSource | null;
  progress: number;
  remainingMs: number;
  currentStep: RecipeEditorImportStep;
  onCancel: () => void;
}

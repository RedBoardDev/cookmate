export type RecipeEditorMode = "create" | "edit";
export type RecipeEditorImportSource = "URL" | "TEXT" | "IMAGE" | "PDF";

export interface RecipeEditorImportState {
  isImporting: boolean;
  source: RecipeEditorImportSource | null;
  progress: number;
  onCancel: () => void;
}

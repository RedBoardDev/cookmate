export function getRecipeDetailPath(recipeId: string): string {
  return `/recipes/${recipeId}`;
}

export function getCreateRecipeEditorPath(): string {
  return "/recipes/editor";
}

interface ImportedRecipeEditorPathInput {
  jobId: string;
  source: string;
}

export function getImportedRecipeEditorPath({ jobId, source }: ImportedRecipeEditorPathInput): string {
  const params = new URLSearchParams();
  params.set("jobId", jobId);
  params.set("source", source);

  return `${getCreateRecipeEditorPath()}?${params.toString()}`;
}

export function getEditRecipePath(recipeId: string): string {
  return `/recipes/${recipeId}/edit`;
}

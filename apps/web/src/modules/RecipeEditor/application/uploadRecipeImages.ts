import type { PostRecipesMutationResponse } from "@/generated/types";

type RecipeImageUploadTarget = PostRecipesMutationResponse["data"]["images"][number];

interface UploadRecipeImagesInput {
  files: File[];
  uploadTargets: RecipeImageUploadTarget[];
}

export class RecipeImageUploadError extends Error {
  readonly status: number | null;

  constructor(message: string, status: number | null = null) {
    super(message);
    this.name = "RecipeImageUploadError";
    this.status = status;
  }
}

async function uploadSingleRecipeImage(file: File, uploadTarget: RecipeImageUploadTarget): Promise<void> {
  try {
    const response = await fetch(uploadTarget.uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": uploadTarget.mimeType,
      },
      body: file,
    });

    if (!response.ok) {
      throw new RecipeImageUploadError(
        `Failed to upload image "${file.name}" (status ${response.status}).`,
        response.status,
      );
    }
  } catch (error) {
    if (error instanceof RecipeImageUploadError) {
      throw error;
    }

    throw new RecipeImageUploadError(`Network error while uploading image "${file.name}".`);
  }
}

export async function uploadRecipeImages(input: UploadRecipeImagesInput): Promise<void> {
  const { files, uploadTargets } = input;

  if (files.length === 0) {
    return;
  }

  if (files.length !== uploadTargets.length) {
    throw new RecipeImageUploadError(
      `Image upload contract mismatch: expected ${files.length} upload targets, got ${uploadTargets.length}.`,
    );
  }

  for (const [index, file] of files.entries()) {
    await uploadSingleRecipeImage(file, uploadTargets[index]);
  }
}

import {
  MAX_RECIPE_IMAGES,
  RECIPE_IMAGE_MIME_TYPES,
  type RecipeEditorFormValues,
  type RecipeEditorImageInput,
} from "@/modules/RecipeEditor/application/recipeEditor.schema";
import { RecipeImageUploadError } from "@/modules/RecipeEditor/application/uploadRecipeImages";
import type { ApiError } from "@/shared/core/network/api-error";

const IMAGE_UPLOAD_ERROR_CODE = "RECIPE_IMAGE_UPLOAD_FAILED";
const IMAGE_UPLOAD_STATUS = 502;
const IMAGE_UPLOAD_STATUS_TEXT = "Image Upload Failed";
const FORM_VALIDATION_ERROR_CODE = "RECIPE_FORM_INVALID";
const FORM_VALIDATION_STATUS = 400;
const FORM_VALIDATION_STATUS_TEXT = "Validation Failed";

export function isApiError(error: unknown): error is ApiError {
  if (typeof error !== "object" || error === null) {
    return false;
  }

  if (!("error" in error) || !("status" in error) || !("statusText" in error)) {
    return false;
  }

  return (
    typeof (error as { status: unknown }).status === "number" &&
    typeof (error as { statusText: unknown }).statusText === "string"
  );
}

export function toUploadApiError(error: unknown): ApiError {
  const status = error instanceof RecipeImageUploadError && error.status !== null ? error.status : IMAGE_UPLOAD_STATUS;
  const message = error instanceof Error ? error.message : "Image upload failed.";

  return {
    error: {
      error: {
        code: IMAGE_UPLOAD_ERROR_CODE,
        args: {
          message,
        },
      },
    },
    status,
    statusText: IMAGE_UPLOAD_STATUS_TEXT,
  };
}

export function toFormValidationApiError(message: string): ApiError {
  return {
    error: {
      error: {
        code: FORM_VALIDATION_ERROR_CODE,
        args: {
          message,
        },
      },
    },
    status: FORM_VALIDATION_STATUS,
    statusText: FORM_VALIDATION_STATUS_TEXT,
  };
}

export function getSubmissionDebugContext(input: RecipeEditorFormValues, photos: File[]) {
  return {
    recipeName: input.name,
    difficulty: input.difficulty,
    budget: input.budget,
    categoriesCount: input.categories.length,
    attributesCount: input.attributes.length,
    ingredientsCount: input.ingredients.length,
    instructionsCount: input.instructions.length,
    photosCount: photos.length,
  };
}

export function isRecipeImageMimeType(value: string): value is RecipeEditorImageInput["mimeType"] {
  return RECIPE_IMAGE_MIME_TYPES.some((mimeType) => mimeType === value);
}

export function toImageInput(file: File): RecipeEditorImageInput {
  const mimeType = file.type.toLowerCase();
  if (!isRecipeImageMimeType(mimeType)) {
    throw new RecipeImageUploadError(`Unsupported image format for "${file.name}".`, 415);
  }

  return {
    name: file.name,
    mimeType,
    size: file.size,
  };
}

export function toImageInputs(files: File[]): RecipeEditorImageInput[] {
  if (files.length > MAX_RECIPE_IMAGES) {
    throw new RecipeImageUploadError(`A recipe can contain at most ${MAX_RECIPE_IMAGES} images.`);
  }

  return files.map((file) => toImageInput(file));
}

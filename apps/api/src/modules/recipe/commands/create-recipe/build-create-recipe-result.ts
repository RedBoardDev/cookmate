import { InvalidRecipeImageDataError } from "@cookmate/domain/recipe-image";
import { AllowedMimeTypes, type S3PutObjectOutput } from "@/shared/types/s3.types";
import type { CreateRecipeResult } from "./contract";
import type { CreatedRecipeRecord } from "./deps";

const allowedMimeTypes = new Set<string>(Object.values(AllowedMimeTypes));

function assertUploadTarget(
  uploadTarget: S3PutObjectOutput | undefined,
  message: string,
): asserts uploadTarget is S3PutObjectOutput {
  if (!uploadTarget) {
    throw new InvalidRecipeImageDataError(message);
  }
}

function assertAllowedMimeType(mimeType: string): AllowedMimeTypes {
  if (!allowedMimeTypes.has(mimeType)) {
    throw new InvalidRecipeImageDataError("Recipe image mime type is invalid.");
  }

  return mimeType as AllowedMimeTypes;
}

export function buildCreateRecipeResult(input: {
  createdRecipe: CreatedRecipeRecord;
  uploadTargets: S3PutObjectOutput[];
}): CreateRecipeResult {
  const uploadTargetsByStorageKey = new Map(
    input.uploadTargets.map((uploadTarget) => [uploadTarget.storageKey, uploadTarget]),
  );

  return {
    id: input.createdRecipe.id,
    shortUrl: input.createdRecipe.shortUrl,
    images: input.createdRecipe.images.map((image) => {
      const uploadTarget = uploadTargetsByStorageKey.get(image.storageKey);
      assertUploadTarget(uploadTarget, "Recipe image upload target is missing.");

      return {
        ...image,
        mimeType: assertAllowedMimeType(image.mimeType),
        uploadUrl: uploadTarget.uploadUrl,
        expiresIn: uploadTarget.expiresIn,
      };
    }),
  };
}

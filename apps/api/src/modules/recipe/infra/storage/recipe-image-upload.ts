import { getS3Service } from "@/infra/services/s3-service";
import type { S3PutObjectInput, S3PutObjectOutput } from "@/shared/types/s3.types";

export type RecipeImageUploadInput = S3PutObjectInput;

export async function generateRecipeImageUploadTargets(
  userId: string,
  recipeId: string,
  inputs: RecipeImageUploadInput[],
): Promise<S3PutObjectOutput[]> {
  return getS3Service().generatePutPreSignedUrls(userId, recipeId, inputs);
}

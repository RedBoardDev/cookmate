import { InvalidRecipeImageDataError } from "@cookmate/domain/recipe-image";
import { v7 as uuidv7 } from "uuid";
import { handleError } from "@/shared/utils/handle-error";
import { buildCreateRecipeRecordInput } from "./build-create-recipe-record-input";
import { buildCreateRecipeResult } from "./build-create-recipe-result";
import { type CreateRecipeCommand, type CreateRecipeResult, MAX_RECIPE_IMAGES } from "./contract";
import { defaultCreateRecipeDeps } from "./deps";
import { generateUniqueShortUrl } from "./generate-unique-short-url";

const deps = defaultCreateRecipeDeps;

function assertMaxRecipeImages(imagesCount: number): void {
  if (imagesCount > MAX_RECIPE_IMAGES) {
    throw new InvalidRecipeImageDataError(`A recipe can include up to ${MAX_RECIPE_IMAGES} images.`);
  }
}

export const executeCreateRecipe = handleError(async (input: CreateRecipeCommand): Promise<CreateRecipeResult> => {
  const now = new Date();
  const recipeId = uuidv7();
  const images = input.images ?? [];

  assertMaxRecipeImages(images.length);

  const shortUrl = await generateUniqueShortUrl(deps.existsByShortUrl);
  const uploadTargets = await deps.generateUploadTargets({
    userId: input.userId,
    recipeId,
    files: images,
  });

  const createdRecipe = await deps.createRecipe(
    buildCreateRecipeRecordInput({
      command: input,
      recipeId,
      shortUrl,
      uploadTargets,
      now,
    }),
  );

  return buildCreateRecipeResult({
    createdRecipe,
    uploadTargets,
  });
});

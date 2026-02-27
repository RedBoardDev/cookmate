import type { GetRecipesRecipeidImages200 } from "@/generated/types";
import { RecipeImages } from "@/modules/RecipeDetail/domain/vo/recipeImages.vo";

type RecipeImageData = GetRecipesRecipeidImages200["data"][number];
type RecipeImagesData = GetRecipesRecipeidImages200["data"];

function readImageUrl(image: RecipeImageData): string | null {
  const candidate = (image as { url?: unknown }).url;
  if (typeof candidate !== "string") {
    return null;
  }

  const normalized = candidate.trim();
  return normalized.length > 0 ? normalized : null;
}

export const RecipeDetailImagesMapper = {
  toDomain(images: RecipeImagesData | null | undefined): RecipeImages {
    const items =
      images
        ?.slice()
        .sort((a, b) => a.order - b.order)
        .map((image) => ({
          src: readImageUrl(image),
          alt: image.name,
        })) ?? [];

    return RecipeImages.create(items);
  },
};

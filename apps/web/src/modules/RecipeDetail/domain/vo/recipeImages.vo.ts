import { ValueObject } from "@cookmate/core";
import type { RecipeImage as DomainRecipeImage } from "@cookmate/domain/recipe-image";

export type RecipeImageItem = {
  src: DomainRecipeImage["s3Url"] | null;
  alt: DomainRecipeImage["name"];
};

interface RecipeImagesProps {
  items: readonly RecipeImageItem[];
}

function normalizeItems(items: readonly RecipeImageItem[]) {
  return items.map((item) => ({
    src: item.src?.trim() ? item.src.trim() : null,
    alt: item.alt.trim(),
  }));
}

function isValidImage(item: RecipeImageItem) {
  if (!item.alt.trim()) return false;
  if (item.src === undefined || item.src === null) return true;
  return item.src.trim().length > 0;
}

function isValidCollection(items: readonly RecipeImageItem[]) {
  return items.every(isValidImage);
}

export class RecipeImages extends ValueObject<RecipeImagesProps> {
  private constructor(props: RecipeImagesProps) {
    super(props);
  }

  public static create(items: readonly RecipeImageItem[]): RecipeImages {
    const normalized = normalizeItems(items);
    if (!isValidCollection(normalized)) {
      throw new Error("RecipeImages must include valid image entries.");
    }

    return new RecipeImages({ items: normalized });
  }

  public static fromValue(items?: readonly RecipeImageItem[] | null): RecipeImages | null {
    if (!items) return null;
    const normalized = normalizeItems(items);
    if (!isValidCollection(normalized)) return null;

    return new RecipeImages({ items: normalized });
  }

  get items(): readonly RecipeImageItem[] {
    return this.props.items;
  }

  /** Whether the collection contains at least one image with a valid src. */
  get hasImages(): boolean {
    return this.props.items.some((item) => item.src !== null);
  }

  /** The first image with a valid src, or null. */
  get primaryImage(): RecipeImageItem | null {
    return this.props.items.find((item) => item.src !== null) ?? null;
  }

  /** Images with a valid src. */
  get availableImages(): readonly RecipeImageItem[] {
    return this.props.items.filter((item) => item.src !== null && item.src.trim().length > 0);
  }

  /** Whether there are multiple images with valid src. */
  get hasMultipleImages(): boolean {
    return this.availableImages.length > 1;
  }

  /** Number of images in the collection. */
  get count(): number {
    return this.props.items.length;
  }
}

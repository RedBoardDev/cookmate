"use client";

import { useLingui } from "@lingui/react/macro";
import { MAX_RECIPE_IMAGES, RECIPE_IMAGE_ACCEPT } from "@/modules/RecipeEditor/application/recipeEditor.schema";
import { EditorSectionCard } from "../components/EditorSectionCard";
import { ImageUpload } from "@/shared/ui/primitives/image-upload";

interface RecipePhotoSectionProps {
  photos: File[];
  onPhotosChange: (photos: File[]) => void;
  disabled?: boolean;
}

export function RecipePhotoSection({ photos, onPhotosChange, disabled }: RecipePhotoSectionProps) {
  const { t } = useLingui();

  return (
    <EditorSectionCard
      title={t`Cover photo`}
      description={t`Add up to 5 photos. Click or drag and drop. Formats: JPG, PNG, WEBP, AVIF.`}
      disabled={disabled}
    >
      <ImageUpload
        maxCount={MAX_RECIPE_IMAGES}
        value={photos}
        onChange={onPhotosChange}
        listType="grid"
        size="md"
        accept={RECIPE_IMAGE_ACCEPT}
        disabled={disabled}
        ariaLabelAdd={t`Add a photo`}
        ariaLabelRemove={t`Remove photo`}
      />
    </EditorSectionCard>
  );
}

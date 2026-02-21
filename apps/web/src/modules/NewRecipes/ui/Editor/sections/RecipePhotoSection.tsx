"use client";

import { useLingui } from "@lingui/react/macro";
import { useState } from "react";
import { EditorSectionCard } from "@/modules/NewRecipes/ui/Editor/components/EditorSectionCard";
import { ImageUpload } from "@/shared/ui/primitives/image-upload";

const MAX_PHOTOS = 5;

interface RecipePhotoSectionProps {
  disabled?: boolean;
}

export function RecipePhotoSection({ disabled }: RecipePhotoSectionProps) {
  const { t } = useLingui();
  const [photos, setPhotos] = useState<File[]>([]);

  return (
    <EditorSectionCard
      title={t`Cover photo`}
      description={t`Add up to 5 photos. Click or drag and drop.`}
      disabled={disabled}
    >
      <ImageUpload
        maxCount={MAX_PHOTOS}
        value={photos}
        onChange={setPhotos}
        listType="grid"
        size="md"
        disabled={disabled}
        ariaLabelAdd={t`Add a photo`}
        ariaLabelRemove={t`Remove photo`}
      />
    </EditorSectionCard>
  );
}

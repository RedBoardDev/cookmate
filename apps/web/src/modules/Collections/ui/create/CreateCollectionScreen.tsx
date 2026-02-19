"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react/macro";
import { toast } from "sonner";
import { CreateCollectionView } from "@/modules/Collections/ui/create/CreateCollectionView";
import { useCreateCollectionForm } from "@/modules/Collections/ui/hooks/useCreateCollectionForm";
import { getUserFacingErrorMessage } from "@/shared/core/network/api-error";

interface CreateCollectionScreenProps {
  onBack: () => void;
}

export function CreateCollectionScreen({ onBack }: CreateCollectionScreenProps) {
  const { t } = useLingui();
  const { form, isSubmitting, error } = useCreateCollectionForm({
    onSuccess: () => {
      toast.success(t(msg`Collection created`));
      onBack();
    },
    onError: (err) => {
      toast.error(getUserFacingErrorMessage(t, err));
    },
  });

  return <CreateCollectionView form={form} isSubmitting={isSubmitting} error={error} onBack={onBack} />;
}

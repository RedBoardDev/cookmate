"use client";

import { useLingui } from "@lingui/react/macro";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useRecipeEditorRecipe } from "@/modules/RecipeEditor/api/useRecipeEditorRecipe";
import { RecipeEditorMapper } from "@/modules/RecipeEditor/application/recipeEditor.mapper";
import type { RecipeEditorFormValues } from "@/modules/RecipeEditor/application/recipeEditor.schema";
import { RecipeEditorFormView } from "../shared/RecipeEditorFormView";
import { useEditRecipeEditorForm } from "./useEditRecipeEditorForm";
import { getRecipeDetailPath } from "@/shared/core/utils/recipePaths";
import { getUserFacingErrorMessage } from "@/shared/core/network/api-error";
import { Button } from "@/shared/ui/primitives/button";
import { Card } from "@/shared/ui/primitives/card";
import { Skeleton } from "@/shared/ui/primitives/skeleton";

interface RecipeEditorEditScreenProps {
  recipeId: string;
}

function RecipeEditorEditLoadingState() {
  return (
    <section className="mx-auto w-full max-w-2xl space-y-4 px-4 pb-12 pt-6 md:pb-16">
      <Card variant="soft" border="soft" shadow="elevated" radius="2xl" className="space-y-4 p-6">
        <Skeleton className="h-6 w-28" />
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-72" />
        <Skeleton className="h-24 w-full" />
      </Card>
    </section>
  );
}

function RecipeEditorEditErrorState({ onRetry }: { onRetry: () => void }) {
  const { t } = useLingui();

  return (
    <section className="mx-auto w-full max-w-2xl px-4 pb-12 pt-6 md:pb-16">
      <Card variant="soft" border="soft" shadow="elevated" radius="2xl" className="space-y-3 p-6">
        <h1 className="text-lg font-semibold text-foreground">{t`Unable to load recipe`}</h1>
        <p className="text-sm text-muted-foreground">{t`Please try again to edit this recipe.`}</p>
        <Button type="button" onClick={onRetry} className="w-fit">
          {t`Retry`}
        </Button>
      </Card>
    </section>
  );
}

interface RecipeEditorEditLoadedScreenProps {
  recipeId: string;
  initialValues: RecipeEditorFormValues;
}

function RecipeEditorEditLoadedScreen({ recipeId, initialValues }: RecipeEditorEditLoadedScreenProps) {
  const router = useRouter();
  const { t } = useLingui();
  const { form, isSubmitting, error } = useEditRecipeEditorForm({
    recipeId,
    initialValues,
    onSuccess: (updatedRecipeId) => {
      toast.success(t`Recipe updated`);
      router.push(getRecipeDetailPath(updatedRecipeId));
    },
    onError: (apiError) => {
      toast.error(getUserFacingErrorMessage(t, apiError));
    },
  });

  return <RecipeEditorFormView mode="edit" recipeId={recipeId} form={form} isSubmitting={isSubmitting} error={error} />;
}

export function RecipeEditorEditScreen({ recipeId }: RecipeEditorEditScreenProps) {
  const { recipe, error: loadError, isLoading, refetch } = useRecipeEditorRecipe(recipeId);
  const initialValues = RecipeEditorMapper.toFormValues(recipe);

  if (loadError) {
    return <RecipeEditorEditErrorState onRetry={() => void refetch()} />;
  }

  if (isLoading) {
    return <RecipeEditorEditLoadingState />;
  }

  if (!initialValues) {
    return <RecipeEditorEditErrorState onRetry={() => void refetch()} />;
  }

  return <RecipeEditorEditLoadedScreen recipeId={recipeId} initialValues={initialValues} />;
}

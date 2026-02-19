"use client";

import { Trans, useLingui } from "@lingui/react/macro";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import type { RecipeIngredient } from "@/modules/RecipeDetail/domain/vo/recipeIngredient.vo";
import { cn } from "@/shared/core/utils/cn";
import { Button } from "@/shared/ui/primitives/button";
import { Card } from "@/shared/ui/primitives/card";

interface IngredientsCardProps {
  ingredients?: readonly RecipeIngredient[];
  servings?: number;
  onDecrease?: () => void;
  onIncrease?: () => void;
  isLoading?: boolean;
}

function toDisplayAmount(amount: string | null, toTasteLabel: string): string {
  if (!amount) {
    return toTasteLabel;
  }

  return amount;
}

export function IngredientsCard({
  ingredients,
  servings,
  onDecrease,
  onIncrease,
  isLoading = false,
}: IngredientsCardProps) {
  const { t } = useLingui();
  const skeletonRows = [0.9, 0.75, 0.85, 0.7, 0.8, 0.65];
  const safeIngredients = ingredients ?? [];
  const hasIngredients = safeIngredients.length > 0;

  return (
    <Card variant="soft" border="soft" shadow="flat" radius="3xl" className="p-5">
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold">
              <Trans>Ingredients</Trans>
            </h2>
            <p className="text-xs text-muted-foreground">
              <Trans>Servings</Trans>
            </p>
          </div>

          <div
            className={cn(
              "flex items-center gap-2 rounded-full border border-border/60",
              "bg-muted/60 px-2 py-1 shadow-sm",
            )}
          >
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="h-7 w-7 rounded-full bg-background/70"
              onClick={isLoading ? undefined : onDecrease}
              disabled={isLoading}
              aria-label={t`Decrease servings`}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <div className="min-w-6 text-center text-sm font-semibold">
              {isLoading ? <Skeleton width={20} /> : servings}
            </div>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="h-7 w-7 rounded-full bg-background/70"
              onClick={isLoading ? undefined : onIncrease}
              disabled={isLoading}
              aria-label={t`Increase servings`}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {isLoading ? (
          <ul className="space-y-3 text-sm">
            {skeletonRows.map((width, index) => (
              <li key={`ingredient-skeleton-${index}`} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Skeleton circle width={10} height={10} />
                  <Skeleton width={`${width * 100}%`} />
                </div>
                <Skeleton width={48} />
              </li>
            ))}
          </ul>
        ) : !hasIngredients ? (
          <p className="text-sm text-muted-foreground">
            <Trans>No ingredients listed for this recipe yet.</Trans>
          </p>
        ) : (
          <ul className="space-y-3 text-sm">
            {safeIngredients.map((ingredient, index) => (
              <li
                key={`${ingredient.name}-${ingredient.amount ?? "to-taste"}-${index}`}
                className="flex items-start justify-between gap-3"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full border border-border/70 bg-accent/20" />
                  <div className="flex flex-col">
                    <span className="text-foreground">{ingredient.name}</span>
                    {ingredient.note ? <span className="text-xs text-muted-foreground">{ingredient.note}</span> : null}
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{toDisplayAmount(ingredient.amount, t`to taste`)}</span>
              </li>
            ))}
          </ul>
        )}

        <Button
          type="button"
          variant="outline"
          className="rounded-full shadow-sm transition-shadow hover:shadow-md"
          disabled={isLoading}
        >
          <ShoppingCart className="h-4 w-4" />
          <Trans>Add all to groceries</Trans>
        </Button>
      </div>
    </Card>
  );
}

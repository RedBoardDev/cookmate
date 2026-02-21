"use client";

import { Trans, useLingui } from "@lingui/react/macro";
import { Circle, CircleCheck, Minus, Plus } from "lucide-react";
import { EditorFieldError } from "@/modules/NewRecipes/ui/Editor/components/EditorFieldError";
import { EditorSectionCard } from "@/modules/NewRecipes/ui/Editor/components/EditorSectionCard";
import type { useCreateRecipeForm } from "@/modules/NewRecipes/ui/Editor/hooks/useCreateRecipeForm";
import { cn } from "@/shared/core/utils/cn";
import { Button } from "@/shared/ui/primitives/button";
import { Input } from "@/shared/ui/primitives/input";

interface RecipeIngredientsSectionProps {
  form: ReturnType<typeof useCreateRecipeForm>["form"];
  disabled?: boolean;
}

export function RecipeIngredientsSection({ form, disabled }: RecipeIngredientsSectionProps) {
  const { t } = useLingui();

  return (
    <form.Field name="ingredients">
      {(field) => (
        <EditorSectionCard
          title={
            <span className="inline-flex items-center gap-1.5">
              <span>{t`Ingredients`}</span>
              <EditorFieldError field={field} message={t`Add at least one ingredient`} />
            </span>
          }
          description={t`List everything needed for the recipe.`}
          disabled={disabled}
        >
          <>
            <div className="overflow-hidden rounded-lg border border-border/60 bg-card/60">
              <div className="hidden grid-cols-[72px_120px_1fr_auto_auto] bg-muted/40 px-2.5 py-1 text-[11px] text-muted-foreground sm:grid">
                <span>{t`Qty`}</span>
                <span>{t`Unit`}</span>
                <span>{t`Ingredient`}</span>
                <span>{t`Req.`}</span>
                <span />
              </div>
              {field.state.value.map((ingredient, index) => (
                <div
                  key={`ingredient-${ingredient.order}`}
                  className="grid gap-2 border-b border-border/50 p-2.5 last:border-b-0 sm:grid-cols-[72px_120px_1fr_auto_auto] sm:items-center"
                >
                  <Input
                    name={`ingredient-quantity-${index + 1}`}
                    autoComplete="off"
                    type="number"
                    inputMode="decimal"
                    min={0}
                    step="0.1"
                    value={ingredient.quantity ?? ""}
                    aria-label={t`Ingredient quantity ${index + 1}`}
                    placeholder={t`Qty`}
                    onChange={(event) =>
                      field.handleChange(
                        field.state.value.map((item, currentIndex) => {
                          if (currentIndex !== index) {
                            return item;
                          }
                          const raw = event.target.value.trim();
                          return {
                            ...item,
                            quantity: raw.length > 0 ? Math.max(Number(raw) || 0, 0) : null,
                          };
                        }),
                      )
                    }
                    onBlur={field.handleBlur}
                    disabled={disabled}
                  />
                  <Input
                    name={`ingredient-unit-${index + 1}`}
                    autoComplete="off"
                    value={ingredient.unit ?? ""}
                    aria-label={t`Ingredient unit ${index + 1}`}
                    placeholder={t`Unit`}
                    onChange={(event) =>
                      field.handleChange(
                        field.state.value.map((item, currentIndex) =>
                          currentIndex === index
                            ? { ...item, unit: event.target.value.trim().length > 0 ? event.target.value : null }
                            : item,
                        ),
                      )
                    }
                    onBlur={field.handleBlur}
                    disabled={disabled}
                  />
                  <Input
                    name={`ingredient-name-${index + 1}`}
                    autoComplete="off"
                    value={ingredient.name}
                    aria-label={t`Ingredient name ${index + 1}`}
                    placeholder={t`Ingredient`}
                    onChange={(event) =>
                      field.handleChange(
                        field.state.value.map((item, currentIndex) =>
                          currentIndex === index ? { ...item, name: event.target.value } : item,
                        ),
                      )
                    }
                    onBlur={field.handleBlur}
                    disabled={disabled}
                  />
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className={cn("h-7 w-7", ingredient.optional ? "text-muted-foreground" : "text-primary")}
                    aria-label={ingredient.optional ? t`Mark ingredient as required` : t`Mark ingredient as optional`}
                    title={ingredient.optional ? t`Optional ingredient` : t`Required ingredient`}
                    disabled={disabled}
                    onClick={() =>
                      field.handleChange(
                        field.state.value.map((item, currentIndex) =>
                          currentIndex === index ? { ...item, optional: !item.optional } : item,
                        ),
                      )
                    }
                  >
                    {ingredient.optional ? (
                      <Circle className="h-4 w-4" aria-hidden />
                    ) : (
                      <CircleCheck className="h-4 w-4" aria-hidden />
                    )}
                  </Button>
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7 text-muted-foreground"
                    aria-label={t`Remove ingredient`}
                    disabled={disabled || field.state.value.length <= 1}
                    onClick={() =>
                      field.handleChange(
                        field.state.value
                          .filter((_, currentIndex) => currentIndex !== index)
                          .map((item, order) => ({ ...item, order })),
                      )
                    }
                  >
                    <Minus className="h-4 w-4" aria-hidden />
                  </Button>
                </div>
              ))}
            </div>
            <Button
              type="button"
              variant="secondary"
              className="mt-2 h-8 gap-1.5 rounded-full px-3 text-xs"
              disabled={disabled}
              onClick={() =>
                field.handleChange([
                  ...field.state.value,
                  {
                    name: "",
                    quantity: null,
                    unit: null,
                    optional: false,
                    order: field.state.value.length,
                  },
                ])
              }
            >
              <Plus className="h-4 w-4" aria-hidden />
              <Trans>Add ingredient</Trans>
            </Button>
          </>
        </EditorSectionCard>
      )}
    </form.Field>
  );
}

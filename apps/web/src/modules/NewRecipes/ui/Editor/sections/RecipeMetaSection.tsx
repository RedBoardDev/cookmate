"use client";

import { BUDGETS, DIFFICULTIES } from "@cookmate/domain/shared/value-objects";
import { Trans, useLingui } from "@lingui/react/macro";
import { Flame, Gauge, Timer, Users } from "lucide-react";
import { RECIPE_BUDGET_LABELS, RECIPE_DIFFICULTY_LABELS } from "@/modules/NewRecipes/domain/vo/recipeLabels.vo";
import { EditorFieldError } from "@/modules/NewRecipes/ui/Editor/components/EditorFieldError";
import { EditorSectionCard } from "@/modules/NewRecipes/ui/Editor/components/EditorSectionCard";
import type { useCreateRecipeForm } from "@/modules/NewRecipes/ui/Editor/hooks/useCreateRecipeForm";
import { useTotalTimeSync } from "@/modules/NewRecipes/ui/Editor/hooks/useTotalTimeSync";
import { cn } from "@/shared/core/utils/cn";
import { Button } from "@/shared/ui/primitives/button";
import { Input } from "@/shared/ui/primitives/input";
import { Textarea } from "@/shared/ui/primitives/textarea";

interface RecipeMetaSectionProps {
  form: ReturnType<typeof useCreateRecipeForm>["form"];
  disabled?: boolean;
}

export function RecipeMetaSection({ form, disabled }: RecipeMetaSectionProps) {
  const { t } = useLingui();
  useTotalTimeSync(form);

  return (
    <EditorSectionCard
      title={t`Recipe details`}
      description={t`Give your recipe a name and the essentials.`}
      disabled={disabled}
    >
      <form.Field name="name">
        {(field) => (
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5">
              <label className="text-sm font-medium" htmlFor={field.name}>
                <Trans>Recipe title</Trans>
              </label>
              <EditorFieldError field={field} message={t`Recipe title is required`} />
            </div>
            <Input
              id={field.name}
              name={field.name}
              placeholder={t`Recipe title`}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(event) => field.handleChange(event.target.value)}
              disabled={disabled}
            />
          </div>
        )}
      </form.Field>

      <form.Field name="description">
        {(field) => (
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor={field.name}>
              <Trans>Description (optional)</Trans>
            </label>
            <Textarea
              id={field.name}
              name={field.name}
              placeholder={t`Description (optional)`}
              className="min-h-[80px]"
              value={field.state.value ?? ""}
              onBlur={field.handleBlur}
              onChange={(event) => field.handleChange(event.target.value.trim().length > 0 ? event.target.value : null)}
              disabled={disabled}
            />
            <EditorFieldError field={field} />
          </div>
        )}
      </form.Field>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        <form.Field name="prepTimeMin">
          {(field) => (
            <div className="min-w-0 space-y-2">
              <span className={cn("flex items-center gap-2 text-xs font-semibold uppercase", "text-muted-foreground")}>
                <Timer className="h-4 w-4 shrink-0" aria-hidden />
                <Trans>Preparation</Trans>
              </span>
              <Input
                id={field.name}
                name={field.name}
                type="number"
                inputMode="numeric"
                min={0}
                placeholder="0"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(Math.max(Number(event.target.value) || 0, 0))}
                disabled={disabled}
                suffix={t`min`}
              />
              <EditorFieldError field={field} />
            </div>
          )}
        </form.Field>

        <form.Field name="cookTimeMin">
          {(field) => (
            <div className="min-w-0 space-y-2">
              <span className={cn("flex items-center gap-2 text-xs font-semibold uppercase", "text-muted-foreground")}>
                <Flame className="h-4 w-4 shrink-0" aria-hidden />
                <Trans>Cooking</Trans>
              </span>
              <Input
                id={field.name}
                name={field.name}
                type="number"
                inputMode="numeric"
                min={0}
                placeholder="0"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(Math.max(Number(event.target.value) || 0, 0))}
                disabled={disabled}
                suffix={t`min`}
              />
              <EditorFieldError field={field} />
            </div>
          )}
        </form.Field>

        <form.Field name="totalTimeMin">
          {(field) => (
            <div className="min-w-0 space-y-2">
              <span className={cn("flex items-center gap-2 text-xs font-semibold uppercase", "text-muted-foreground")}>
                <Gauge className="h-4 w-4 shrink-0" aria-hidden />
                <Trans>Total</Trans>
              </span>
              <Input
                id={field.name}
                name={field.name}
                type="number"
                inputMode="numeric"
                min={0}
                placeholder="0"
                value={field.state.value}
                disabled
                title={t`Auto-calculated from preparation + cooking`}
                aria-label={t`Total time (auto-calculated, not editable)`}
                containerClassName="cursor-not-allowed bg-muted/60"
                suffix={t`min`}
              />
              <EditorFieldError field={field} />
            </div>
          )}
        </form.Field>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <form.Field name="servings">
          {(field) => (
            <div className="min-w-0 space-y-2">
              <span className={cn("flex items-center gap-2 text-xs font-semibold uppercase", "text-muted-foreground")}>
                <Users className="h-4 w-4 shrink-0" aria-hidden />
                <Trans>Servings</Trans>
              </span>
              <Input
                id={field.name}
                name={field.name}
                type="number"
                inputMode="numeric"
                min={1}
                placeholder={t`4`}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(Math.max(Number(event.target.value) || 1, 1))}
                disabled={disabled}
              />
              <EditorFieldError field={field} />
            </div>
          )}
        </form.Field>

        <form.Field name="yieldUnitLabel">
          {(field) => (
            <div className="min-w-0 space-y-2">
              <label className="text-sm font-medium" htmlFor={field.name}>
                <Trans>Yield unit (optional)</Trans>
              </label>
              <Input
                id={field.name}
                name={field.name}
                placeholder={t`portion(s), bowl(s), slice(s)…`}
                value={field.state.value ?? ""}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value.trim().length > 0 ? event.target.value : null)}
                disabled={disabled}
              />
              <EditorFieldError field={field} />
            </div>
          )}
        </form.Field>
      </div>

      <form.Field name="difficulty">
        {(field) => (
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase text-muted-foreground">
              <Trans>Difficulty</Trans>
              <EditorFieldError field={field} />
            </span>
            <div className="flex flex-wrap gap-2">
              {DIFFICULTIES.map((difficulty) => (
                <Button
                  key={difficulty}
                  type="button"
                  size="sm"
                  variant={field.state.value === difficulty ? "secondary" : "outline"}
                  className="h-7 rounded-full px-2.5 text-[11px] leading-none"
                  aria-pressed={field.state.value === difficulty}
                  disabled={disabled}
                  onClick={() => field.handleChange(difficulty)}
                >
                  {t(RECIPE_DIFFICULTY_LABELS[difficulty])}
                </Button>
              ))}
            </div>
          </div>
        )}
      </form.Field>

      <form.Field name="budget">
        {(field) => (
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase text-muted-foreground">
              <Trans>Budget</Trans>
              <EditorFieldError field={field} />
            </span>
            <div className="flex flex-wrap gap-2">
              {BUDGETS.map((budget) => (
                <Button
                  key={budget}
                  type="button"
                  size="sm"
                  variant={field.state.value === budget ? "secondary" : "outline"}
                  className="h-7 rounded-full px-2.5 text-[11px] leading-none"
                  aria-pressed={field.state.value === budget}
                  disabled={disabled}
                  onClick={() => field.handleChange(budget)}
                >
                  {t(RECIPE_BUDGET_LABELS[budget])}
                </Button>
              ))}
            </div>
          </div>
        )}
      </form.Field>
    </EditorSectionCard>
  );
}

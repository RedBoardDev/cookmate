"use client";

import type { RecipeAttribute, RecipeCategory } from "@cookmate/domain/recipe";
import { RECIPE_ATTRIBUTES, RECIPE_CATEGORIES } from "@cookmate/domain/shared/value-objects";
import { Trans, useLingui } from "@lingui/react/macro";
import { RECIPE_ATTRIBUTE_LABELS, RECIPE_CATEGORY_LABELS } from "@/modules/RecipeEditor/domain/vo/recipeLabels.vo";
import { Button } from "@/shared/ui/primitives/button";
import { EditorFieldError } from "../components/EditorFieldError";
import { EditorSectionCard } from "../components/EditorSectionCard";
import type { RecipeEditorFormApi } from "../hooks/useRecipeEditorBaseForm";

interface RecipeTagsSectionProps {
  form: RecipeEditorFormApi;
  disabled?: boolean;
}

export function RecipeTagsSection({ form, disabled }: RecipeTagsSectionProps) {
  const { t } = useLingui();

  return (
    <form.Field name="categories">
      {(categoriesField) => (
        <EditorSectionCard
          title={
            <span className="inline-flex items-center gap-1.5">
              <span>{t`Categories`}</span>
              <EditorFieldError field={categoriesField} message={t`Select at least one category`} />
            </span>
          }
          description={t`Select one or more categories for this recipe.`}
          disabled={disabled}
        >
          <div className="flex flex-wrap gap-2">
            {RECIPE_CATEGORIES.map((category) => {
              const isSelected = categoriesField.state.value.includes(category);

              return (
                <Button
                  key={category}
                  type="button"
                  size="sm"
                  variant={isSelected ? "secondary" : "outline"}
                  className="h-7 rounded-full px-2.5 text-[11px] leading-none"
                  aria-pressed={isSelected}
                  disabled={disabled}
                  onClick={() =>
                    categoriesField.handleChange(
                      isSelected
                        ? categoriesField.state.value.filter((value: RecipeCategory) => value !== category)
                        : [...categoriesField.state.value, category],
                    )
                  }
                >
                  {t(RECIPE_CATEGORY_LABELS[category])}
                </Button>
              );
            })}
          </div>

          <form.Field name="attributes">
            {(attributesField) => (
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase text-muted-foreground">
                  <Trans>Attributes</Trans>
                </p>
                <div className="flex flex-wrap gap-2">
                  {RECIPE_ATTRIBUTES.map((attribute) => {
                    const isSelected = attributesField.state.value.includes(attribute);

                    return (
                      <Button
                        key={attribute}
                        type="button"
                        size="sm"
                        variant={isSelected ? "secondary" : "outline"}
                        className="h-7 rounded-full px-2.5 text-[11px] leading-none"
                        aria-pressed={isSelected}
                        disabled={disabled}
                        onClick={() =>
                          attributesField.handleChange(
                            isSelected
                              ? attributesField.state.value.filter((value: RecipeAttribute) => value !== attribute)
                              : [...attributesField.state.value, attribute],
                          )
                        }
                      >
                        {t(RECIPE_ATTRIBUTE_LABELS[attribute])}
                      </Button>
                    );
                  })}
                </div>
                <EditorFieldError field={attributesField} />
              </div>
            )}
          </form.Field>
        </EditorSectionCard>
      )}
    </form.Field>
  );
}

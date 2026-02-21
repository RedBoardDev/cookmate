"use client";

import { Trans, useLingui } from "@lingui/react/macro";
import { Clock3, Minus, Plus } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { EditorFieldError } from "@/modules/NewRecipes/ui/Editor/components/EditorFieldError";
import { EditorSectionCard } from "@/modules/NewRecipes/ui/Editor/components/EditorSectionCard";
import type { useCreateRecipeForm } from "@/modules/NewRecipes/ui/Editor/hooks/useCreateRecipeForm";
import { cn } from "@/shared/core/utils/cn";
import { Button } from "@/shared/ui/primitives/button";
import { Input } from "@/shared/ui/primitives/input";
import { Label } from "@/shared/ui/primitives/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/primitives/popover";
import { Textarea } from "@/shared/ui/primitives/textarea";

interface RecipeInstructionsSectionProps {
  form: ReturnType<typeof useCreateRecipeForm>["form"];
  disabled?: boolean;
}

interface InstructionTimePopoverProps {
  durationMin: number | null;
  disabled?: boolean;
  onChange: (durationMin: number | null) => void;
}

const QUICK_DURATION_PRESETS = [15, 60, 45, 90];

function toDurationParts(durationMin: number | null) {
  if (durationMin === null) {
    return { hours: 0, minutes: 0 };
  }

  return {
    hours: Math.floor(durationMin / 60),
    minutes: durationMin % 60,
  };
}

function parseNonNegativeInt(value: string) {
  const parsed = Number.parseInt(value.trim(), 10);
  if (Number.isNaN(parsed) || parsed < 0) {
    return 0;
  }

  return parsed;
}

function formatDurationLabel(durationMin: number) {
  const { hours, minutes } = toDurationParts(durationMin);
  if (hours > 0 && minutes > 0) {
    return `${hours}h${minutes.toString().padStart(2, "0")}`;
  }

  if (hours > 0) {
    return `${hours}h`;
  }

  return `${minutes}mn`;
}

function InstructionTimePopover({ durationMin, disabled, onChange }: InstructionTimePopoverProps) {
  const { t } = useLingui();
  const hoursFieldId = useId();
  const minutesFieldId = useId();
  const [open, setOpen] = useState(false);
  const [hoursInput, setHoursInput] = useState("0");
  const [minutesInput, setMinutesInput] = useState("0");

  useEffect(() => {
    if (!open) {
      return;
    }

    const { hours, minutes } = toDurationParts(durationMin);
    setHoursInput(String(hours));
    setMinutesInput(String(minutes));
  }, [open, durationMin]);

  const applyDuration = () => {
    const totalDurationMin = parseNonNegativeInt(hoursInput) * 60 + parseNonNegativeInt(minutesInput);
    onChange(totalDurationMin > 0 ? totalDurationMin : null);
    setOpen(false);
  };

  const hasDuration = durationMin !== null;
  const durationTitle = hasDuration ? t`Step time: ${formatDurationLabel(durationMin)}` : t`Add step time`;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          size="icon"
          variant={hasDuration ? "secondary" : "ghost"}
          className="h-7 w-7"
          aria-label={hasDuration ? t`Edit step time` : t`Add step time`}
          title={durationTitle}
          disabled={disabled}
        >
          <Clock3 className="h-3.5 w-3.5" aria-hidden />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-56 space-y-3 p-3">
        <div className="space-y-0.5">
          <p className="text-xs font-semibold text-foreground">
            <Trans>Set step time</Trans>
          </p>
          <p className="text-[11px] text-muted-foreground">
            <Trans>Choose hours and minutes.</Trans>
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <Label htmlFor={hoursFieldId} className="text-[11px] text-muted-foreground">
              <Trans>Hours</Trans>
            </Label>
            <Input
              id={hoursFieldId}
              type="number"
              inputMode="numeric"
              min={0}
              value={hoursInput}
              onChange={(event) => setHoursInput(event.target.value)}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor={minutesFieldId} className="text-[11px] text-muted-foreground">
              <Trans>Minutes</Trans>
            </Label>
            <Input
              id={minutesFieldId}
              type="number"
              inputMode="numeric"
              min={0}
              value={minutesInput}
              onChange={(event) => setMinutesInput(event.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {QUICK_DURATION_PRESETS.map((preset) => (
            <Button
              key={preset}
              type="button"
              size="sm"
              variant="outline"
              className="h-6 rounded-full px-2 text-[11px]"
              onClick={() => {
                onChange(preset);
                setOpen(false);
              }}
            >
              {formatDurationLabel(preset)}
            </Button>
          ))}
        </div>

        <div className="flex items-center justify-end gap-2">
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className="h-7 px-2 text-xs"
            onClick={() => {
              onChange(null);
              setOpen(false);
            }}
          >
            <Trans>Clear</Trans>
          </Button>
          <Button type="button" size="sm" variant="secondary" className="h-7 px-2 text-xs" onClick={applyDuration}>
            <Trans>Apply</Trans>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function RecipeInstructionsSection({ form, disabled }: RecipeInstructionsSectionProps) {
  const { t } = useLingui();

  return (
    <form.Field name="instructions">
      {(field) => (
        <EditorSectionCard
          title={
            <span className="inline-flex items-center gap-1.5">
              <span>{t`Instructions`}</span>
              <EditorFieldError field={field} message={t`Add at least one step`} />
            </span>
          }
          description={t`Describe each step clearly.`}
          disabled={disabled}
        >
          <>
            <div className="overflow-hidden rounded-lg border border-border/60 bg-card/60">
              {field.state.value.map((instruction, index) => (
                <div
                  key={`instruction-${instruction.order}`}
                  className="grid gap-2 border-b border-border/50 p-2.5 last:border-b-0 sm:grid-cols-[24px_1fr_auto_auto]"
                >
                  <div
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-full",
                      "bg-muted text-xs font-semibold",
                    )}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <Textarea
                      name={`instruction-text-${index + 1}`}
                      autoComplete="off"
                      aria-label={t`Instruction step ${index + 1}`}
                      value={instruction.text}
                      placeholder={t`Describe this step…`}
                      className="min-h-[56px]"
                      onChange={(event) =>
                        field.handleChange(
                          field.state.value.map((item, currentIndex) =>
                            currentIndex === index ? { ...item, text: event.target.value } : item,
                          ),
                        )
                      }
                      onBlur={field.handleBlur}
                      disabled={disabled}
                    />
                  </div>
                  <InstructionTimePopover
                    durationMin={instruction.durationMin}
                    disabled={disabled}
                    onChange={(durationMin) =>
                      field.handleChange(
                        field.state.value.map((item, currentIndex) =>
                          currentIndex === index ? { ...item, durationMin } : item,
                        ),
                      )
                    }
                  />
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7 self-start text-muted-foreground"
                    aria-label={t`Remove step`}
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
                    text: "",
                    durationMin: null,
                    order: field.state.value.length,
                  },
                ])
              }
            >
              <Plus className="h-4 w-4" aria-hidden />
              <Trans>Add step</Trans>
            </Button>
          </>
        </EditorSectionCard>
      )}
    </form.Field>
  );
}

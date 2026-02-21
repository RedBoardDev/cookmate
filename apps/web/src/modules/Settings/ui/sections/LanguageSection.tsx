"use client";

import { Trans, useLingui } from "@lingui/react/macro";
import { Check, Loader2 } from "lucide-react";
import { cn } from "@/shared/core/utils/cn";
import { Button } from "@/shared/ui/primitives/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/primitives/card";
import { useLanguageSettings } from "../hooks/useLanguageSettings";

export function LanguageSection() {
  const { t } = useLingui();
  const { currentLocale, options, isUpdating, pendingLocale, errorMessage, changeLocale } = useLanguageSettings();

  return (
    <Card variant="soft" border="soft" shadow="flat" radius="3xl">
      <CardHeader>
        <CardTitle className="text-xl font-display">
          <Trans>Language</Trans>
        </CardTitle>
        <CardDescription>
          <Trans>Choose your preferred language for the interface.</Trans>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div role="radiogroup" aria-label={t`Interface language`} className="grid gap-2 sm:grid-cols-2">
          {options.map((option) => {
            const isSelected = option.value === currentLocale;
            const isPending = pendingLocale === option.value;

            return (
              <Button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={isSelected}
                aria-label={option.label}
                disabled={isUpdating}
                variant="outline"
                onClick={() => {
                  void changeLocale(option.value);
                }}
                className={cn(
                  "h-auto items-center justify-between rounded-2xl border px-4 py-3 text-left",
                  "transition-all duration-200",
                  "focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2",
                  isSelected
                    ? "border-primary/45 bg-primary/10 text-foreground shadow-sm"
                    : "border-border/70 bg-background/70 hover:border-primary/35 hover:bg-accent/20",
                )}
              >
                <span className="flex items-center gap-3">
                  <span className="text-xl leading-none" aria-hidden>
                    {option.flag}
                  </span>
                  <span className="flex flex-col">
                    <span className="text-sm font-semibold">{option.label}</span>
                    <span className="text-xs text-muted-foreground uppercase tracking-wide">{option.value}</span>
                  </span>
                </span>
                <span className="flex h-5 w-5 items-center justify-center">
                  {isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : isSelected ? (
                    <Check className="h-4 w-4" />
                  ) : null}
                </span>
              </Button>
            );
          })}
        </div>

        <p className="text-xs text-muted-foreground">
          <Trans>Language is saved on this device and applied immediately.</Trans>
        </p>

        {errorMessage ? (
          <p className="text-sm font-medium text-destructive" role="alert">
            {errorMessage}
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}

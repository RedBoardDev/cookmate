"use client";

import { useLingui } from "@lingui/react/macro";
import type { RecipeSection } from "@/modules/RecipeDetail/ui/hooks/useRecipeSections";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/primitives/button";

interface SectionTabsProps {
  activeSection: RecipeSection;
  onChange: (section: RecipeSection) => void;
}

export function SectionTabs({ activeSection, onChange }: SectionTabsProps) {
  const { t } = useLingui();

  return (
    <div
      className={cn(
        "sticky top-4 z-20 flex items-center gap-2 rounded-full border border-border/60",
        "bg-card/90 p-1 shadow-sm backdrop-blur lg:hidden",
      )}
    >
      {(["ingredients", "steps"] as const).map((section) => {
        const isActive = activeSection === section;
        const label = section === "ingredients" ? t`Ingredients` : t`Steps`;

        return (
          <Button
            key={section}
            size="sm"
            variant="ghost"
            className={cn(
              "flex-1 rounded-full text-sm",
              "transition-all focus-visible:ring-2",
              "focus-visible:ring-accent/40 focus-visible:ring-offset-2",
              "focus-visible:ring-offset-background",
              isActive
                ? "border border-border/70 bg-background/90 text-foreground shadow-sm"
                : "text-muted-foreground hover:bg-background/60 hover:text-foreground",
            )}
            aria-pressed={isActive}
            onClick={() => onChange(section)}
          >
            {label}
          </Button>
        );
      })}
    </div>
  );
}

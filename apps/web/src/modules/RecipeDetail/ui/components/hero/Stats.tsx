"use client";
import { useLingui } from "@lingui/react/macro";
import { Clock, Gauge, Users } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import type { RecipeDifficulty } from "@/modules/RecipeDetail/domain/vo/recipeDifficulty.vo";
import type { RecipeDuration } from "@/modules/RecipeDetail/domain/vo/recipeDuration.vo";

interface HeroStatsProps {
  duration?: RecipeDuration;
  servings?: number;
  difficulty?: RecipeDifficulty;
  isLoading?: boolean;
}

export function HeroStats({ duration, servings, difficulty, isLoading = false }: HeroStatsProps) {
  const { t } = useLingui();
  if (!isLoading && (!duration || servings === undefined || difficulty === undefined)) {
    return null;
  }

  const stats = [
    {
      id: "totalTime",
      label: t`Total time`,
      value: duration ? duration.toDisplayString() : "",
      icon: Clock,
    },
    {
      id: "servings",
      label: t`Servings`,
      value: servings !== undefined ? `${servings}` : "",
      icon: Users,
    },
    {
      id: "difficulty",
      label: t`Difficulty`,
      value: difficulty ? t(difficulty.translationKey) : "",
      icon: Gauge,
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-2 border-t border-border/70 pt-4 md:gap-3 md:pt-5">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className="flex min-w-0 items-center rounded-2xl border border-border/60 bg-background/70 px-3 py-2.5 shadow-sm md:px-3.5"
        >
          <div className="flex min-w-0 items-center gap-2.5">
            <stat.icon className="h-4.5 w-4.5 shrink-0 text-muted-foreground md:h-5 md:w-5" />
            <div className="flex min-w-0 flex-1 flex-col items-start justify-center">
              <span className="truncate text-sm font-semibold leading-tight text-foreground">
                {isLoading ? <Skeleton width={40} /> : stat.value}
              </span>
              <span className="truncate text-[11px] leading-tight text-muted-foreground md:text-xs">
                {stat.label}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

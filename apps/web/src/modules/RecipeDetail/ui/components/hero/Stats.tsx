"use client";
import type { MessageDescriptor } from "@lingui/core";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react/macro";
import { Clock, Gauge, Users } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import type { RecipeDifficultyType } from "@/modules/RecipeDetail/domain/vo/recipeDifficulty.vo";
import { cn } from "@/shared/core/utils/cn";
import { Card } from "@/shared/ui/primitives/card";

const DIFFICULTY_LABELS: Record<RecipeDifficultyType, MessageDescriptor> = {
  EASY: msg`Easy`,
  MEDIUM: msg`Medium`,
  HARD: msg`Hard`,
};

interface HeroStatsProps {
  totalMinutes?: number;
  servings?: number;
  difficulty?: RecipeDifficultyType;
  isLoading?: boolean;
}

export function HeroStats({ totalMinutes, servings, difficulty, isLoading = false }: HeroStatsProps) {
  const { t } = useLingui();
  if (!isLoading && (totalMinutes === undefined || servings === undefined || difficulty === undefined)) {
    return null;
  }

  const stats = [
    {
      id: "totalTime",
      label: t`Total time`,
      value: totalMinutes !== undefined ? t`${totalMinutes} min` : "",
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
      value: difficulty ? t(DIFFICULTY_LABELS[difficulty]) : "",
      icon: Gauge,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 border-t border-border/70 pt-4 lg:grid-cols-3">
      {stats.map((stat) => (
        <Card
          key={stat.id}
          variant="soft"
          border="soft"
          shadow="flat"
          radius="2xl"
          className={cn("flex items-center gap-3 px-4 py-3 text-sm")}
        >
          <stat.icon className="h-4 w-4 text-muted-foreground" />
          <div className="flex flex-col">
            <span className="font-semibold text-foreground">{isLoading ? <Skeleton width={48} /> : stat.value}</span>
            <span className="text-xs text-muted-foreground">{stat.label}</span>
          </div>
        </Card>
      ))}
    </div>
  );
}

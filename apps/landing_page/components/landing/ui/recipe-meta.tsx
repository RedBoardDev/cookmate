"use client";

import { type LucideIcon } from "lucide-react";
import { Trans } from "@lingui/react/macro";

interface RecipeMetaProps {
  icon: LucideIcon;
  value: string;
  iconColor?: string;
}

export function RecipeMeta({ icon: Icon, value, iconColor = "#C6502B" }: RecipeMetaProps) {
  return (
    <div className="flex items-center gap-1.5 text-sm">
      <Icon className="w-4 h-4" style={{ color: iconColor }} />
      <span className="text-[#221B16]">
        <Trans>{value}</Trans>
      </span>
    </div>
  );
}

"use client";

import { type LucideIcon } from "lucide-react";
import { type ReactNode } from "react";
import { Trans } from "@lingui/react/macro";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  children: ReactNode;
  iconGradient: string;
  iconShadow: string;
  hoverBorder?: string;
  hoverShadow?: string;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  children,
  iconGradient,
  iconShadow,
  hoverBorder = "hover:border-[#C6502B]/20",
  hoverShadow = "hover:shadow-[#C6502B]/[0.04]",
}: FeatureCardProps) {
  return (
    <div className="group">
      <div
        className={cn(
          "h-full bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-7 border border-[#E6D7C7]/60",
          "transition-all duration-300 ease-out",
          "hover:shadow-[0_4px_12px_-8px_rgba(0,0,0,0.22)]",
          "focus-within:ring-2 focus-within:ring-accent/40 focus-within:ring-offset-2 focus-within:ring-offset-background",
          hoverBorder,
          hoverShadow
        )}
      >
        <div className="flex items-start gap-4 mb-5">
          <div className={cn("w-12 h-12 rounded-2xl bg-gradient-to-br", iconGradient, "flex items-center justify-center flex-shrink-0 shadow-lg", iconShadow)}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-display text-lg text-[#221B16] mb-1">
              <Trans>{title}</Trans>
            </h3>
            <p className="text-sm text-[#6E6258]">
              <Trans>{description}</Trans>
            </p>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

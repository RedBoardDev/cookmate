"use client";

import { Check } from "lucide-react";
import { Trans } from "@lingui/react/macro";

interface FeatureItemProps {
  children: string;
  variant?: "primary" | "secondary";
}

export function FeatureItem({ children, variant = "secondary" }: FeatureItemProps) {
  const bgColor = variant === "primary" ? "bg-[#C6502B]/10" : "bg-[#5F7A57]/10";
  const iconColor = variant === "primary" ? "text-[#C6502B]" : "text-[#5F7A57]";

  return (
    <li className="flex items-center gap-3 text-sm text-[#221B16]">
      <div className={`w-5 h-5 rounded-full ${bgColor} flex items-center justify-center flex-shrink-0`}>
        <Check className={`w-3 h-3 ${iconColor}`} />
      </div>
      <Trans>{children}</Trans>
    </li>
  );
}

"use client";

import { type LucideIcon } from "lucide-react";
import { Trans } from "@lingui/react/macro";

interface TrustSignalProps {
  icon: LucideIcon;
  children: string;
  iconColor?: string;
  className?: string;
}

export function TrustSignal({ icon: Icon, children, iconColor = "#5F7A57", className }: TrustSignalProps) {
  return (
    <div className={`flex items-center gap-1.5 ${className || ""}`}>
      <Icon className="w-4 h-4" style={{ color: iconColor }} />
      <span>
        <Trans>{children}</Trans>
      </span>
    </div>
  );
}

"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionContainerProps {
  children: ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const maxWidths = {
  sm: "max-w-3xl",
  md: "max-w-4xl",
  lg: "max-w-5xl",
  xl: "max-w-6xl",
};

export function SectionContainer({ children, maxWidth = "md", className }: SectionContainerProps) {
  return (
    <div className={cn(maxWidths[maxWidth], "mx-auto px-4 md:px-8", className)}>
      {children}
    </div>
  );
}

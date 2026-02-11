"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavButtonProps {
  href: string;
  active?: boolean;
  children: ReactNode;
}

export function NavButton({ href, active, children }: NavButtonProps) {
  return (
    <Button
      asChild
      size="sm"
      variant="ghost"
      className={cn(
        "rounded-full px-4 text-sm font-medium transition-all",
        "focus-visible:ring-2 focus-visible:ring-accent/40",
        "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        active
          ? "bg-accent text-accent-foreground shadow-sm"
          : "text-muted-foreground hover:bg-accent/20 hover:text-foreground",
      )}
    >
      <a href={href}>{children}</a>
    </Button>
  );
}

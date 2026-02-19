"use client";

import { useLingui } from "@lingui/react/macro";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import type { ReactNode } from "react";
import { Button } from "@/shared/core/ui/primitives/button";
import { cn } from "@/shared/core/utils/cn";
import { MOBILE_NAV_ITEMS } from "@/shared/modules/app-shell/domain/navigation.config";
import { isNavActive } from "@/shared/modules/app-shell/domain/navigation.policy";

interface BottomNavProps {
  quickAddSlot?: ReactNode;
}

export function BottomNav({ quickAddSlot }: BottomNavProps) {
  const { t } = useLingui();
  const segments = useSelectedLayoutSegments();
  const leftItems = MOBILE_NAV_ITEMS.slice(0, 2);
  const rightItems = MOBILE_NAV_ITEMS.slice(2);

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40 border-t border-border/60",
        "bg-background/90 backdrop-blur-xl md:hidden overflow-visible",
        "rounded-t-3xl shadow-[0_-12px_32px_-24px_rgba(0,0,0,0.35)]",
        "supports-[backdrop-filter]:bg-background/80",
      )}
    >
      <div
        className={cn(
          "mx-auto grid h-16 w-full max-w-md grid-cols-5 items-center px-3",
          "pb-[env(safe-area-inset-bottom)]",
        )}
      >
        {leftItems.map((item) => {
          const active = isNavActive(segments, item.match);
          const Icon = item.icon;

          return (
            <Button
              key={item.href}
              asChild
              size="sm"
              variant="ghost"
              className={cn(
                "h-auto flex-col gap-1 rounded-2xl px-2 py-2 text-xs font-medium",
                "transition-all hover:bg-accent/15 hover:text-foreground",
                "focus-visible:ring-2 focus-visible:ring-accent/40",
                "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                active ? "bg-accent text-accent-foreground shadow-sm ring-1 ring-accent/30" : "text-muted-foreground",
              )}
            >
              <Link href={item.href} aria-current={active ? "page" : undefined}>
                <Icon className="h-5 w-5" />
                <span>{t(item.label)}</span>
              </Link>
            </Button>
          );
        })}

        <div className="flex items-center justify-center">{quickAddSlot}</div>

        {rightItems.map((item) => {
          const active = isNavActive(segments, item.match);
          const Icon = item.icon;

          return (
            <Button
              key={item.href}
              asChild
              size="sm"
              variant="ghost"
              className={cn(
                "h-auto flex-col gap-1 rounded-2xl px-2 py-2 text-xs font-medium",
                "transition-all hover:bg-accent/15 hover:text-foreground",
                "focus-visible:ring-2 focus-visible:ring-accent/40",
                "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                active ? "bg-accent text-accent-foreground shadow-sm ring-1 ring-accent/30" : "text-muted-foreground",
              )}
            >
              <Link href={item.href} aria-current={active ? "page" : undefined}>
                <Icon className="h-5 w-5" />
                <span>{t(item.label)}</span>
              </Link>
            </Button>
          );
        })}
      </div>
    </nav>
  );
}

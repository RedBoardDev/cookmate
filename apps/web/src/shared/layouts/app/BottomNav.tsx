"use client";

import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import { Button } from "@/shared/ui/primitives/button";
import { cn } from "@/shared/lib/utils";
import {
  MOBILE_NAV_ITEMS,
  MOBILE_PRIMARY_ACTION,
  isNavActive
} from "@/shared/layouts/app/navigation";

export function BottomNav() {
  const segments = useSelectedLayoutSegments();
  const leftItems = MOBILE_NAV_ITEMS.slice(0, 2);
  const rightItems = MOBILE_NAV_ITEMS.slice(2);
  const addActive = isNavActive(segments, MOBILE_PRIMARY_ACTION.match);

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40 border-t border-border/60",
        "bg-background/90 backdrop-blur-xl md:hidden overflow-visible",
        "rounded-t-3xl shadow-[0_-12px_32px_-24px_rgba(0,0,0,0.35)]",
        "supports-[backdrop-filter]:bg-background/80"
      )}
    >
      <div
        className={cn(
          "mx-auto grid h-16 w-full max-w-md grid-cols-5 items-center px-3",
          "pb-[env(safe-area-inset-bottom)]"
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
                  active
                    ? "bg-accent text-accent-foreground shadow-sm ring-1 ring-accent/30"
                    : "text-muted-foreground"
                )}
            >
              <Link href={item.href} aria-current={active ? "page" : undefined}>
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            </Button>
          );
        })}

        <div className="flex items-center justify-center">
          <Button
            asChild
            size="icon"
            className={cn(
              "h-[3.25rem] w-[3.25rem] rounded-full shadow-md",
              "bg-primary text-primary-foreground hover:bg-primary/90",
              "transition-transform hover:shadow-lg motion-safe:hover:-translate-y-0.5",
              "focus-visible:ring-2 focus-visible:ring-accent/40",
              "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              addActive ? "ring-2 ring-primary/40 ring-offset-2" : "",
              "ring-offset-background"
            )}
            aria-label={MOBILE_PRIMARY_ACTION.label}
          >
            <Link
              href={MOBILE_PRIMARY_ACTION.href}
              aria-current={addActive ? "page" : undefined}
            >
              <MOBILE_PRIMARY_ACTION.icon className="h-8 w-8" />
            </Link>
          </Button>
        </div>

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
                  active
                    ? "bg-accent text-accent-foreground shadow-sm ring-1 ring-accent/30"
                    : "text-muted-foreground"
                )}
            >
              <Link href={item.href} aria-current={active ? "page" : undefined}>
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            </Button>
          );
        })}
      </div>
    </nav>
  );
}

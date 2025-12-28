"use client";

import Image from "next/image";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import { Button } from "@/shared/ui/primitives/button";
import { cn } from "@/shared/lib/utils";
import iconImage from "@/app/icon.png";
import {
  MOBILE_HOME,
  MOBILE_NAV_ITEMS,
  isNavActive
} from "@/shared/layouts/app/navigation";

export function BottomNav() {
  const segments = useSelectedLayoutSegments();
  const leftItems = MOBILE_NAV_ITEMS.slice(0, 2);
  const rightItems = MOBILE_NAV_ITEMS.slice(2);
  const homeActive = isNavActive(segments, MOBILE_HOME.match);

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40 border-t border-border/80",
        "bg-background/95 backdrop-blur md:hidden"
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
                "transition-colors hover:bg-accent/15 hover:text-foreground",
                active
                  ? "bg-accent text-accent-foreground shadow-sm"
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
            size="sm"
            variant="ghost"
            className={cn(
              "h-auto flex-col gap-1 rounded-2xl px-2 py-2 text-xs font-medium",
              "transition-colors hover:bg-accent/15 hover:text-foreground",
              homeActive
                ? "bg-accent text-accent-foreground shadow-sm"
                : "text-muted-foreground"
            )}
          >
            <Link
              href={MOBILE_HOME.href}
              aria-current={homeActive ? "page" : undefined}
            >
              <Image
                src={iconImage}
                alt={MOBILE_HOME.label}
                width={20}
                height={20}
                className="h-5 w-5"
                priority
              />
              <span>{MOBILE_HOME.label}</span>
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
                "transition-colors hover:bg-accent/15 hover:text-foreground",
                active
                  ? "bg-accent text-accent-foreground shadow-sm"
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

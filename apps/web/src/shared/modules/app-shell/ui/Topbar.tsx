"use client";

import { useLingui } from "@lingui/react/macro";
import Image from "next/image";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import type { ReactNode } from "react";
import iconImage from "@/app/icon.png";
import { Button } from "@/shared/core/ui/primitives/button";
import { cn } from "@/shared/core/utils/cn";
import { NAV_ITEMS } from "@/shared/modules/app-shell/domain/navigation.config";
import { isNavActive } from "@/shared/modules/app-shell/domain/navigation.policy";
import { UserMenu } from "@/shared/modules/user-session/ui/components/UserMenu";

interface TopbarProps {
  quickAddSlot?: ReactNode;
  onSignOut?: () => void;
}

export function Topbar({ quickAddSlot, onSignOut }: TopbarProps) {
  const { t } = useLingui();
  const segments = useSelectedLayoutSegments();

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 hidden border-b border-border/60 md:block",
        "bg-background/90 backdrop-blur-xl",
        "shadow-[0_1px_0_rgba(0,0,0,0.04)]",
        "supports-[backdrop-filter]:bg-background/80",
      )}
    >
      <div className="mx-auto grid h-16 max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-6">
        <Link
          className={cn(
            "group flex w-fit items-center gap-2 rounded-full pr-2",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
            "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          )}
          href="/recipes"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-card/80 shadow-sm">
            <Image src={iconImage} alt="Cookmate" width={40} height={40} className="h-10 w-10" priority />
          </span>
          <span className="text-lg font-display text-foreground transition-colors group-hover:text-primary">
            Cookmate
          </span>
        </Link>

        <nav
          className={cn(
            "hidden items-center gap-1 rounded-full p-1.5 md:flex",
            "border border-border/70 bg-card/85 shadow-sm backdrop-blur",
          )}
        >
          {NAV_ITEMS.map((item) => {
            const active = isNavActive(segments, item.match);
            return (
              <Button
                key={item.href}
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
                <Link href={item.href} aria-current={active ? "page" : undefined}>
                  {t(item.label)}
                </Link>
              </Button>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 justify-self-end md:flex">
          {quickAddSlot}
          <UserMenu onSignOut={onSignOut} />
        </div>
      </div>
    </header>
  );
}

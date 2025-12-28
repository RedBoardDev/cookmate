"use client";

import Image from "next/image";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/shared/ui/primitives/button";
import { cn } from "@/shared/lib/utils";
import iconImage from "@/app/icon.png";
import {
  NAV_ITEMS,
  PRIMARY_ACTION,
  isNavActive
} from "@/shared/layouts/app/navigation";

export function Topbar() {
  const segments = useSelectedLayoutSegments();

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 hidden border-b border-border/80 md:block",
        "bg-background/95 backdrop-blur shadow-sm"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link className="flex items-center gap-2" href="/recipes">
          <span className="flex h-10 w-10 items-center justify-center">
            <Image
              src={iconImage}
              alt="Cookmate"
              width={40}
              height={40}
              className="h-10 w-10"
              priority
            />
          </span>
          <span className="text-lg font-display text-foreground">Cookmate</span>
        </Link>

        <nav
          className={cn(
            "hidden items-center gap-1 rounded-2xl p-1 md:flex",
            "border border-border/70 bg-card/85"
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
                  "rounded-xl px-4 text-sm font-medium transition-colors",
                  active
                    ? "bg-accent text-accent-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-accent/20 hover:text-foreground"
                )}
              >
                <Link href={item.href} aria-current={active ? "page" : undefined}>
                  {item.label}
                </Link>
              </Button>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button
            asChild
            aria-label="Search"
            size="icon"
            variant="ghost"
            className="rounded-xl text-muted-foreground hover:bg-accent/20 hover:text-foreground"
          >
            <Link href="/search">
              <Search className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild className="rounded-xl px-5 shadow-sm">
            <Link href={PRIMARY_ACTION.href}>
              <PRIMARY_ACTION.icon className="h-4 w-4" />
              {PRIMARY_ACTION.label}
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

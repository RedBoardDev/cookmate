"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import iconImage from "@/app/icon.png";
import { Trans } from "@lingui/react/macro";
import { useActiveSection } from "./hooks/use-active-section";
import { LocaleSwitcher } from "./locale-switcher";
import { NavButton } from "./ui/nav-button";

interface HeaderProps {
  onLogin: () => void;
  onSignup: () => void;
}

export function Header({ onLogin, onSignup }: HeaderProps) {
  const activeSection = useActiveSection();
  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 border-b border-border/60",
        "bg-background/90 backdrop-blur-xl",
        "shadow-[0_1px_0_rgba(0,0,0,0.04)]",
        "supports-[backdrop-filter]:bg-background/80"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link
          className={cn(
            "group flex items-center gap-2 rounded-full pr-2",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
            "focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          )}
          href="/"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-card/80 shadow-sm">
            <Image
              src={iconImage}
              alt="Cookmate"
              width={40}
              height={40}
              className="h-10 w-10"
              priority
            />
          </span>
          <span className="text-lg font-display text-foreground transition-colors group-hover:text-primary">
            Cookmate
          </span>
        </Link>

        <nav
          className={cn(
            "hidden items-center gap-1 rounded-full p-1.5 md:flex",
            "border border-border/70 bg-card/85 shadow-sm backdrop-blur"
          )}
        >
          <NavButton href="#" active={activeSection === "home"}>
            <Trans>Home</Trans>
          </NavButton>
          <NavButton href="#features" active={activeSection === "features"}>
            <Trans>Features</Trans>
          </NavButton>
          <NavButton href="#pricing" active={activeSection === "pricing"}>
            <Trans>Pricing</Trans>
          </NavButton>
          <NavButton href="#faq" active={activeSection === "faq"}>
            <Trans>FAQ</Trans>
          </NavButton>
        </nav>

        <div className="flex items-center gap-2">
          <LocaleSwitcher />
          <Button
            variant="ghost"
            onClick={onLogin}
            className={cn(
              "hidden rounded-full px-4 text-sm font-medium transition-all md:flex",
              "text-muted-foreground hover:bg-accent/20 hover:text-foreground"
            )}
          >
            <Trans>Log in</Trans>
          </Button>
        </div>
      </div>
    </header>
  );
}

"use client";

import type { MessageDescriptor } from "@lingui/core";
import { msg } from "@lingui/core/macro";
import { Trans, useLingui } from "@lingui/react/macro";
import { CreditCard, HelpCircle, LogOut, Settings, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Button } from "@/shared/ui/primitives/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/primitives/dropdown-menu";
import { cn } from "@/shared/core/utils/cn";
import { userAvatarService } from "@/shared/modules/user-session/domain/services/userAvatar.service";
import { useCurrentUser } from "@/shared/modules/user-session/ui/hooks/useCurrentUser";

const MENU_ITEMS: Array<{ label: MessageDescriptor; href: string; icon: typeof User }> = [
  {
    label: msg`My profile`,
    href: "/profile",
    icon: User,
  },
  {
    label: msg`Settings`,
    href: "/settings",
    icon: Settings,
  },
  {
    label: msg`Subscription`,
    href: "/subscription",
    icon: CreditCard,
  },
  {
    label: msg`Help`,
    href: "/help",
    icon: HelpCircle,
  },
];

interface UserMenuProps {
  onSignOut?: () => void;
}

export function UserMenu({ onSignOut }: UserMenuProps) {
  const { t } = useLingui();
  const { user, isAuthenticated, isLoading } = useCurrentUser();
  const [avatarError, setAvatarError] = useState(false);

  const avatarFallback = useMemo(() => {
    return userAvatarService.resolveFallback(user?.name);
  }, [user?.name]);

  const avatarSrc = useMemo(() => {
    return userAvatarService.resolveSrc(user?.avatarUrl);
  }, [user?.avatarUrl]);

  const handleLogout = () => {
    onSignOut?.();
  };

  const handleAvatarError = () => {
    setAvatarError(true);
  };

  if (!isAuthenticated && !isLoading) {
    return (
      <Button asChild className="rounded-xl px-5 shadow-sm">
        <Link href="/login">
          <Trans>Sign in</Trans>
        </Link>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          aria-label={t`Profile`}
          size="icon"
          variant="ghost"
          className={cn(
            "h-12 w-12 rounded-full border border-border/60 bg-muted/70 shadow-sm",
            "hover:bg-muted/60 transition-colors p-0.5",
          )}
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-background/80 overflow-hidden">
            {avatarError ? (
              <span className="text-sm font-medium text-secondary-foreground">{avatarFallback}</span>
            ) : (
              <Image
                src={avatarSrc}
                alt={user?.name ?? t`Profile`}
                width={72}
                height={72}
                className="h-11 w-11 object-contain"
                onError={handleAvatarError}
              />
            )}
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className={cn(
          "w-[calc(100vw-2rem)] max-w-xs rounded-2xl border border-border/60 bg-background/95 p-0 shadow-lg",
          "sm:w-64 sm:max-w-none",
        )}
      >
        <div className="flex items-center gap-3 border-b border-border/50 p-4">
          {avatarError ? (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground text-base font-medium">
              {avatarFallback}
            </div>
          ) : (
            <Image
              src={avatarSrc}
              alt={user?.name ?? "Profile"}
              width={80}
              height={80}
              className="h-10 w-10 rounded-full object-cover"
              onError={handleAvatarError}
            />
          )}
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-sm font-semibold text-foreground truncate">{user?.name ?? t`Loading...`}</span>
            <span className="text-xs text-muted-foreground truncate">{user?.email ?? ""}</span>
          </div>
        </div>

        <div className="p-1">
          {MENU_ITEMS.map((item) => {
            const Icon = item.icon;

            return (
              <DropdownMenuItem
                key={item.href}
                asChild
                className={cn(
                  "rounded-sm px-3 py-2 text-sm font-medium transition-colors",
                  "text-muted-foreground hover:bg-accent/20 hover:text-foreground",
                  "focus:bg-accent/20 focus:text-foreground",
                )}
              >
                <Link href={item.href} className="flex items-center gap-3">
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{t(item.label)}</span>
                </Link>
              </DropdownMenuItem>
            );
          })}
        </div>

        <DropdownMenuSeparator className="-mx-1 my-0 border-border/50" />
        <div className="p-1">
          <DropdownMenuItem
            onClick={handleLogout}
            className={cn(
              "rounded-sm px-3 py-2 text-sm font-medium transition-colors",
              "text-primary hover:bg-primary/10 hover:text-primary",
              "focus:bg-primary/10 focus:text-primary",
            )}
          >
            <LogOut className="h-4 w-4 shrink-0" />
            <span>
              <Trans>Log out</Trans>
            </span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

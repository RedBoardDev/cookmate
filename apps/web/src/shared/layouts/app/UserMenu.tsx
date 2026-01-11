
"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/ui/primitives/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/shared/ui/primitives/dropdown-menu";
import { cn } from "@/shared/lib/utils";
import { useAuth } from "@/shared/providers/auth-provider";
import { useSignOut } from "@/modules/Auth/api/useSignOut";
import {
  User,
  Settings,
  CreditCard,
  HelpCircle,
  LogOut
} from "lucide-react";

// * Menu items configuration
const MENU_ITEMS = [
  {
    label: "My profile",
    href: "/profile",
    icon: User
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings
  },
  {
    label: "Subscription",
    href: "/subscription",
    icon: CreditCard
  },
  {
    label: "Help",
    href: "/help",
    icon: HelpCircle
  }
] as const;

function getAvatarSrc(avatarUrl: string | null | undefined): string {
  if (!avatarUrl) {
    return "/avatars/avatar_1.png";
  }

  try {
    new URL(avatarUrl);
    return avatarUrl;
  } catch {
    if (avatarUrl.startsWith("/")) {
      return avatarUrl;
    }
    return `/avatars/avatar_1.png`;
  }
}

export function UserMenu() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [avatarError, setAvatarError] = useState(false);
  const avatarFallback = useMemo(() => {
    if (!user?.name) return "?";
    return user.name.trim().charAt(0).toUpperCase();
  }, [user?.name]);

  const avatarSrc = useMemo(() => getAvatarSrc(user?.avatarUrl), [user?.avatarUrl]);

  const signOut = useSignOut({
    onSuccess: () => {
      router.replace("/login");
    }
  });

  const handleLogout = () => {
    signOut.mutate({});
  };

  const handleAvatarError = () => {
    setAvatarError(true);
  };

  if (!isAuthenticated && !isLoading) {
    return (
      <Button asChild className="rounded-xl px-5 shadow-sm">
        <Link href="/login">Sign in</Link>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          aria-label="Profile"
          size="icon"
          variant="ghost"
          className={cn(
            "h-12 w-12 rounded-full border border-border/60 bg-muted/70 shadow-sm",
            "hover:bg-muted/60 transition-colors p-0.5"
          )}
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-background/80 overflow-hidden">
            {avatarError ? (
              <span className="text-sm font-medium text-secondary-foreground">
                {avatarFallback}
              </span>
            ) : (
              <Image
                src={avatarSrc}
                alt={user?.name ?? "Profile"}
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
          "sm:w-64 sm:max-w-none"
        )}
      >
        {/* * User info section */}
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
            <span className="text-sm font-semibold text-foreground truncate">
              {user?.name ?? "Loading..."}
            </span>
            <span className="text-xs text-muted-foreground truncate">
              {user?.email ?? ""}
            </span>
          </div>
        </div>

        {/* * Menu items */}
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
                  "focus:bg-accent/20 focus:text-foreground"
                )}
              >
                <Link href={item.href} className="flex items-center gap-3">
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              </DropdownMenuItem>
            );
          })}
        </div>

        {/* * Logout section */}
        <DropdownMenuSeparator className="-mx-1 my-0 border-border/50" />
        <div className="p-1">
          <DropdownMenuItem
            onClick={handleLogout}
            className={cn(
              "rounded-sm px-3 py-2 text-sm font-medium transition-colors",
              "text-primary hover:bg-primary/10 hover:text-primary",
              "focus:bg-primary/10 focus:text-primary"
            )}
          >
            <LogOut className="h-4 w-4 shrink-0" />
            <span>Log out</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

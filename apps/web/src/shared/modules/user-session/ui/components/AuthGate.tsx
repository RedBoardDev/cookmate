"use client";

import { Trans } from "@lingui/react/macro";
import Image from "next/image";
import type { ReactNode } from "react";
import iconImage from "@/app/icon.png";
import { useCurrentUser } from "@/shared/modules/user-session/ui/hooks/useCurrentUser";

interface AuthGateProps {
  children: ReactNode;
}

export function AuthGate({ children }: AuthGateProps) {
  const { isAuthenticated, isLoading } = useCurrentUser();

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative flex h-16 w-16 items-center justify-center">
            <span className="absolute inset-0 rounded-full bg-primary/15 blur-xl" />
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border/70 bg-background/90">
              <Image
                src={iconImage}
                alt="Cookmate"
                width={32}
                height={32}
                className="h-8 w-8 animate-[spin_6s_linear_infinite]"
                priority
              />
            </div>
          </div>
          <span className="text-sm font-display text-muted-foreground">
            <Trans>Checking your session...</Trans>
          </span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

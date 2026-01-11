"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/shared/providers/auth-provider";
import iconImage from "@/app/icon.png";

interface AuthGateProps {
  children: ReactNode;
}

export function AuthGate({ children }: AuthGateProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isLoading, router]);

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
            Checking your session...
          </span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

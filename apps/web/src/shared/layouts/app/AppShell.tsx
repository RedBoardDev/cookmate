import type { ReactNode } from "react";
import { BottomNav } from "@/shared/layouts/app/BottomNav";
import { Topbar } from "@/shared/layouts/app/Topbar";
import { AuthGate } from "@/shared/layouts/app/AuthGate";
import { cn } from "@/shared/lib/utils";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <AuthGate>
      <div
        className={cn(
          "min-h-screen bg-background text-foreground",
          "bg-[radial-gradient(120%_120%_at_top,_hsl(var(--accent)/0.2)_0%,_transparent_60%)]"
        )}
      >
        <Topbar />
        <main
          className={cn(
            "min-h-screen pb-[calc(4.5rem+env(safe-area-inset-bottom))]",
            "pt-0 md:pt-16 md:pb-0"
          )}
        >
          {children}
        </main>
        <BottomNav />
      </div>
    </AuthGate>
  );
}

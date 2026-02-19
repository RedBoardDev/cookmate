import type { ReactNode } from "react";
import { cn } from "@/shared/core/utils/cn";
import { BottomNav } from "@/shared/modules/app-shell/ui/BottomNav";
import { Topbar } from "@/shared/modules/app-shell/ui/Topbar";
import { AuthGate } from "@/shared/modules/user-session/ui/components/AuthGate";

interface AppShellProps {
  children: ReactNode;
  quickAddSlot?: ReactNode;
  onSignOut?: () => void;
}

export function AppShell({ children, quickAddSlot, onSignOut }: AppShellProps) {
  return (
    <AuthGate>
      <div
        className={cn(
          "relative isolate min-h-screen overflow-x-hidden bg-background text-foreground",
          "bg-[radial-gradient(120%_120%_at_top,_hsl(var(--accent)/0.2)_0%,_transparent_60%)]",
          "after:pointer-events-none after:absolute after:inset-0",
          "after:bg-[radial-gradient(70%_70%_at_15%_0%,_hsl(var(--cm-primary)/0.12)_0%,_transparent_60%),radial-gradient(70%_70%_at_85%_10%,_hsl(var(--cm-accent)/0.12)_0%,_transparent_65%)]",
          "after:opacity-80",
        )}
      >
        <Topbar quickAddSlot={quickAddSlot} onSignOut={onSignOut} />
        <main
          className={cn(
            "relative z-10 min-h-screen pb-[calc(4.5rem+env(safe-area-inset-bottom))]",
            "pt-0 md:pt-16 md:pb-0",
          )}
        >
          {children}
        </main>
        <BottomNav quickAddSlot={quickAddSlot} />
      </div>
    </AuthGate>
  );
}

import type { ReactNode } from "react";
import { cn } from "@/shared/lib/utils";
import { QueryProvider } from "@/shared/providers/query-provider";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <QueryProvider>
      <div
        className={cn(
          "min-h-screen bg-background text-foreground",
          "bg-[radial-gradient(120%_120%_at_top,_hsl(var(--accent)/0.2)_0%,_transparent_60%)]"
        )}
      >
        <main className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 py-16">
          {children}
        </main>
      </div>
    </QueryProvider>
  );
}

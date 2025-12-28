import type { ReactNode } from "react";
import { AppShell } from "@/shared/layouts/app/AppShell";
import { QueryProvider } from "@/shared/providers/query-provider";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <AppShell>{children}</AppShell>
    </QueryProvider>
  );
}

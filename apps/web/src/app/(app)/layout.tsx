import type { ReactNode } from "react";
import { AppShell } from "@/shared/layouts/app/AppShell";
import { AuthProvider } from "@/shared/providers/auth-provider";
import { QueryProvider } from "@/shared/providers/query-provider";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <AuthProvider>
        <AppShell>{children}</AppShell>
      </AuthProvider>
    </QueryProvider>
  );
}

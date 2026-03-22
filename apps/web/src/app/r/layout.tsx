import type { ReactNode } from "react";
import { QueryProvider } from "@/shared/core/providers/query-provider";
import { UserSessionProvider } from "@/shared/modules/user-session/ui/providers/UserSessionProvider";

export default function ShortUrlLayout({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <UserSessionProvider>{children}</UserSessionProvider>
    </QueryProvider>
  );
}

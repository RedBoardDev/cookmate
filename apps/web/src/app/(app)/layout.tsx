"use client";

import { useLingui } from "@lingui/react/macro";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { toast } from "sonner";
import { useSignOut } from "@/shared/modules/user-session/api/useSignOut";
import { QuickAddTrigger } from "@/modules/NewRecipes/ui/QuickAdd/QuickAddTrigger";
import { AppShell } from "@/shared/modules/app-shell/ui/AppShell";
import { UserSessionProvider } from "@/shared/modules/user-session/ui/providers/UserSessionProvider";
import { QueryProvider } from "@/shared/core/providers/query-provider";

function AppLayoutInner({ children }: { children: ReactNode }) {
  const { t } = useLingui();
  const router = useRouter();
  const signOut = useSignOut({
    onSuccess: () => {
      router.replace("/login");
    },
    onError: () => {
      toast.error(t`Sign out failed. Please try again.`);
    },
  });

  const handleSignOut = () => {
    signOut.mutate({});
  };

  return (
    <AppShell quickAddSlot={<QuickAddTrigger variant="navigation" />} onSignOut={handleSignOut}>
      {children}
    </AppShell>
  );
}

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <UserSessionProvider>
        <AppLayoutInner>{children}</AppLayoutInner>
      </UserSessionProvider>
    </QueryProvider>
  );
}

"use client";

import type { ReactNode } from "react";
import { createContext, useMemo } from "react";
import type { Session } from "@/generated/types";
import { useCurrentSession } from "@/shared/modules/user-session/api/useCurrentSession";
import type { CurrentUserAggregate } from "@/shared/modules/user-session/domain/entity/currentUser.aggregate";

export type UserSessionContextValue = {
  user: CurrentUserAggregate | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  refresh: () => Promise<unknown>;
};

export const UserSessionContext = createContext<UserSessionContextValue | null>(null);

interface UserSessionProviderProps {
  children: ReactNode;
}

export function UserSessionProvider({ children }: UserSessionProviderProps) {
  const { user, session, isAuthenticated, isLoading, refresh } = useCurrentSession();

  const value = useMemo(
    () => ({
      user,
      session,
      isAuthenticated,
      isLoading,
      refresh,
    }),
    [user, session, isAuthenticated, isLoading, refresh],
  );

  return <UserSessionContext.Provider value={value}>{children}</UserSessionContext.Provider>;
}

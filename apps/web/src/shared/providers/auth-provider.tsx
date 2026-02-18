"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useMemo } from "react";
import type { Session } from "@/generated/types";
import { useSession } from "@/modules/Auth/api/useSession";
import type { AuthUserEntity } from "@/modules/Auth/domain/entity/authUser.entity";

type AuthContextValue = {
  user: AuthUserEntity | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  refresh: () => Promise<unknown>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { user, session, isAuthenticated, isLoading, refresh } = useSession();

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

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }
  return context;
}

"use client";

import { useMemo } from "react";
import { useGetSession, getSessionQueryKey } from "@/generated/hooks";
import type { Session, GetSessionQueryResponse } from "@/generated/types";
import { AuthMapper, type AuthUser } from "@/modules/Auth/application/auth.mapper";

export type AuthSession = {
  session: Session | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
};

const mapSession = (data?: GetSessionQueryResponse): AuthSession => {
  if (!data) {
    return {
      session: null,
      user: null,
      isAuthenticated: false
    };
  }

  return {
    session: data.session,
    user: AuthMapper.toAuthUser(data.user),
    isAuthenticated: true
  };
};

export function useSession() {
  const query = useGetSession({
    query: {
      retry: false
    }
  });

  const session = useMemo(() => mapSession(query.data), [query.data]);

  return {
    ...session,
    queryKey: getSessionQueryKey(),
    isLoading: query.isLoading,
    error: query.error,
    refresh: query.refetch
  };
}

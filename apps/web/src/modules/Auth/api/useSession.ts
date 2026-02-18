"use client";

import { useMemo } from "react";
import { getSessionQueryKey, useGetSession } from "@/generated/hooks";
import type { GetSessionQueryResponse, Session } from "@/generated/types";
import { AuthMapper } from "@/modules/Auth/application/auth.mapper";
import type { AuthUserEntity } from "@/modules/Auth/domain/entity/authUser.entity";

export type AuthSession = {
  session: Session | null;
  user: AuthUserEntity | null;
  isAuthenticated: boolean;
};

const mapSession = (data?: GetSessionQueryResponse): AuthSession => {
  if (!data) {
    return {
      session: null,
      user: null,
      isAuthenticated: false,
    };
  }

  return {
    session: data.session,
    user: AuthMapper.toDomain(data.user),
    isAuthenticated: true,
  };
};

export function useSession() {
  const query = useGetSession({
    query: {
      retry: false,
    },
  });

  const session = useMemo(() => mapSession(query.data), [query.data]);

  return {
    ...session,
    queryKey: getSessionQueryKey(),
    isLoading: query.isLoading,
    error: query.error,
    refresh: query.refetch,
  };
}

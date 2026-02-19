"use client";

import { useMemo } from "react";
import { getSessionQueryKey, useGetSession } from "@/generated/hooks";
import type { GetSessionQueryResponse, Session } from "@/generated/types";
import { CurrentSessionMapper } from "@/shared/modules/user-session/application/currentSession.mapper";
import type { CurrentUserAggregate } from "@/shared/modules/user-session/domain/entity/currentUser.aggregate";

export type CurrentSession = {
  session: Session | null;
  user: CurrentUserAggregate | null;
  isAuthenticated: boolean;
};

const mapSession = (data?: GetSessionQueryResponse): CurrentSession => {
  if (!data) {
    return {
      session: null,
      user: null,
      isAuthenticated: false,
    };
  }

  return {
    session: data.session,
    user: CurrentSessionMapper.toDomain(data.user),
    isAuthenticated: true,
  };
};

export function useCurrentSession() {
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

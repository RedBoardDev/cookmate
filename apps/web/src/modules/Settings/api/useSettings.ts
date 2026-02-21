"use client";

import { useMemo } from "react";
import type { SettingsAggregate } from "@/modules/Settings/domain/entity/settings.aggregate";
import { useCurrentUser } from "@/shared/modules/user-session/ui/hooks/useCurrentUser";
import { SettingsMapper } from "../application/settings.mapper";

export function useSettings() {
  const { user, isLoading } = useCurrentUser();

  const aggregate = useMemo<SettingsAggregate | null>(() => {
    if (!user || isLoading) {
      return null;
    }

    return SettingsMapper.toDomain(user);
  }, [user, isLoading]);

  return {
    aggregate,
    isLoading,
  };
}

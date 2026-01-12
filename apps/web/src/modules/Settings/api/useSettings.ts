"use client";

import { useMemo } from "react";
import { useAuth } from "@/shared/providers/auth-provider";
import { SettingsMapper } from "../application/settings.mapper";
import type { SettingsAggregate } from "../domain/settings.aggregate";
import type { User } from "@/generated/types";

export function useSettings() {
  const { user, session, isLoading } = useAuth();

  const aggregate = useMemo<SettingsAggregate | null>(() => {
    if (!user || !session || isLoading) {
      return null;
    }

    const userData: User = {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatarUrl ?? "/avatars/avatar_1.png",
      image: user.avatarUrl ?? undefined,
      createdAt: session.createdAt,
      updatedAt: session.updatedAt,
      emailVerified: false,
    };

    return SettingsMapper.toDomain(userData);
  }, [user, session, isLoading]);

  return {
    aggregate,
    isLoading,
  };
}

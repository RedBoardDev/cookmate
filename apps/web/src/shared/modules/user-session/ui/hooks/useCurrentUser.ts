"use client";

import { useContext } from "react";
import { UserSessionContext } from "@/shared/modules/user-session/ui/providers/UserSessionProvider";

export function useCurrentUser() {
  const context = useContext(UserSessionContext);

  if (!context) {
    throw new Error("useCurrentUser must be used within a UserSessionProvider.");
  }

  return context;
}

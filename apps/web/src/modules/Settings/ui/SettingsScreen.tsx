"use client";

import { useDevSkeleton } from "@/shared/ui/hooks/useDevSkeleton";
import { useSettings } from "../api/useSettings";
import { useProfileForm } from "./hooks/useProfileForm";
import { useChangePasswordForm } from "./hooks/useChangePasswordForm";
import { SettingsView } from "./SettingsView";

export function SettingsScreen() {
  const { aggregate, isLoading } = useSettings();
  const forceLoading = useDevSkeleton();
  const loading = isLoading || forceLoading || !aggregate;

  const {
    form: profileForm,
    isSubmitting: profileIsSubmitting,
    error: profileError,
  } = useProfileForm({
    initialData: aggregate?.profile ?? { name: "", avatar: "/avatars/avatar_1.png" },
  });

  const {
    form: passwordForm,
    isSubmitting: passwordIsSubmitting,
    error: passwordError,
  } = useChangePasswordForm();

  return (
    <SettingsView
      isDataLoading={loading}
      account={
        aggregate?.account ?? {
          email: "",
          createdAt: "",
          emailVerified: false,
        }
      }
      profileForm={profileForm}
      profileIsSubmitting={profileIsSubmitting}
      profileError={profileError}
      passwordForm={passwordForm}
      passwordIsSubmitting={passwordIsSubmitting}
      passwordError={passwordError}
    />
  );
}

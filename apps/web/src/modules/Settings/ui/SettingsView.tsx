"use client";

import type { ResponseErrorConfig } from "@/shared/lib/httpClient";
import { ProfileSection } from "./sections/ProfileSection";
import { AccountSection } from "./sections/AccountSection";
import { PasswordSection } from "./sections/PasswordSection";
import { Card } from "@/shared/ui/primitives/card";
import { cn } from "@/shared/lib/utils";
import type { useProfileForm } from "./hooks/useProfileForm";
import type { useChangePasswordForm } from "./hooks/useChangePasswordForm";

interface SettingsViewProps {
  isDataLoading?: boolean;
  account: {
    email: string;
    createdAt: string;
    emailVerified: boolean;
  };
  profileForm: ReturnType<typeof useProfileForm>["form"];
  profileIsSubmitting: boolean;
  profileError: ResponseErrorConfig<any> | null;
  passwordForm: ReturnType<typeof useChangePasswordForm>["form"];
  passwordIsSubmitting: boolean;
  passwordError: ResponseErrorConfig<any> | null;
}

export function SettingsView({
  isDataLoading = false,
  account,
  profileForm,
  profileIsSubmitting,
  profileError,
  passwordForm,
  passwordIsSubmitting,
  passwordError,
}: SettingsViewProps) {
  return (
    <div className="mx-auto w-full max-w-xl space-y-6 px-4 pb-16 pt-8 sm:px-6 md:pb-20">
      <Card
        variant="soft"
        border="soft"
        shadow="elevated"
        radius="3xl"
        padding="none"
        className={cn(
          "p-5 md:p-6 motion-safe:animate-in motion-safe:fade-in-0",
          "motion-safe:slide-in-from-bottom-2"
        )}
      >
        <div className="space-y-2">
          <h1 className="text-3xl font-display font-semibold text-foreground">
            Settings
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>
      </Card>

      <div className="space-y-6">
        <ProfileSection
          form={profileForm}
          isSubmitting={profileIsSubmitting}
          error={profileError}
          isDataLoading={isDataLoading}
        />

        <AccountSection
          email={account.email}
          createdAt={account.createdAt}
          emailVerified={account.emailVerified}
          isDataLoading={isDataLoading}
        />

        <PasswordSection
          form={passwordForm}
          isSubmitting={passwordIsSubmitting}
          error={passwordError}
        />
      </div>
    </div>
  );
}

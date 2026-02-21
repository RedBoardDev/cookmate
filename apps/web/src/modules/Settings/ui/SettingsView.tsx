"use client";

import { Trans } from "@lingui/react/macro";
import type { ApiError } from "@/shared/core/network/api-error";
import { cn } from "@/shared/core/utils/cn";
import { Card } from "@/shared/ui/primitives/card";
import type { useChangePasswordForm } from "./hooks/useChangePasswordForm";
import type { useProfileForm } from "./hooks/useProfileForm";
import { AccountSection } from "./sections/AccountSection";
import { LanguageSection } from "./sections/LanguageSection";
import { PasswordSection } from "./sections/PasswordSection";
import { ProfileSection } from "./sections/ProfileSection";

interface SettingsViewProps {
  isDataLoading?: boolean;
  account: {
    email: string;
    createdAt: string;
    emailVerified: boolean;
  };
  profileForm: ReturnType<typeof useProfileForm>["form"];
  profileIsSubmitting: boolean;
  profileError: ApiError | null;
  passwordForm: ReturnType<typeof useChangePasswordForm>["form"];
  passwordIsSubmitting: boolean;
  passwordError: ApiError | null;
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
        className={cn("p-5 md:p-6 motion-safe:animate-in motion-safe:fade-in-0", "motion-safe:slide-in-from-bottom-2")}
      >
        <div className="space-y-2">
          <h1 className="text-3xl font-display font-semibold text-foreground">
            <Trans>Settings</Trans>
          </h1>
          <p className="text-sm text-muted-foreground">
            <Trans>Manage your account settings and preferences.</Trans>
          </p>
        </div>
      </Card>

      <div className="space-y-6">
        <LanguageSection />

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

        <PasswordSection form={passwordForm} isSubmitting={passwordIsSubmitting} error={passwordError} />
      </div>
    </div>
  );
}

"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react/macro";
import { toast } from "sonner";
import { getUserFacingErrorMessage } from "@/shared/core/network/api-error";
import { useDevSkeleton } from "@/shared/ui/hooks/useDevSkeleton";
import { DEFAULT_USER_AVATAR_PATH } from "@/shared/modules/user-session/domain/services/userAvatar.service";
import { useSettings } from "../api/useSettings";
import { useChangePasswordForm } from "./hooks/useChangePasswordForm";
import { useProfileForm } from "./hooks/useProfileForm";
import { SettingsView } from "./SettingsView";

export function SettingsScreen() {
  const { t } = useLingui();
  const { aggregate, isLoading } = useSettings();
  const forceLoading = useDevSkeleton();
  const loading = isLoading || forceLoading || !aggregate;

  const {
    form: profileForm,
    isSubmitting: profileIsSubmitting,
    error: profileError,
  } = useProfileForm({
    initialData: aggregate?.profile ?? { name: "", avatar: DEFAULT_USER_AVATAR_PATH },
    onSuccess: () => {
      toast.success(t(msg`Profile updated`));
    },
    onError: (error) => {
      toast.error(getUserFacingErrorMessage(t, error));
    },
  });

  const {
    form: passwordForm,
    isSubmitting: passwordIsSubmitting,
    error: passwordError,
  } = useChangePasswordForm({
    onSuccess: () => {
      toast.success(t(msg`Password changed`));
    },
    onError: (error) => {
      toast.error(getUserFacingErrorMessage(t, error));
    },
  });

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

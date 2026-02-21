"use client";

import { Trans, useLingui } from "@lingui/react/macro";
import { Eye, EyeOff, Loader2, Lock } from "lucide-react";
import { useState } from "react";
import type { ApiError } from "@/shared/core/network/api-error";
import { ErrorMessage } from "@/shared/ui/form/ErrorMessage";
import { FieldErrorHint } from "@/shared/ui/form/FieldErrorHint";
import { Button } from "@/shared/ui/primitives/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/primitives/card";
import { Form } from "@/shared/ui/primitives/form";
import { Input } from "@/shared/ui/primitives/input";
import { Label } from "@/shared/ui/primitives/label";
import type { useChangePasswordForm } from "../hooks/useChangePasswordForm";

interface PasswordSectionProps {
  form: ReturnType<typeof useChangePasswordForm>["form"];
  isSubmitting: boolean;
  error: ApiError | null;
}

export function PasswordSection({ form, isSubmitting, error }: PasswordSectionProps) {
  const { t } = useLingui();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const hasChanges = form.state.isDirty;

  return (
    <Card variant="soft" border="soft" shadow="flat" radius="3xl">
      <CardHeader>
        <CardTitle className="text-xl font-display">
          <Trans>Password</Trans>
        </CardTitle>
        <CardDescription>
          <Trans>Change your password to keep your account secure.</Trans>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form form={form} className="space-y-4">
          <form.Field name="currentPassword">
            {(field) => (
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5">
                  <Label htmlFor={field.name} className="text-sm font-medium text-foreground">
                    <Trans>Current password</Trans>
                  </Label>
                  <FieldErrorHint field={field} />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id={field.name}
                    type={showCurrentPassword ? "text" : "password"}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder={t`Enter current password`}
                    disabled={isSubmitting}
                    className="pl-9 pr-9"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    aria-label={showCurrentPassword ? t`Hide current password` : t`Show current password`}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                  >
                    {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            )}
          </form.Field>

          <form.Field name="newPassword">
            {(field) => (
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5">
                  <Label htmlFor={field.name} className="text-sm font-medium text-foreground">
                    <Trans>New password</Trans>
                  </Label>
                  <FieldErrorHint field={field} />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id={field.name}
                    type={showNewPassword ? "text" : "password"}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder={t`Enter new password`}
                    disabled={isSubmitting}
                    className="pl-9 pr-9"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    aria-label={showNewPassword ? t`Hide new password` : t`Show new password`}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                  >
                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            )}
          </form.Field>

          <form.Field name="confirmPassword">
            {(field) => (
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5">
                  <Label htmlFor={field.name} className="text-sm font-medium text-foreground">
                    <Trans>Confirm new password</Trans>
                  </Label>
                  <FieldErrorHint field={field} />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id={field.name}
                    type={showConfirmPassword ? "text" : "password"}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder={t`Confirm new password`}
                    disabled={isSubmitting}
                    className="pl-9 pr-9"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={showConfirmPassword ? t`Hide confirm password` : t`Show confirm password`}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            )}
          </form.Field>

          <form.Field name="revokeOtherSessions">
            {(field) => (
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={field.name}
                  checked={field.state.value}
                  onChange={(e) => field.handleChange(e.target.checked)}
                  disabled={isSubmitting}
                  className="h-4 w-4 rounded border border-border/70 text-primary focus:ring-2 focus:ring-primary/40"
                />
                <Label htmlFor={field.name} className="text-sm text-muted-foreground cursor-pointer">
                  <Trans>Revoke all other sessions</Trans>
                </Label>
              </div>
            )}
          </form.Field>

          <ErrorMessage error={error} />

          {hasChanges && (
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
                disabled={isSubmitting}
                className="rounded-full"
              >
                <Trans>Cancel</Trans>
              </Button>
              <Button type="submit" disabled={isSubmitting || !hasChanges} className="rounded-full">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t`Changing...`}
                  </>
                ) : (
                  t`Change password`
                )}
              </Button>
            </div>
          )}
        </Form>
      </CardContent>
    </Card>
  );
}

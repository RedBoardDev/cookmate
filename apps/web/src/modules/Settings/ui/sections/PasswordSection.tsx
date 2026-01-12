"use client";

import { useState } from "react";
import { Button } from "@/shared/ui/primitives/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/primitives/card";
import { Input } from "@/shared/ui/primitives/input";
import { Label } from "@/shared/ui/primitives/label";
import { Form } from "@/shared/ui/primitives/form";
import { FieldError } from "@/shared/ui/form/FieldError";
import { ErrorMessage } from "@/shared/ui/form/ErrorMessage";
import type { ResponseErrorConfig } from "@/shared/lib/httpClient";
import { Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import type { useChangePasswordForm } from "../hooks/useChangePasswordForm";

interface PasswordSectionProps {
  form: ReturnType<typeof useChangePasswordForm>["form"];
  isSubmitting: boolean;
  error: ResponseErrorConfig<any> | null;
}

export function PasswordSection({
  form,
  isSubmitting,
  error,
}: PasswordSectionProps) {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const hasChanges = form.state.isDirty;

  return (
    <Card className="border-border/70 bg-card/95 shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-display">Password</CardTitle>
        <CardDescription>
          Change your password to keep your account secure.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form form={form} className="space-y-4">
          <form.Field name="currentPassword">
            {(field) => (
              <div className="space-y-2">
                <Label
                  htmlFor={field.name}
                  className="text-sm font-medium text-foreground"
                >
                  Current password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id={field.name}
                    type={showCurrentPassword ? "text" : "password"}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="Enter current password"
                    disabled={isSubmitting}
                    className="pl-9 pr-9"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <FieldError field={field} />
              </div>
            )}
          </form.Field>

          <form.Field name="newPassword">
            {(field) => (
              <div className="space-y-2">
                <Label
                  htmlFor={field.name}
                  className="text-sm font-medium text-foreground"
                >
                  New password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id={field.name}
                    type={showNewPassword ? "text" : "password"}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="Enter new password"
                    disabled={isSubmitting}
                    className="pl-9 pr-9"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <FieldError field={field} />
              </div>
            )}
          </form.Field>

          <form.Field name="confirmPassword">
            {(field) => (
              <div className="space-y-2">
                <Label
                  htmlFor={field.name}
                  className="text-sm font-medium text-foreground"
                >
                  Confirm new password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id={field.name}
                    type={showConfirmPassword ? "text" : "password"}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="Confirm new password"
                    disabled={isSubmitting}
                    className="pl-9 pr-9"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <FieldError field={field} />
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
                <Label
                  htmlFor={field.name}
                  className="text-sm text-muted-foreground cursor-pointer"
                >
                  Revoke all other sessions
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
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting || !hasChanges}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Changing...
                  </>
                ) : (
                  "Change password"
                )}
              </Button>
            </div>
          )}
        </Form>
      </CardContent>
    </Card>
  );
}

"use client";

import { Button } from "@heroui/react";
import { Trans, useLingui } from "@lingui/react/macro";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { ErrorMessage } from "@/shared/ui/form/ErrorMessage";
import { FieldError } from "@/shared/ui/form/FieldError";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/primitives/card";
import { Form } from "@/shared/ui/primitives/form";
import { Input } from "@/shared/ui/primitives/input";
import { useLoginForm } from "./useLoginForm";

type LoginViewProps = {
  redirectTo?: string;
};

export function LoginView({ redirectTo = "/recipes" }: LoginViewProps) {
  const router = useRouter();
  const { t } = useLingui();

  const { form, isSubmitting, error } = useLoginForm({
    onSuccess: () => router.replace(redirectTo),
  });

  return (
    <section className="w-full max-w-sm">
      <Card variant="soft" border="soft" shadow="flat" radius="3xl">
        <CardHeader>
          <CardTitle>
            <Trans>Welcome back</Trans>
          </CardTitle>
          <CardDescription>
            <Trans>Sign in to access your recipes and planners.</Trans>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form form={form} className="space-y-4">
            {/* Email Field */}
            <form.Field name="email">
              {(field) => (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground" htmlFor={field.name}>
                    <Trans>Email</Trans>
                  </label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="email"
                    autoComplete="email"
                    placeholder="you@email.com"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    disabled={isSubmitting}
                  />
                  <FieldError field={field} />
                </div>
              )}
            </form.Field>

            {/* Password Field */}
            <form.Field name="password">
              {(field) => (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground" htmlFor={field.name}>
                    <Trans>Password</Trans>
                  </label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="password"
                    autoComplete="current-password"
                    placeholder={t`Your password`}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    disabled={isSubmitting}
                  />
                  <FieldError field={field} />
                </div>
              )}
            </form.Field>

            {/* Remember Me Checkbox */}
            <form.Field name="rememberMe">
              {(field) => (
                <label className="flex items-center gap-2 text-sm text-muted-foreground">
                  <input
                    type="checkbox"
                    checked={field.state.value}
                    onChange={(e) => field.handleChange(e.target.checked)}
                    onBlur={field.handleBlur}
                    disabled={isSubmitting}
                    className="h-4 w-4 rounded border border-border/70 text-primary focus:ring-2 focus:ring-primary/40"
                  />
                  <Trans>Remember me</Trans>
                </label>
              )}
            </form.Field>

            <ErrorMessage error={error} />

            <Button className="w-full" type="submit" isDisabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {t`Signing in...`}
                </>
              ) : (
                t`Sign in`
              )}
            </Button>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Card, Button, Input } from "@heroui/react";
import { Form } from "@/shared/ui/primitives/form";
import { FieldError } from "@/shared/ui/form/FieldError";
import { ErrorMessage } from "@/shared/ui/form/ErrorMessage";
import { useLoginForm } from "./useLoginForm";

type LoginViewProps = {
  redirectTo?: string;
};

export function LoginView({ redirectTo = "/recipes" }: LoginViewProps) {
  const router = useRouter();

  const { form, isSubmitting, error } = useLoginForm({
    onSuccess: () => router.replace(redirectTo),
  });

  return (
    <section className="w-full max-w-sm">
      <Card>
        <Card.Header>
          <Card.Title>Welcome back</Card.Title>
          <Card.Description>
            Sign in to access your recipes and planners.
          </Card.Description>
        </Card.Header>

        <Card.Content>
          <Form form={form} className="space-y-4">
            {/* Email Field */}
            <form.Field name="email">
              {(field) => (
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium text-foreground"
                    htmlFor={field.name}
                  >
                    Email
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
                  <label
                    className="text-sm font-medium text-foreground"
                    htmlFor={field.name}
                  >
                    Password
                  </label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="password"
                    autoComplete="current-password"
                    placeholder="Your password"
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
                  Remember me
                </label>
              )}
            </form.Field>

            <ErrorMessage error={error} />

            <Button
              className="w-full"
              type="submit"
              isDisabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </Form>
        </Card.Content>
      </Card>
    </section>
  );
}

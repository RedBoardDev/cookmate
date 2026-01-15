"use client";

import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import Image from "next/image";
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
import { cn } from "@/shared/lib/utils";
import { Loader2 } from "lucide-react";
import type { ResponseErrorConfig } from "@/shared/lib/httpClient";
import type { useProfileForm } from "../hooks/useProfileForm";

interface ProfileSectionProps {
  form: ReturnType<typeof useProfileForm>["form"];
  isSubmitting: boolean;
  error: ResponseErrorConfig<any> | null;
  isDataLoading?: boolean;
}

const AVATAR_OPTIONS: Array<{ id: number; path: string }> = Array.from(
  { length: 9 },
  (_, i) => ({
    id: i + 1,
    path: `/avatars/avatar_${i + 1}.png`,
  })
);

function getAvatarSrc(avatarUrl: string): string {
  if (!avatarUrl) {
    return "/avatars/avatar_1.png";
  }

  try {
    new URL(avatarUrl);
    return avatarUrl;
  } catch {
    if (avatarUrl.startsWith("/")) {
      return avatarUrl;
    }
    return "/avatars/avatar_1.png";
  }
}

export function ProfileSection({
  form,
  isSubmitting,
  error,
  isDataLoading = false,
}: ProfileSectionProps) {
  const [avatarError, setAvatarError] = useState(false);
  const isDisabled = isSubmitting || isDataLoading;

  return (
    <Card variant="soft" border="soft" shadow="flat" radius="3xl">
      <CardHeader>
        <CardTitle className="text-xl font-display">Profile</CardTitle>
        <CardDescription>
          Update your profile information and avatar.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form form={form} className="space-y-6">
          <form.Subscribe
            selector={(state) => ({
              values: state.values,
              isDirty: state.isDirty,
            })}
          >
            {({ values, isDirty }) => {
              const nameValue = values.name ?? "";
              const avatarFallback =
                nameValue.trim().charAt(0).toUpperCase() || "?";

              return (
                <>
                  <form.Field name="avatar">
                    {(avatarField) => {
                      const avatarValue = avatarField.state.value ?? "";
                      const avatarSrc = getAvatarSrc(avatarValue);

                      return (
                        <div className="space-y-3">
                          <Label className="text-sm font-medium text-foreground">
                            Avatar
                          </Label>
                          <div className="flex items-center gap-4">
                            {isDataLoading ? (
                              <Skeleton circle width={64} height={64} />
                            ) : (
                              <div className="relative h-16 w-16 rounded-full border-2 border-border/60 bg-muted/70 shadow-sm overflow-hidden">
                                {avatarError ? (
                                  <div className="flex h-full w-full items-center justify-center bg-secondary text-secondary-foreground text-lg font-medium">
                                    {avatarFallback}
                                  </div>
                                ) : (
                                  <Image
                                    src={avatarSrc}
                                    alt="Profile avatar"
                                    width={64}
                                    height={64}
                                    className="h-full w-full object-cover"
                                    onError={() => setAvatarError(true)}
                                  />
                                )}
                              </div>
                            )}
                            <div className="flex-1">
                              <div className="grid grid-cols-5 gap-2 sm:grid-cols-9">
                                {AVATAR_OPTIONS.map((option) => {
                                  const isSelected = avatarValue === option.path;
                                  return (
                                    <button
                                      key={option.id}
                                      type="button"
                                      aria-pressed={isSelected}
                                      onClick={() => {
                                        setAvatarError(false);
                                        avatarField.handleChange(option.path);
                                      }}
                                      disabled={isDisabled}
                                      className={cn(
                                        "relative h-10 w-10 rounded-full border-2 transition-all",
                                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                                        "motion-safe:hover:scale-110",
                                        "bg-background/80 shadow-sm",
                                        isSelected
                                          ? "border-primary ring-2 ring-primary/20"
                                          : "border-border/60 hover:border-primary/60",
                                        isDisabled && "opacity-50 cursor-not-allowed"
                                      )}
                                    >
                                      <Image
                                        src={option.path}
                                        alt={`Avatar ${option.id}`}
                                        width={40}
                                        height={40}
                                        className="h-full w-full rounded-full object-cover"
                                      />
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    }}
                  </form.Field>

                  <form.Field name="name">
                    {(field) => (
                      <div className="space-y-2">
                        <Label
                          htmlFor={field.name}
                          className="text-sm font-medium text-foreground"
                        >
                          Name
                        </Label>
                        {isDataLoading ? (
                          <Skeleton height={40} />
                        ) : (
                          <Input
                            id={field.name}
                            type="text"
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            onBlur={field.handleBlur}
                            placeholder="Your name"
                            disabled={isDisabled}
                            className="w-full"
                          />
                        )}
                        <FieldError field={field} />
                      </div>
                    )}
                  </form.Field>

                  <ErrorMessage error={error} />

                  {isDirty && (
                    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => form.reset()}
                        disabled={isDisabled}
                        className="rounded-full"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={isDisabled || !isDirty}
                        className="rounded-full"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          "Save changes"
                        )}
                      </Button>
                    </div>
                  )}
                </>
              );
            }}
          </form.Subscribe>
        </Form>
      </CardContent>
    </Card>
  );
}

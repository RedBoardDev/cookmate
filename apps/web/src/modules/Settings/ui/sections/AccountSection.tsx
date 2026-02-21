"use client";

import { Trans, useLingui } from "@lingui/react/macro";
import { Calendar, CheckCircle2, Mail } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import { Badge } from "@/shared/ui/primitives/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/primitives/card";
import { Input } from "@/shared/ui/primitives/input";
import { Label } from "@/shared/ui/primitives/label";

interface AccountSectionProps {
  email: string;
  createdAt: string;
  emailVerified: boolean;
  isDataLoading?: boolean;
}

function formatDate(dateString: string, locale?: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat(locale ?? undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export function AccountSection({ email, createdAt, emailVerified, isDataLoading = false }: AccountSectionProps) {
  const { i18n } = useLingui();
  const formattedDate = createdAt ? formatDate(createdAt, i18n.locale) : "";

  return (
    <Card variant="soft" border="soft" shadow="flat" radius="3xl">
      <CardHeader>
        <CardTitle className="text-xl font-display">
          <Trans>Account</Trans>
        </CardTitle>
        <CardDescription>
          <Trans>Your account information and settings.</Trans>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-foreground">
            <Trans>Email</Trans>
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            {isDataLoading ? (
              <div className="pl-9">
                <Skeleton height={36} />
              </div>
            ) : (
              <Input id="email" type="email" value={email} disabled className="pl-9 cursor-not-allowed" />
            )}
          </div>
          {!isDataLoading &&
            (emailVerified ? (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <CheckCircle2 className="h-3 w-3 text-primary" />
                <span>
                  <Trans>Email verified</Trans>
                </span>
              </div>
            ) : (
              <Badge variant="secondary" className="text-xs">
                <Trans>Email not verified</Trans>
              </Badge>
            ))}
        </div>

        <div className="space-y-2">
          <Label htmlFor="createdAt" className="text-sm font-medium text-foreground">
            <Trans>Member since</Trans>
          </Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            {isDataLoading ? (
              <div className="pl-9">
                <Skeleton height={36} />
              </div>
            ) : (
              <Input id="createdAt" type="text" value={formattedDate} disabled className="pl-9 cursor-not-allowed" />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

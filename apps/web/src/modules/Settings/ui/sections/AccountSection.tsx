"use client";

import Skeleton from "react-loading-skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/primitives/card";
import { Input } from "@/shared/ui/primitives/input";
import { Label } from "@/shared/ui/primitives/label";
import { Badge } from "@/shared/ui/primitives/badge";
import { Mail, Calendar, CheckCircle2 } from "lucide-react";

interface AccountSectionProps {
  email: string;
  createdAt: string;
  emailVerified: boolean;
  isDataLoading?: boolean;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export function AccountSection({
  email,
  createdAt,
  emailVerified,
  isDataLoading = false,
}: AccountSectionProps) {
  const formattedDate = createdAt ? formatDate(createdAt) : "";

  return (
    <Card className="border-border/70 bg-card/95 shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-display">Account</CardTitle>
        <CardDescription>
          Your account information and settings.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-foreground">
            Email
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            {isDataLoading ? (
              <div className="pl-9">
                <Skeleton height={36} />
              </div>
            ) : (
              <Input
                id="email"
                type="email"
                value={email}
                disabled
                className="pl-9 bg-muted/50 cursor-not-allowed"
              />
            )}
          </div>
          {!isDataLoading &&
            (emailVerified ? (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <CheckCircle2 className="h-3 w-3 text-primary" />
                <span>Email verified</span>
              </div>
            ) : (
              <Badge variant="secondary" className="text-xs">
                Email not verified
              </Badge>
            ))}
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="createdAt"
            className="text-sm font-medium text-foreground"
          >
            Member since
          </Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            {isDataLoading ? (
              <div className="pl-9">
                <Skeleton height={36} />
              </div>
            ) : (
              <Input
                id="createdAt"
                type="text"
                value={formattedDate}
                disabled
                className="pl-9 bg-muted/50 cursor-not-allowed"
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

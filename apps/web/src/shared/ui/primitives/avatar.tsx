"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { cn } from "@/shared/lib/utils";

interface AvatarProps {
  avatar?: string | null;
  name?: string | null;
  size?: "sm" | "md" | "lg";
  className?: string;
}

function getAvatarSrc(avatarUrl: string | null | undefined): string {
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
    // * If avatar is just a name like "avatar_1", prepend the path
    if (avatarUrl.startsWith("avatar_")) {
      return `/avatars/${avatarUrl}.png`;
    }
    return "/avatars/avatar_1.png";
  }
}

const sizeClasses = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
};

export function Avatar({ avatar, name, size = "md", className }: AvatarProps) {
  const [avatarError, setAvatarError] = useState(false);

  const avatarFallback = useMemo(() => {
    if (!name) return "?";
    return name.trim().charAt(0).toUpperCase();
  }, [name]);

  const avatarSrc = useMemo(() => getAvatarSrc(avatar), [avatar]);
  const sizeClass = sizeClasses[size];

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full",
        "border border-border/60 bg-muted/70 overflow-hidden",
        sizeClass,
        className,
      )}
    >
      {avatarError ? (
        <span className="font-medium text-secondary-foreground">{avatarFallback}</span>
      ) : (
        <Image
          src={avatarSrc}
          alt={name ?? "Avatar"}
          width={size === "sm" ? 32 : size === "md" ? 40 : 48}
          height={size === "sm" ? 32 : size === "md" ? 40 : 48}
          className="h-full w-full object-cover"
          onError={() => setAvatarError(true)}
        />
      )}
    </div>
  );
}

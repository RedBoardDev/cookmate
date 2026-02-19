import type { HTMLAttributes } from "react";
import { cn } from "@/shared/core/utils/cn";

export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div aria-hidden="true" className={cn("animate-pulse rounded-md bg-muted/60", className)} {...props} />;
}

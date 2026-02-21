import type { ReactNode } from "react";
import { cn } from "@/shared/core/utils/cn";
import { Card, CardContent } from "@/shared/ui/primitives/card";
import { Skeleton } from "@/shared/ui/primitives/skeleton";

interface EditorSectionCardProps {
  title?: ReactNode;
  description?: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  disabled?: boolean;
}

export function EditorSectionCard({
  title,
  description,
  children,
  className,
  contentClassName,
  disabled = false,
}: EditorSectionCardProps) {
  return (
    <Card
      variant="soft"
      border="soft"
      shadow="subtle"
      radius="xl"
      padding="none"
      className={cn("overflow-hidden", disabled && "relative", className)}
    >
      <CardContent className={cn("space-y-3 p-4", contentClassName)}>
        {title ? (
          <div className="space-y-1">
            <h2 className="text-sm font-semibold text-foreground">{title}</h2>
            {description ? <p className="text-xs text-muted-foreground">{description}</p> : null}
          </div>
        ) : null}

        {disabled ? (
          <div className="space-y-3">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-3/4" />
          </div>
        ) : (
          children
        )}
      </CardContent>

      {disabled ? (
        <div className={cn("absolute inset-0 bg-background/50 backdrop-blur-[1px]", "pointer-events-none")} />
      ) : null}
    </Card>
  );
}

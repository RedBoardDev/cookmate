import * as React from "react";

import { cn } from "@/shared/core/utils/cn";

type InputVariant = "default" | "search";

type InputProps = React.ComponentProps<"input"> & {
  variant?: InputVariant;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  containerClassName?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant = "default", prefix, suffix, containerClassName, disabled, ...props }, ref) => {
    const resolvedType = type ?? (variant === "search" ? "search" : undefined);
    const hasAffix = prefix != null || suffix != null;
    const isNumber = resolvedType === "number";

    if (!hasAffix) {
      return (
        <input
          type={resolvedType}
          className={cn("input", className)}
          ref={ref}
          disabled={disabled}
          {...props}
        />
      );
    }

    return (
      <div
        className={cn(
          "flex h-10 w-full items-center overflow-hidden rounded-md border border-input bg-white shadow-sm",
          "focus-within:outline-none focus-within:ring-1 focus-within:ring-ring",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "text-base md:text-sm",
          containerClassName,
        )}
      >
        {prefix ? (
          <span className="shrink-0 pl-3 text-sm text-muted-foreground" aria-hidden>
            {prefix}
          </span>
        ) : null}
        <input
          ref={ref}
          type={resolvedType}
          disabled={disabled}
          className={cn(
            "min-w-0 flex-1 border-0 bg-transparent px-3 py-2 outline-none placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0",
            "disabled:cursor-not-allowed disabled:opacity-50",
            prefix && "pl-1.5",
            suffix && "pr-1.5",
            isNumber &&
              "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
            className,
          )}
          {...props}
        />
        {suffix ? (
          <span className="shrink-0 pr-3 text-sm text-muted-foreground" aria-hidden>
            {suffix}
          </span>
        ) : null}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };

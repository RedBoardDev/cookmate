import * as React from "react";

import { cn } from "@/shared/core/utils/cn";

type InputVariant = "default" | "search";

type InputProps = React.ComponentProps<"input"> & {
  variant?: InputVariant;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant = "default", ...props }, ref) => {
    const resolvedType = type ?? (variant === "search" ? "search" : undefined);

    return <input type={resolvedType} className={cn("input", className)} ref={ref} {...props} />;
  },
);
Input.displayName = "Input";

export { Input };

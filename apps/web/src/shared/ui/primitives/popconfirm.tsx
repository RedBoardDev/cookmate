"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Button } from "@/shared/ui/primitives/button";
import { cn } from "@/shared/lib/utils";

interface PopConfirmProps {
  title: string;
  description?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "destructive" | "default";
  children: React.ReactElement;
}

/**
 * PopConfirm - A reusable confirmation popover component
 *
 * Displays a confirmation dialog in a popover when triggered.
 * Similar to Ant Design's Popconfirm component.
 *
 * @example
 * ```tsx
 * <PopConfirm
 *   title="Delete this item?"
 *   description="This action cannot be undone."
 *   onConfirm={() => handleDelete()}
 *   variant="destructive"
 * >
 *   <Button variant="destructive">Delete</Button>
 * </PopConfirm>
 * ```
 */
export function PopConfirm({
  title,
  description,
  onConfirm,
  onCancel,
  open,
  onOpenChange,
  disabled = false,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "default",
  children
}: PopConfirmProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;

  const handleOpenChange = (newOpen: boolean) => {
    if (isControlled) {
      onOpenChange?.(newOpen);
    } else {
      setInternalOpen(newOpen);
    }
  };

  const handleConfirm = () => {
    onConfirm();
    handleOpenChange(false);
  };

  const handleCancel = () => {
    onCancel?.();
    handleOpenChange(false);
  };

  return (
    <PopoverPrimitive.Root
      open={isOpen}
      onOpenChange={handleOpenChange}
    >
      <PopoverPrimitive.Trigger asChild>
        {children}
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="end"
          sideOffset={4}
          className={cn(
            "z-50 min-w-[200px] max-w-[280px] rounded-lg border border-border/70 bg-card/95 p-3 shadow-lg",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
            "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
          )}
        >
          <p className="text-sm font-medium text-foreground">
            {title}
          </p>
          {description && (
            <p className="mt-1 text-xs text-muted-foreground">
              {description}
            </p>
          )}
          <div className="mt-3 flex gap-2 justify-end">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-7 px-3 text-xs"
              onClick={handleCancel}
              disabled={disabled}
            >
              {cancelLabel}
            </Button>
            <Button
              type="button"
              variant={variant}
              size="sm"
              className="h-7 px-3 text-xs"
              onClick={handleConfirm}
              disabled={disabled}
            >
              {confirmLabel}
            </Button>
          </div>
          <PopoverPrimitive.Arrow className="fill-border/70" />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}

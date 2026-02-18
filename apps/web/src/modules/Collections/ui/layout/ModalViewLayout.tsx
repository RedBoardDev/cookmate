"use client";

import { Trans } from "@lingui/react/macro";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/shared/ui/primitives/button";
import { DialogDescription, DialogHeader, DialogTitle } from "@/shared/ui/primitives/dialog";

interface ModalViewLayoutProps {
  title: string;
  description: string;
  onBack: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

export function ModalViewLayout({ title, description, onBack, children, disabled = false }: ModalViewLayoutProps) {
  return (
    <div className="flex flex-1 flex-col gap-4 overflow-hidden p-6">
      <DialogHeader className="text-left">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack} className="h-8 w-8 rounded-full" disabled={disabled}>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">
              <Trans>Back</Trans>
            </span>
          </Button>
          <div>
            <DialogTitle className="text-xl font-display tracking-tight">{title}</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">{description}</DialogDescription>
          </div>
        </div>
      </DialogHeader>
      <div className="flex-1 overflow-y-auto pb-2">{children}</div>
    </div>
  );
}

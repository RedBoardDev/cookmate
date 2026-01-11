"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/shared/ui/primitives/button";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/shared/ui/primitives/dialog";

interface ModalViewLayoutProps {
  title: React.ReactNode;
  description: string;
  onBack: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

export function ModalViewLayout({
  title,
  description,
  onBack,
  children,
  disabled = false
}: ModalViewLayoutProps) {
  return (
    <div className="flex flex-1 flex-col overflow-hidden p-6">
      <DialogHeader>
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="h-8 w-8"
            disabled={disabled}
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
          <div>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </div>
        </div>
      </DialogHeader>
      <div className="flex-1 overflow-y-auto mt-4 pb-2">
        {children}
      </div>
    </div>
  );
}

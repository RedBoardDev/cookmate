"use client";

import { useRef, useState, useCallback } from "react";
import { useLingui } from "@lingui/react/macro";
import { Camera, Clipboard, X } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/primitives/button";

interface UnifiedInputProps {
  value: string;
  file: File | null;
  onChange: (value: string) => void;
  onFileChange: (file: File | null) => void;
  disabled?: boolean;
}

export function UnifiedInput({
  value,
  file,
  onChange,
  onFileChange,
  disabled = false
}: UnifiedInputProps) {
  const { t } = useLingui();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragOver(true);
    }
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);

      if (disabled) return;

      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile?.type.startsWith("image/")) {
        onFileChange(droppedFile);
        onChange("");
      }
    },
    [disabled, onChange, onFileChange]
  );

  const handlePaste = useCallback(
    async (e: React.ClipboardEvent) => {
      if (disabled) return;

      const items = e.clipboardData?.items;
      if (!items) return;

      const itemsArray = Array.from(items);
      for (const item of itemsArray) {
        if (item.type.startsWith("image/")) {
          e.preventDefault();
          const pastedFile = item.getAsFile();
          if (pastedFile) {
            onFileChange(pastedFile);
            onChange("");
          }
          return;
        }
      }
    },
    [disabled, onChange, onFileChange]
  );

  const handleClipboardClick = useCallback(async () => {
    if (disabled) return;

    try {
      const clipboardItems = await navigator.clipboard.read();
      for (const item of clipboardItems) {
        const imageType = item.types.find((type) => type.startsWith("image/"));
        if (imageType) {
          const blob = await item.getType(imageType);
          const pastedFile = new File([blob], "pasted-image.png", {
            type: imageType
          });
          onFileChange(pastedFile);
          onChange("");
          return;
        }

        if (item.types.includes("text/plain")) {
          const textBlob = await item.getType("text/plain");
          const text = await textBlob.text();
          onChange(text);
          onFileChange(null);
          return;
        }
      }
    } catch {
      // * Fallback: focus textarea for manual paste
      textareaRef.current?.focus();
    }
  }, [disabled, onChange, onFileChange]);

  const handleCameraClick = useCallback(() => {
    if (disabled) return;
    fileInputRef.current?.click();
  }, [disabled]);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (selectedFile?.type.startsWith("image/")) {
        onFileChange(selectedFile);
        onChange("");
      }
      e.target.value = "";
    },
    [onChange, onFileChange]
  );

  const handleClearFile = useCallback(() => {
    onFileChange(null);
  }, [onFileChange]);

  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e.target.value);
      if (file) {
        onFileChange(null);
      }
    },
    [file, onChange, onFileChange]
  );

  return (
    <div
      className={cn(
        "relative rounded-2xl border-2 border-dashed transition-all",
        "bg-card/40",
        isDragOver
          ? "border-primary/60 bg-primary/5"
          : "border-border/60 hover:border-border",
        disabled && "pointer-events-none opacity-60"
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {file ? (
        <div className="relative flex min-h-[200px] items-center justify-center p-4">
          <div className="relative">
            <img
              src={URL.createObjectURL(file)}
              alt={t`Selected image`}
              className="max-h-[180px] rounded-xl object-contain shadow-sm"
            />
            <Button
              type="button"
              size="icon"
              variant="secondary"
              className="absolute -right-2 -top-2 h-7 w-7 rounded-full shadow-md"
              onClick={handleClearFile}
              aria-label={t`Remove image`}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleTextChange}
          onPaste={handlePaste}
          disabled={disabled}
          placeholder={t`Paste a link, text, or drop an image...`}
          className={cn(
            "min-h-[200px] w-full resize-none bg-transparent px-5 py-5 text-base",
            "placeholder:text-muted-foreground/70",
            "focus:outline-none",
            "md:min-h-[240px]"
          )}
        />
      )}

      <div className="absolute bottom-4 right-4 flex gap-2">
        <Button
          type="button"
          size="icon"
          variant="secondary"
          className={cn(
            "h-10 w-10 rounded-full shadow-sm",
            "bg-muted/80 hover:bg-muted"
          )}
          onClick={handleCameraClick}
          disabled={disabled}
          aria-label={t`Upload image`}
        >
          <Camera className="h-5 w-5 text-muted-foreground" strokeWidth={1.5} />
        </Button>
        <Button
          type="button"
          size="icon"
          variant="secondary"
          className={cn(
            "h-10 w-10 rounded-full shadow-sm",
            "bg-muted/80 hover:bg-muted"
          )}
          onClick={handleClipboardClick}
          disabled={disabled}
          aria-label={t`Paste from clipboard`}
        >
          <Clipboard
            className="h-5 w-5 text-muted-foreground"
            strokeWidth={1.5}
          />
        </Button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileSelect}
        aria-label={t`Select image file`}
      />
    </div>
  );
}

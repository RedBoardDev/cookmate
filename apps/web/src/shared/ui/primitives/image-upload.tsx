"use client";

import { Trans, useLingui } from "@lingui/react/macro";
import { cva, type VariantProps } from "class-variance-authority";
import { ImagePlus, UploadCloud, X } from "lucide-react";
import Image from "next/image";
import * as React from "react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { cn } from "@/shared/core/utils/cn";
import { Button } from "@/shared/ui/primitives/button";

export interface ImageUploadItem {
  file: File;
  url: string;
}

const containerVariants = cva("relative w-full", {
  variants: {
    listType: {
      grid: "flex flex-wrap items-center gap-3",
      list: "flex flex-col gap-3",
    },
  },
  defaultVariants: { listType: "grid" },
});

const dropZoneVariants = cva(
  "group relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed transition-all duration-200 ease-in-out focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
  {
    variants: {
      size: {
        sm: "h-16 w-16",
        md: "h-24 w-24",
        lg: "h-32 w-32",
        full: "h-32 w-full", // Utile pour le listType="list"
      },
      isDragging: {
        true: "border-primary bg-primary/5 text-primary scale-[1.02]",
        false: "border-border/60 bg-muted/30 text-muted-foreground hover:border-primary/50 hover:bg-muted/50",
      },
    },
    defaultVariants: {
      size: "md",
      isDragging: false,
    },
  },
);

export interface ImageUploadProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof containerVariants> {
  maxCount?: number;
  value?: File[];
  onChange?: (files: File[]) => void;
  accept?: string;
  disabled?: boolean;
  listType?: "grid" | "list";
  size?: "sm" | "md" | "lg" | "full";
  id?: string;
  ariaLabelAdd?: string;
  ariaLabelRemove?: string;
}

const ImageUpload = React.forwardRef<HTMLDivElement, ImageUploadProps>(
  (
    {
      className,
      maxCount = 1,
      value,
      onChange,
      accept = "image/jpeg, image/png, image/webp, image/gif",
      disabled = false,
      listType = "grid",
      size = "md",
      id,
      ariaLabelAdd,
      ariaLabelRemove,
      ...rest
    },
    ref,
  ) => {
    const { t } = useLingui();
    const resolvedAriaLabelAdd = ariaLabelAdd ?? t`Add image`;
    const resolvedAriaLabelRemove = ariaLabelRemove ?? t`Remove image`;

    // --- State Management ---
    const isControlled = value !== undefined;
    const [internalFiles, setInternalFiles] = useState<File[]>([]);
    const files = isControlled ? value : internalFiles;

    const [previews, setPreviews] = useState<ImageUploadItem[]>([]);
    const previewsRef = useRef<ImageUploadItem[]>([]);
    const generatedId = useId();
    const inputId = id ?? `image-upload-${generatedId}`;
    const [isDragging, setIsDragging] = useState(false);

    // --- Synchronisation Files <-> Previews (Evite les memory leaks et le flickering) ---
    useEffect(() => {
      if (!files) return;

      const newPreviews = files.map((file) => {
        // Si le fichier existe déjà dans les previews, on garde l'URL pour éviter le flickering
        const existing = previewsRef.current.find((p) => p.file === file);
        if (existing) return existing;

        return { file, url: URL.createObjectURL(file) };
      });

      setPreviews(newPreviews);

      // Cleanup des URLs qui ne sont plus utilisées
      const currentUrls = new Set(newPreviews.map((p) => p.url));
      for (const p of previewsRef.current) {
        if (!currentUrls.has(p.url)) URL.revokeObjectURL(p.url);
      }

      previewsRef.current = newPreviews;
    }, [files]);

    // Cleanup global au démontage
    useEffect(() => {
      return () => {
        for (const p of previewsRef.current) {
          URL.revokeObjectURL(p.url);
        }
      };
    }, []);

    // --- Handlers ---
    const updateFiles = useCallback(
      (newFiles: File[]) => {
        if (!isControlled) setInternalFiles(newFiles);
        onChange?.(newFiles);
      },
      [isControlled, onChange],
    );

    const handleFilesAdded = useCallback(
      (fileList: FileList | null) => {
        if (!fileList?.length || disabled) return;

        const imageFiles = Array.from(fileList).filter((f) => f.type.startsWith("image/"));
        if (!imageFiles.length) return;

        const nextFiles = [...(files || [])];
        for (const file of imageFiles) {
          if (nextFiles.length >= maxCount) break;
          // Optionnel : Ajouter une vérification de taille de fichier ici
          nextFiles.push(file);
        }

        updateFiles(nextFiles);
      },
      [files, maxCount, updateFiles, disabled],
    );

    const removeFile = useCallback(
      (indexToRemove: number) => {
        if (disabled) return;
        const nextFiles = (files || []).filter((_, i) => i !== indexToRemove);
        updateFiles(nextFiles);
      },
      [files, updateFiles, disabled],
    );

    const onDrop = useCallback(
      (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        handleFilesAdded(e.dataTransfer.files);
      },
      [handleFilesAdded],
    );

    const onDragOver = useCallback(
      (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!disabled) setIsDragging(true);
      },
      [disabled],
    );

    const onDragLeave = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
    }, []);

    // --- Rendering logic ---
    const canAddMore = (files?.length || 0) < maxCount;

    return (
      <div ref={ref} className={cn(containerVariants({ listType }), className)} {...rest}>
        {/* Previews */}
        {previews.map((item, index) => (
          <div
            key={item.url}
            className={cn(
              "group relative overflow-hidden rounded-xl border border-border shadow-sm transition-all hover:shadow-md",
              size === "sm" && "h-16 w-16",
              size === "md" && "h-24 w-24",
              size === "lg" && "h-32 w-32",
              size === "full" && "h-32 w-full",
            )}
          >
            <Image
              src={item.url}
              alt={item.file.name || t`Uploaded image`}
              fill
              className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
              unoptimized // Retirez unoptimized si vous utilisez un service cloud externe, gardez-le pour les object URLs
            />

            {/* Overlay au survol */}
            <div className="absolute inset-0 bg-black/5 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

            {/* Bouton Delete (Glassmorphism & top-right corner) */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              disabled={disabled}
              aria-label={resolvedAriaLabelRemove}
              onClick={(e) => {
                e.preventDefault(); // Empêche les clics accidentels de propager au form
                removeFile(index);
              }}
              className="absolute right-1 top-1 h-6 w-6 rounded-full bg-background/50 text-foreground opacity-0 backdrop-blur-md transition-all duration-200 hover:bg-destructive hover:text-destructive-foreground focus-visible:opacity-100 group-hover:opacity-100"
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          </div>
        ))}

        {/* Dropzone / Upload Button */}
        {canAddMore && (
          <label
            htmlFor={inputId}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            className={cn(dropZoneVariants({ size, isDragging }), disabled && "pointer-events-none opacity-50")}
          >
            <input
              id={inputId}
              type="file"
              accept={accept}
              multiple={maxCount > 1}
              disabled={disabled}
              aria-label={resolvedAriaLabelAdd}
              className="sr-only" // Rendu invisible mais accessible aux screen readers
              onChange={(e) => {
                handleFilesAdded(e.target.files);
                e.target.value = ""; // Reset pour permettre le ré-upload du même fichier si supprimé
              }}
            />
            <div className="flex flex-col items-center justify-center gap-1 p-2 text-center">
              {isDragging ? (
                <UploadCloud className="h-6 w-6 animate-pulse" />
              ) : (
                <ImagePlus className="h-5 w-5 opacity-70 transition-opacity group-hover:opacity-100" />
              )}
              {maxCount > 1 && (
                <span className="text-xs font-medium opacity-70">
                  {files?.length === 0 ? (
                    <Trans>Add</Trans>
                  ) : (
                    <Trans>
                      {files?.length ?? 0} / {maxCount}
                    </Trans>
                  )}
                </span>
              )}
            </div>
          </label>
        )}
      </div>
    );
  },
);

ImageUpload.displayName = "ImageUpload";

export { ImageUpload };

"use client";

import { Trans, useLingui } from "@lingui/react/macro";
import { Smile } from "lucide-react";
import { useState } from "react";
import type { useCreateCollectionForm } from "@/modules/Collections/ui/hooks/useCreateCollectionForm";
import { ModalViewLayout } from "@/modules/Collections/ui/layout/ModalViewLayout";
import { cn } from "@/shared/core/utils/cn";
import { ErrorMessage } from "@/shared/ui/form/ErrorMessage";
import { FieldError } from "@/shared/ui/form/FieldError";
import { FieldErrorHint, hasFieldError } from "@/shared/ui/form/FieldErrorHint";
import { Button } from "@/shared/ui/primitives/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/shared/ui/primitives/dropdown-menu";
import {
  EmojiPicker,
  EmojiPickerContent,
  EmojiPickerFooter,
  EmojiPickerSearch,
} from "@/shared/ui/primitives/emoji-picker";
import { Form } from "@/shared/ui/primitives/form";
import { Input } from "@/shared/ui/primitives/input";
import { Label } from "@/shared/ui/primitives/label";
import { Textarea } from "@/shared/ui/primitives/textarea";

interface CreateCollectionViewProps {
  form: ReturnType<typeof useCreateCollectionForm>["form"];
  isSubmitting: boolean;
  error: ReturnType<typeof useCreateCollectionForm>["error"];
  onBack: () => void;
}

export function CreateCollectionView({ form, isSubmitting, error, onBack }: CreateCollectionViewProps) {
  const { t } = useLingui();
  const [emojiOpen, setEmojiOpen] = useState(false);

  return (
    <ModalViewLayout
      title={t`Create Collection`}
      description={t`Organize your recipes into collections.`}
      onBack={onBack}
      disabled={isSubmitting}
    >
      <Form form={form} className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <form.Field name="name">
            {(field) => (
              <div className="flex-1 space-y-2">
                <div className="inline-flex items-center gap-1.5">
                  <Label htmlFor={field.name}>
                    <Trans>Name</Trans>
                  </Label>
                  <FieldErrorHint field={field} message={t`Name is required`} />
                </div>
                <Input
                  id={field.name}
                  name={field.name}
                  placeholder={t`My Favorite Recipes`}
                  maxLength={100}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  disabled={isSubmitting}
                />
              </div>
            )}
          </form.Field>

          <form.Field name="emoji">
            {(field) => {
              const hasEmojiValidationError = hasFieldError(field);

              return (
                <div className="space-y-2">
                  <div className="h-5" />
                  <DropdownMenu
                    open={emojiOpen}
                    onOpenChange={(open) => {
                      setEmojiOpen(open);
                      if (!open) {
                        field.handleBlur();
                      }
                    }}
                  >
                    <DropdownMenuTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        aria-label={t`Select collection emoji`}
                        aria-invalid={hasEmojiValidationError}
                        disabled={isSubmitting}
                        className={cn(
                          "h-10 w-10 rounded-full",
                          hasEmojiValidationError &&
                            "border-destructive/70 text-destructive hover:border-destructive hover:text-destructive",
                        )}
                      >
                        {field.state.value ? (
                          <span className="text-lg">{field.state.value}</span>
                        ) : (
                          <Smile className="h-4 w-4" />
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="border-0 bg-transparent p-0 shadow-none">
                      <EmojiPicker
                        columns={8}
                        onEmojiSelect={(emoji) => {
                          field.handleChange(emoji.emoji);
                          setEmojiOpen(false);
                        }}
                        className="h-[340px] w-[320px]"
                      >
                        <EmojiPickerSearch />
                        <EmojiPickerContent />
                        <EmojiPickerFooter />
                      </EmojiPicker>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              );
            }}
          </form.Field>
        </div>

        <form.Field name="description">
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor={field.name}>
                <Trans>Description (optional)</Trans>
              </Label>
              <Textarea
                id={field.name}
                name={field.name}
                placeholder={t`A collection of my favorite recipes...`}
                maxLength={500}
                rows={3}
                value={field.state.value ?? ""}
                onChange={(e) => field.handleChange(e.target.value || null)}
                onBlur={field.handleBlur}
                disabled={isSubmitting}
              />
              <FieldError field={field} />
            </div>
          )}
        </form.Field>

        <ErrorMessage error={error} />

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="outline" onClick={onBack} disabled={isSubmitting} className="rounded-full">
            <Trans>Cancel</Trans>
          </Button>
          <Button type="submit" disabled={isSubmitting} className="rounded-full">
            {isSubmitting ? t`Creating...` : t`Create`}
          </Button>
        </div>
      </Form>
    </ModalViewLayout>
  );
}

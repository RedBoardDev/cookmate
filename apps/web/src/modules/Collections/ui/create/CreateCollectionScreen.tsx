"use client";

import { useState } from "react";
import { Smile } from "lucide-react";
import { Button } from "@/shared/ui/primitives/button";
import { Input } from "@/shared/ui/primitives/input";
import { Textarea } from "@/shared/ui/primitives/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/shared/ui/primitives/dropdown-menu";
import {
  EmojiPicker,
  EmojiPickerContent,
  EmojiPickerFooter,
  EmojiPickerSearch
} from "@/shared/ui/primitives/emoji-picker";
import { Form } from "@/shared/ui/primitives/form";
import { FieldError } from "@/shared/ui/form/FieldError";
import { ErrorMessage } from "@/shared/ui/form/ErrorMessage";
import { ModalViewLayout } from "@/modules/Collections/ui/layout/ModalViewLayout";
import { useCreateCollectionForm } from "@/modules/Collections/ui/create/useCreateCollectionForm";

interface CreateCollectionScreenProps {
  onBack: () => void;
}

export function CreateCollectionScreen({ onBack }: CreateCollectionScreenProps) {
  const { form, isSubmitting, error } = useCreateCollectionForm({
    onSuccess: onBack
  });
  const [emojiOpen, setEmojiOpen] = useState(false);

  return (
    <ModalViewLayout
      title="Create Collection"
      description="Organize your recipes into collections."
      onBack={onBack}
      disabled={isSubmitting}
    >
      <Form form={form} className="space-y-4">
        <div className="flex items-end gap-3">
          <form.Field name="name">
            {(field) => (
              <div className="flex-1 space-y-2">
                <label
                  className="text-sm font-medium text-foreground"
                  htmlFor={field.name}
                >
                  Name
                </label>
                <Input
                  id={field.name}
                  name={field.name}
                  placeholder="My Favorite Recipes"
                  maxLength={100}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  disabled={isSubmitting}
                />
                <FieldError field={field} />
              </div>
            )}
          </form.Field>

          <form.Field name="emoji">
            {(field) => (
              <div className="space-y-2">
                <div className="h-5" />
                <DropdownMenu open={emojiOpen} onOpenChange={setEmojiOpen}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      disabled={isSubmitting}
                      className="h-10 w-10"
                    >
                      {field.state.value ? (
                        <span className="text-lg">{field.state.value}</span>
                      ) : (
                        <Smile className="h-4 w-4" />
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="p-0 border-0 bg-transparent shadow-none">
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
                <FieldError field={field} />
              </div>
            )}
          </form.Field>
        </div>

        <form.Field name="description">
          {(field) => (
            <div className="space-y-2">
              <label
                className="text-sm font-medium text-foreground"
                htmlFor={field.name}
              >
                Description (optional)
              </label>
              <Textarea
                id={field.name}
                name={field.name}
                placeholder="A collection of my favorite recipes..."
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
          <Button type="button" variant="outline" onClick={onBack} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create"}
          </Button>
        </div>
      </Form>
    </ModalViewLayout>
  );
}

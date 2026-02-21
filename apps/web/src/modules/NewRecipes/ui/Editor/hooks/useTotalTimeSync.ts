"use client";

import { useStore } from "@tanstack/react-form";
import { useEffect } from "react";
import type { useCreateRecipeForm } from "@/modules/NewRecipes/ui/Editor/hooks/useCreateRecipeForm";

export function useTotalTimeSync(form: ReturnType<typeof useCreateRecipeForm>["form"]) {
  const prep = useStore(form.store, (state) => state.values.prepTimeMin ?? 0);
  const cook = useStore(form.store, (state) => state.values.cookTimeMin ?? 0);

  useEffect(() => {
    const sum = prep + cook;
    const current = form.state.values.totalTimeMin ?? 0;
    if (current === sum) return;
    form.setFieldValue("totalTimeMin", sum);
  }, [form, prep, cook]);
}

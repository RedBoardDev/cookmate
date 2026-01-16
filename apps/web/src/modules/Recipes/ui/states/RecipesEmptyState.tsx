"use client";

import { useRouter } from "next/navigation";
import { UtensilsCrossed } from "lucide-react";
import { Button } from "@heroui/react";
import { Card } from "@/shared/ui/primitives/card";

export function RecipesEmptyState() {
  const router = useRouter();

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10">
      <Card
        variant="subtle"
        border="dashed"
        shadow="flat"
        radius="3xl"
        padding="md"
        className="text-center md:p-12"
      >
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/20 shadow-sm">
          <UtensilsCrossed className="h-5 w-5 text-accent-foreground" />
        </div>
        <h2 className="mt-4 text-lg font-semibold text-foreground">
          No recipes yet
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Start by adding your first recipe to build your collection.
        </p>
        <div className="mt-6 flex justify-center">
          <Button
            size="sm"
            radius="full"
            onPress={() => router.push("/recipes/add")}
          >
            Add a recipe
          </Button>
        </div>
      </Card>
    </section>
  );
}

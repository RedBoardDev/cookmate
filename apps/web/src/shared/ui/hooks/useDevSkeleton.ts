"use client";

import { useSearchParams } from "next/navigation";

export function useDevSkeleton() {
  const searchParams = useSearchParams();
  return searchParams.has("skeleton") || searchParams.get("skeleton") === "1";
}

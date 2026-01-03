import { ApiError } from "@/interfaces/http/errors/api.error";
import type { SortDirection } from "../types";

export const parseSortItem = (value: string): { field: string; direction: SortDirection } => {
  const parts = value.split(":");
  if (parts.length !== 2) {
    throw ApiError.invalidQueryParam("Invalid sort parameter", { value });
  }

  const field = parts[0].trim();
  const direction = parts[1].trim();

  if (!field || !direction) {
    throw ApiError.invalidQueryParam("Invalid sort parameter", { value });
  }

  if (direction !== "asc" && direction !== "desc") {
    throw ApiError.invalidQueryParam("Invalid sort direction", { value });
  }

  return { field, direction };
};

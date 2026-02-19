import type { NavMatch } from "@/shared/modules/app-shell/domain/navigation.config";

function matchesPath(segments: readonly string[], path: string[]) {
  if (segments.length < path.length) {
    return false;
  }

  return path.every((segment, index) => segments[index] === segment);
}

export function normalizeSegments(segments: readonly string[]) {
  return segments.filter((segment) => !segment.startsWith("("));
}

export function isNavActive(segments: readonly string[], match: NavMatch) {
  const normalized = normalizeSegments(segments);

  if (!matchesPath(normalized, match.path)) {
    return false;
  }

  if (match.mode === "exact") {
    return normalized.length === match.path.length;
  }

  return true;
}

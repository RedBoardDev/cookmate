---
name: react-loading-skeleton
description: React Loading Skeleton v3.5.0 usage and patterns. Use when implementing loading skeletons in React/Next.js components, choosing props/theme, or troubleshooting sizing/layout issues.
---

# React Loading Skeleton

## Quick Start

1. Import CSS once in a global entry (e.g., `src/app/layout.tsx`):
   - `import "react-loading-skeleton/dist/skeleton.css";`
2. Use `<Skeleton />` inline where data is missing.
3. Prefer skeletons inside the real component instead of separate skeleton screens.

## Patterns

- Inline fallback: `{data ? <Real /> : <Skeleton />}`
- Lists: `<Skeleton count={3} />` or map items and vary widths
- Avatars/rounds: `<Skeleton circle width={40} height={40} />`
- Global theming: wrap with `SkeletonTheme`

## References

- API, props, pitfalls, and examples: `references/react-loading-skeleton-v3.md`

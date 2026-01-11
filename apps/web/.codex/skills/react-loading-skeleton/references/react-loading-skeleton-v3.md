# React Loading Skeleton v3.5.0 (LLM-optimized)

Goal: render skeletons inline where data is missing so layout stays in sync with real UI.

## Install + Global CSS

```bash
yarn add react-loading-skeleton
```

```tsx
// src/app/layout.tsx
import "react-loading-skeleton/dist/skeleton.css";
```

## Core Use (inline, no dedicated screens)

```tsx
import Skeleton from "react-loading-skeleton";

function BlogPost({ title, body }: { title?: string; body?: string }) {
  return (
    <div>
      <h1>{title || <Skeleton />}</h1>
      {body || <Skeleton count={4} />}
    </div>
  );
}
```

## Props Cheatsheet

Skeleton only:
- `count?: number` (supports decimals, e.g. `3.5`)
- `wrapper?: React.FC<PropsWithChildren>`
- `circle?: boolean`
- `className?: string`
- `containerClassName?: string`
- `containerTestId?: string`
- `style?: React.CSSProperties` (escape hatch)

Skeleton + SkeletonTheme:
- `baseColor?: string` (default `#ebebeb`)
- `highlightColor?: string` (default `#f5f5f5`)
- `width?: string | number` (default `100%`)
- `height?: string | number` (default font size)
- `borderRadius?: string | number` (default `0.25rem`)
- `inline?: boolean` (default `false`)
- `duration?: number` (default `1.5`)
- `direction?: "ltr" | "rtl"`
- `enableAnimation?: boolean`
- `customHighlightBackground?: string`

## Theming (optional)

```tsx
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

<SkeletonTheme baseColor="#202020" highlightColor="#444" borderRadius={8}>
  <Skeleton count={3} />
</SkeletonTheme>
```

## Common Patterns

Avatar + text:
```tsx
<Skeleton circle width={40} height={40} />
<Skeleton width="60%" />
```

Card image:
```tsx
<div className="aspect-[4/3] w-full">
  <Skeleton className="h-full w-full" containerClassName="block h-full w-full" />
</div>
```

List with varied widths:
```tsx
{[0.9, 0.7, 0.8].map((w, i) => (
  <Skeleton key={i} width={`${w * 100}%`} />
))}
```

## Troubleshooting

Flex container width is 0:
```tsx
<Skeleton containerClassName="flex-1" />
```

Container height off by a few px:
```tsx
<div className="leading-none">
  <Skeleton height={30} />
</div>
```

## Rule of Thumb

Use Skeleton inside the real component so it adapts to typography and stays in sync with layout changes.

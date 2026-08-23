---
title: useMediaQuery
description: Reactive media query hook with Tailwind-like syntax.
---

A React hook that subscribes to a CSS media query and returns whether it matches. Built on `useSyncExternalStore` for SSR safety and concurrent mode compatibility.

## Installation

<CodeTabs>

<TabsList>
  <TabsTab value="cli">CLI</TabsTab>
  <TabsTab value="manual">Manual</TabsTab>
</TabsList>
<TabsPanel value="cli">

```bash
npx shadcn@latest add @coss/use-media-query
```

</TabsPanel>

<TabsPanel value="manual">

<Steps>

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="use-media-query" title="hooks/use-media-query.ts" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsPanel>

</CodeTabs>

## Usage

### Breakpoint shorthand

Use Tailwind variant syntax to match breakpoints. TypeScript provides full autocomplete.

```tsx
import { useMediaQuery } from "@/hooks/use-media-query";

// Min-width (breakpoint and above) — like md:
const isDesktop = useMediaQuery("md");

// Max-width (below breakpoint) — like max-md:
const isMobile = useMediaQuery("max-md");

// Range (between two breakpoints) — like md:max-lg:
const isTablet = useMediaQuery("md:max-lg");
```

### Object API

Use the object form when you need pointer detection or custom pixel values.

```tsx
// Touch device detection
const isTouch = useMediaQuery({ pointer: "coarse" });

// Breakpoint + pointer combined
const isMobileTouch = useMediaQuery({ max: "md", pointer: "coarse" });

// Custom pixel values
const isNarrow = useMediaQuery({ max: 600 });
```

### Raw media query

Pass any valid CSS media query string as an escape hatch.

```tsx
const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
```

### Conditional rendering

The primary use case — mount one component instead of another based on viewport.

```tsx
function Layout() {
  const isDesktop = useMediaQuery("lg");

  return isDesktop ? <DesktopNav /> : <MobileNav />;
}
```

## Breakpoints

The hook includes a static breakpoint map that must match your Tailwind config. Default values:

| Name   | Value    |
|--------|----------|
| `sm`   | 640px    |
| `md`   | 800px    |
| `lg`   | 1024px   |
| `xl`   | 1280px   |
| `2xl`  | 1536px   |
| `3xl`  | 1600px   |
| `4xl`  | 2000px   |

If you override breakpoints in your Tailwind CSS `@theme`, update the `BREAKPOINTS` constant in the hook to match.

## API

```tsx
function useMediaQuery(
  query: BreakpointQuery | MediaQueryInput | string
): boolean;
```

### String queries

| Pattern | Example | Matches |
|---------|---------|---------|
| `"{bp}"` | `"md"` | Viewport ≥ breakpoint |
| `"max-{bp}"` | `"max-md"` | Viewport < breakpoint |
| `"{bp}:max-{bp}"` | `"md:max-lg"` | Between two breakpoints |
| `"(...)"` | `"(prefers-color-scheme: dark)"` | Raw CSS media query |

### Object queries

| Property | Type | Description |
|----------|------|-------------|
| `min` | `Breakpoint \| number` | Min-width breakpoint name or px value |
| `max` | `Breakpoint \| number` | Max-width breakpoint name or px value |
| `pointer` | `"coarse" \| "fine"` | Pointer type (`coarse` for touch, `fine` for mouse) |

### Return value

Returns `boolean` — `true` when the media query matches, `false` otherwise. Returns `false` during SSR.

## Examples

Resize the viewport to see values update in real time.

<MediaQueryDemo />

## Convenience export

The hook also exports `useIsMobile` for backward compatibility with shadcn's `use-mobile` pattern:

```tsx
import { useIsMobile } from "@/hooks/use-media-query";

const isMobile = useIsMobile(); // equivalent to useMediaQuery("max-md")
```

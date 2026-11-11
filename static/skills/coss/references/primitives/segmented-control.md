# coss Segmented Control

A segmented control is a visual pattern, not a standalone behavior. `SegmentedControl` and `SegmentedControlItem` provide the presentation and a sliding indicator; the element you render through their `child` snippet provides the semantics, keyboard interactions, and state model. Choose the underlying primitive from the interaction first.

## Choose the behavior

| Intent | Use | State model |
| --- | --- | --- |
| Choose one value, especially in a form | Radio Group | Exactly one mutually exclusive value |
| Navigate to another URL or route | Links | Browser navigation with `aria-current="page"` on the current link |
| Apply an exclusive filter or reversible mode | Toggle Group | At most one pressed item by default; the current item may be cleared |
| Switch between associated content panels | Tabs | Each tab controls a matching panel |

Do not use Tabs for navigation links, form values, or filters merely because the result should look segmented. Do not use Toggle Group when one value must always remain selected; use Radio Group instead.

## Install

```bash
npx shadcn-svelte@latest add https://cossui-svelte.com/r/segmented-control.json
```

## Canonical imports

```svelte
<script lang="ts">
  import {
    SegmentedControl,
    SegmentedControlItem
  } from '#lib/components/ui/segmented-control/index.js';
</script>
```

## Composition

Both parts take a `child` snippet in place of React coss's `render` prop. Spread `props` on your element. On the root, also render `content` inside it — it holds the items plus the indicator.

Radio Group (use the primitives, not `RadioGroup`/`Radio`, so no native radio indicator renders):

```svelte
<script lang="ts">
  import { RadioGroupPrimitive, RadioPrimitive } from '#lib/components/ui/radio-group/index.js';
</script>

<SegmentedControl aria-label="Billing period" size="sm">
  {#snippet child({ props, content })}
    <RadioGroupPrimitive {...props} value="monthly">{@render content()}</RadioGroupPrimitive>
  {/snippet}
  <SegmentedControlItem class="grow">
    {#snippet child({ props })}
      <RadioPrimitive.Root {...props} value="monthly">Monthly</RadioPrimitive.Root>
    {/snippet}
  </SegmentedControlItem>
  <SegmentedControlItem class="grow">
    {#snippet child({ props })}
      <RadioPrimitive.Root {...props} value="yearly">Yearly</RadioPrimitive.Root>
    {/snippet}
  </SegmentedControlItem>
</SegmentedControl>
```

Navigation links:

```svelte
<SegmentedControl aria-label="Project sections">
  {#snippet child({ props, content })}
    <nav {...props}>{@render content()}</nav>
  {/snippet}
  <SegmentedControlItem>
    {#snippet child({ props })}
      <a {...props} aria-current="page" href="/overview">Overview</a>
    {/snippet}
  </SegmentedControlItem>
  <SegmentedControlItem>
    {#snippet child({ props })}
      <a {...props} href="/activity">Activity</a>
    {/snippet}
  </SegmentedControlItem>
</SegmentedControl>
```

Toggle Group: render `ToggleGroupPrimitive` (from `#lib/components/ui/toggle-group/index.js`) on the root and `TogglePrimitive` (from `#lib/components/ui/toggle/index.js`) on each item, the same way.

## Behavior notes

- `size` (`"sm" | "default" | "lg"`) on `SegmentedControl` flows to every item via context; an item's own `size` overrides it.
- An item is active when it has `data-checked` (Radio Group), `aria-current="page"` (links), or `data-pressed` (Toggle Group). The indicator slides there over 200ms, stays still under `prefers-reduced-motion`, and is hidden when nothing is active.
- Before hydration, the active item paints its own static pill.
- Tabs keep ShardsUI's own indicator but import `segmentedControlItemSizeClassNames`, `segmentedControlItemLayoutClassName`, and `segmentedControlIndicatorSurfaceClassName` from this component so both look identical.

## Particles

| Implementation | Small | Default | Large |
| --- | --- | --- | --- |
| Radio Group | `p-radio-group-7` | `p-radio-group-8` | `p-radio-group-9` |
| Navigation links | `p-navigation-2` | `p-navigation-1` | `p-navigation-3` |
| Tabs | `p-tabs-14` | `p-tabs-1` | `p-tabs-15` |

## Common pitfalls

- Forgetting `{@render content()}` inside a root `child` snippet — the items and indicator won't render.
- Using `RadioGroup`/`Radio` (styled) instead of the primitives, which adds a radio dot inside each segment.
- Copying item classes into a custom segmented control instead of using `SegmentedControlItem`, which drifts from Tabs sizing.

# coss Toggle Group

## When to use

- Grouped pressed-state controls (single or multiple).
- Formatting/action sets needing button-like toggles with shared state.

## Install

```bash
npx shadcn-svelte@latest add https://cossui-svelte.com/r/toggle-group.json
```

Manual deps from docs:

```bash
npm install @shardsui/svelte
```

## Canonical imports

```svelte
<script lang="ts">
  import {
    ToggleGroup,
    ToggleGroupItem,
    ToggleGroupSeparator
  } from '#lib/components/ui/toggle-group/index.js';
</script>
```

`ToggleGroupPrimitive` is re-exported.

## Minimal pattern

```svelte
<script lang="ts">
  let value = $state(['bold']);
</script>

<ToggleGroup bind:value>
  <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
  <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
  <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
</ToggleGroup>
```

`value` is always a `string[]` (bindable). The group is exclusive by default (at most one item, which may be cleared); add `multiple` when more than one item may be pressed. `variant` (`default | outline`) and `size` (`sm | default | lg`) on the group flow to the items via context; `orientation` is `horizontal | vertical`.

## Patterns from coss particles

### Key patterns

Icon items:

```svelte
<ToggleGroup value={['bold']}>
  <ToggleGroupItem aria-label="Toggle bold" value="bold">
    <BoldIcon aria-hidden="true" />
  </ToggleGroupItem>
  <ToggleGroupItem aria-label="Toggle italic" value="italic">
    <ItalicIcon aria-hidden="true" />
  </ToggleGroupItem>
</ToggleGroup>
```

Outlined groups are connected: put `ToggleGroupSeparator` between adjacent items (the default variant is spaced and needs none). In a vertical outlined group, separators are horizontal:

```svelte
<ToggleGroup orientation="vertical" variant="outline" value={['bold']}>
  <ToggleGroupItem aria-label="Toggle bold" value="bold"><BoldIcon /></ToggleGroupItem>
  <ToggleGroupSeparator orientation="horizontal" />
  <ToggleGroupItem aria-label="Toggle italic" value="italic"><ItalicIcon /></ToggleGroupItem>
</ToggleGroup>
```

Tooltips on items — ShardsUI has no trigger composition (`render`/`asChild`), so control each `Tooltip` and anchor its popup to the item:

```svelte
<script lang="ts">
  let boldRef = $state<HTMLElement | null>(null);
  let boldTip = $state(false);
</script>

<TooltipProvider>
  <ToggleGroup multiple value={['bold']}>
    <Tooltip bind:open={boldTip}>
      <ToggleGroupItem
        aria-label="Toggle bold"
        bind:ref={boldRef}
        value="bold"
        onpointerenter={() => (boldTip = true)}
        onpointerleave={() => (boldTip = false)}
        onfocus={() => (boldTip = true)}
        onblur={() => (boldTip = false)}
      >
        <BoldIcon />
      </ToggleGroupItem>
      <TooltipPopup customAnchor={boldRef}>Bold</TooltipPopup>
    </Tooltip>
  </ToggleGroup>
</TooltipProvider>
```

Read [segmented-control.md](segmented-control.md) before rendering a reversible mode as a segmented control.

## Common pitfalls

- Passing a scalar value: both exclusive and multiple modes use arrays.
- React habits: `defaultValue`, `onValueChange={setValue}`. Use `value` / `bind:value`.
- Omitting `ToggleGroupSeparator` in outlined groups, or leaving it vertical inside a vertical group.
- Using a generic border instead of the dedicated separator (the group coordinates separator styling with hover/pressed states).
- Missing accessible labels on icon-only items.

## Useful particle references

- basic / small / large: `p-toggle-group-1`, `p-toggle-group-2`, `p-toggle-group-3`
- outline / vertical outline: `p-toggle-group-4`, `p-toggle-group-5`
- disabled group / disabled item: `p-toggle-group-6`, `p-toggle-group-7`
- multiple selection: `p-toggle-group-8`
- with tooltips: `p-toggle-group-9`

# coss Tabs

## When to use

- Mutually exclusive content panels in one region.
- Settings/detail screens split into scoped views.

## When NOT to use

- For route navigation, form values, or filters — read [segmented-control.md](segmented-control.md) and pick links, Radio Group, or Toggle Group.

## Install

```bash
npx shadcn-svelte@latest add https://cossui-svelte.com/r/tabs.json
```

Manual deps from docs:

```bash
npm install @shardsui/svelte tailwind-variants
```

The CLI installs the `segmented-control` component automatically (Tabs shares its sizes, icon layout, and indicator surface). For a manual installation, also copy `components/ui/segmented-control` before copying the Tabs component.

## Canonical imports

```svelte
<script lang="ts">
  import { Tabs, TabsList, TabsPanel, TabsTab } from '#lib/components/ui/tabs/index.js';
</script>
```

Also exported: `TabsTrigger` (alias of `TabsTab`), `TabsContent` (alias of `TabsPanel`), `TabsIndicator` (rendered automatically by `TabsList`), `TabsPrimitive`, and the `TabsSize` / `TabsVariant` types.

## Minimal pattern

```svelte
<Tabs value="tab-1">
  <TabsList>
    <TabsTab value="tab-1">Tab 1</TabsTab>
    <TabsTab value="tab-2">Tab 2</TabsTab>
    <TabsTab value="tab-3">Tab 3</TabsTab>
  </TabsList>
  <TabsPanel value="tab-1">Tab 1 content</TabsPanel>
  <TabsPanel value="tab-2">Tab 2 content</TabsPanel>
  <TabsPanel value="tab-3">Tab 3 content</TabsPanel>
</Tabs>
```

## Patterns from coss particles

### Key patterns

Controlled — `value` is bindable:

```svelte
<script lang="ts">
  let tab = $state('tab-1');
</script>

<Tabs bind:value={tab}>…</Tabs>
```

Sizes are set on `TabsList` and inherited by its tabs; a `TabsTab` can override:

```svelte
<TabsList size="sm">
  <TabsTab value="tab-1">Tab 1</TabsTab>
  <TabsTab size="lg" value="tab-2">Tab 2</TabsTab>
</TabsList>
```

Underline variant and vertical orientation:

```svelte
<Tabs value="tab-1" orientation="vertical">
  <TabsList variant="underline">
    <TabsTab value="tab-1">Tab 1</TabsTab>
    <TabsTab value="tab-2">Tab 2</TabsTab>
  </TabsList>
  …
</Tabs>
```

Icons and count badges go inside `TabsTab` (`p-tabs-6` – `p-tabs-12`); icon-only tabs need `aria-label` (and optionally a `Tooltip`, `p-tabs-13`).

## Common pitfalls

- React habits: `defaultValue`, `onValueChange={setValue}`. Use `value` / `bind:value`.
- Mismatching `TabsTab value` and `TabsPanel value` pairs.
- Using tabs for route-level navigation, form values, or reversible filters just because they look segmented.
- Mounting expensive panel content without considering visibility/performance.

## Useful particle references

- segmented tabs default / small / large: `p-tabs-1`, `p-tabs-14`, `p-tabs-15`
- underline / vertical / vertical underline: `p-tabs-2`, `p-tabs-3`, `p-tabs-4`
- full-rounded triggers: `p-tabs-5`
- icon before name (± underline) / icon only / icon on top: `p-tabs-6`, `p-tabs-7`, `p-tabs-8`, `p-tabs-9`
- count badges: `p-tabs-10`, `p-tabs-12`
- vertical underline with icons: `p-tabs-11`
- icon-only with grouped tooltips: `p-tabs-13`

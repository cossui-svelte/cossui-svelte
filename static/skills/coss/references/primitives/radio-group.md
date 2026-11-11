# coss Radio Group

## When to use

- Mutually exclusive option selection.
- Single-choice settings with clear option labels.

## When NOT to use

- If multiple options can be selected -> use CheckboxGroup instead.
- If options are many and need search/filtering -> use Select or Combobox instead.
- If the choices are binary (on/off) -> use Switch or Checkbox instead.
- If each option reveals a content panel rather than selecting a value -> use Tabs instead.

## Install

```bash
npx shadcn-svelte@latest add https://cossui-svelte.com/r/radio-group.json
```

Manual deps from docs:

```bash
npm install @shardsui/svelte
```

## Canonical imports

```svelte
<script lang="ts">
  import { Label } from '#lib/components/ui/label/index.js';
  import { Radio, RadioGroup } from '#lib/components/ui/radio-group/index.js';
</script>
```

`Radio` is also exported as `RadioGroupItem`; `RadioPrimitive` and `RadioGroupPrimitive` are re-exported for custom compositions.

## Minimal pattern

```svelte
<script lang="ts">
  let value = $state('next');
</script>

<RadioGroup bind:value>
  <Label><Radio value="next" /> Next.js</Label>
  <Label><Radio value="vite" /> Vite</Label>
  <Label><Radio value="astro" /> Astro</Label>
</RadioGroup>
```

`RadioGroup` forwards `value` (bindable), `defaultValue`, `onValueChange`, `disabled`, `name`.

## Patterns from coss particles

### Key patterns

Options with descriptions (associate with `id` + `for`):

```svelte
<RadioGroup aria-label="Subscription plan" value="free">
  <div class="flex items-start gap-2">
    <Radio id="plan-free" value="free" />
    <div class="flex flex-col gap-1">
      <Label for="plan-free">Free</Label>
      <p class="text-muted-foreground text-xs">Basic features for personal use.</p>
    </div>
  </div>
  <div class="flex items-start gap-2">
    <Radio id="plan-pro" value="pro" />
    <div class="flex flex-col gap-1">
      <Label for="plan-pro">Pro</Label>
      <p class="text-muted-foreground text-xs">Advanced tools for professionals.</p>
    </div>
  </div>
</RadioGroup>
```

Segmented presentation — render `RadioGroupPrimitive` / `RadioPrimitive.Root` (no native indicator) through `SegmentedControl`; read [segmented-control.md](segmented-control.md) first:

```svelte
<script lang="ts">
  import { RadioGroupPrimitive, RadioPrimitive } from '#lib/components/ui/radio-group/index.js';
  import {
    SegmentedControl,
    SegmentedControlItem
  } from '#lib/components/ui/segmented-control/index.js';
</script>

<SegmentedControl aria-label="Billing period">
  {#snippet child({ props, content })}
    <RadioGroupPrimitive {...props} value="monthly">{@render content()}</RadioGroupPrimitive>
  {/snippet}
  <SegmentedControlItem>
    {#snippet child({ props })}
      <RadioPrimitive.Root {...props} value="monthly">Monthly</RadioPrimitive.Root>
    {/snippet}
  </SegmentedControlItem>
  <SegmentedControlItem>
    {#snippet child({ props })}
      <RadioPrimitive.Root {...props} value="yearly">Yearly</RadioPrimitive.Root>
    {/snippet}
  </SegmentedControlItem>
</SegmentedControl>
```

For form-bound groups, use `Field` + `Fieldset` + `FieldItem` (see [field.md](field.md)).

## Common pitfalls

- React habits: `defaultValue` + `onValueChange={setValue}`, `htmlFor`. Use `bind:value` and `for`.
- Using radios for multi-select behavior that requires checkbox group.
- Missing label association for each radio option.
- Handling the selected value as an array — it is a single value.

## Useful particle references

- basic / disabled / with description: `p-radio-group-1`, `p-radio-group-2`, `p-radio-group-3`
- card style: `p-radio-group-4`; theme image cards: `p-radio-group-6`; color palette grid: `p-radio-group-10`; membership plans: `p-radio-group-100`
- form integration: `p-radio-group-5`
- segmented small/default/large: `p-radio-group-7`, `p-radio-group-8`, `p-radio-group-9`

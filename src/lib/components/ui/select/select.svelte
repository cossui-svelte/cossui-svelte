<script lang="ts">
  import { Select as SelectPrimitive } from '@shardsui/svelte/select';

  type SelectItemDef = { label: string; value: string };

  let {
    value = $bindable(),
    items = [],
    ...restProps
  }: {
    value?: string | string[];
    items?: SelectItemDef[];
    [key: string]: unknown;
  } = $props();
</script>

<SelectPrimitive.Root
  bind:value={value as never}
  {items}
  {...restProps as Record<string, unknown>}
/>

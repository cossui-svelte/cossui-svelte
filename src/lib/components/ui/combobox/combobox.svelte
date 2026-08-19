<script lang="ts">
  import { Combobox as ComboboxPrimitive } from '@shardsui/svelte/combobox';

  type ComboboxItemDef = { label: string; value: string };
  type DefaultValue = string | { label?: string; value: string };

  let {
    value = $bindable(),
    inputValue = $bindable(),
    open = $bindable(false),
    items = [],
    defaultValue,
    multiple = false,
    ...restProps
  }: {
    value?: string | string[];
    inputValue?: string;
    open?: boolean;
    items?: ComboboxItemDef[];
    defaultValue?: DefaultValue;
    multiple?: boolean;
    [key: string]: unknown;
  } = $props();

  // Uncontrolled seed: only applies when the consumer hasn't already bound `value`.
  if (value === undefined && defaultValue !== undefined) {
    value = typeof defaultValue === 'string' ? defaultValue : defaultValue.value;
  }
</script>

<ComboboxPrimitive.Root
  bind:value={value as never}
  bind:inputValue
  bind:open
  {multiple}
  items={items as never}
  {...restProps as Record<string, unknown>}
/>

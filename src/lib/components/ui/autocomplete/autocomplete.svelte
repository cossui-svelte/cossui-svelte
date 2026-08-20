<script lang="ts" generics="Value = unknown">
  import { Autocomplete as AutocompletePrimitive } from '@shardsui/svelte/autocomplete';
  import type { ComponentProps } from 'svelte';

  type Props = ComponentProps<typeof AutocompletePrimitive.Root<Value>>;

  let { value = $bindable(''), open = $bindable(false), items, ...restProps }: Props = $props();
</script>

<AutocompletePrimitive.Root
  bind:value={value as never}
  bind:open
  items={items as never}
  {...restProps as Record<string, unknown>}
/>

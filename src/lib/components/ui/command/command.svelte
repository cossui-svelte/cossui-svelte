<script lang="ts" generics="Value = unknown">
  import { Autocomplete as AutocompletePrimitive } from '@shardsui/svelte/autocomplete';
  import type { ComponentProps } from 'svelte';
  import { cn } from '$lib/utils';

  type Props = ComponentProps<typeof AutocompletePrimitive.Root<Value>> & { class?: string };

  let { value = $bindable(''), items, class: className, ...restProps }: Props = $props();
</script>

<div class={cn('flex min-h-0 flex-col', className)} data-slot="command">
  <AutocompletePrimitive.Root
    bind:value={value as never}
    items={items as never}
    autoHighlight="always"
    keepHighlight
    {...restProps as Record<string, unknown>}
    open
    inline
  />
</div>

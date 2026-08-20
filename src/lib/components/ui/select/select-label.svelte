<script lang="ts">
  import { Select as SelectPrimitive } from '@shardsui/svelte/select';
  import type { ComponentProps } from 'svelte';
  import { cn } from '$lib/utils';

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: ComponentProps<typeof SelectPrimitive.Label> = $props();
</script>

<SelectPrimitive.Label
  bind:ref
  class={cn(
    'not-in-data-[slot=field]:mb-2 inline-flex cursor-default items-center gap-2 font-medium text-base/4.5 text-foreground sm:text-sm/4',
    className
  )}
  data-slot="select-label"
  {...restProps}
/>

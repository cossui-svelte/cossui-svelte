<script lang="ts">
  import { Popover as PopoverPrimitive } from '@shardsui/svelte/popover';
  import type { ComponentProps } from 'svelte';
  import { cn } from '$lib/utils';

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: ComponentProps<typeof PopoverPrimitive.Title> = $props();
</script>

<PopoverPrimitive.Title
  bind:ref
  class={cn('font-semibold text-lg leading-none', className)}
  data-slot="popover-title"
  {...restProps}
/>

<script lang="ts">
  import { Popover as PopoverPrimitive } from '@shardsui/svelte/popover';
  import type { ComponentProps } from 'svelte';
  import { cn } from '$lib/utils';

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: ComponentProps<typeof PopoverPrimitive.Description> = $props();
</script>

<PopoverPrimitive.Description
  bind:ref
  class={cn('text-muted-foreground text-sm', className)}
  data-slot="popover-description"
  {...restProps}
/>

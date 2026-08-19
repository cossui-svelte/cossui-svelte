<script lang="ts">
  import { Collapsible as CollapsiblePrimitive } from '@shardsui/svelte/collapsible';
  import type { ComponentProps } from 'svelte';
  import { cn } from '$lib/utils';

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: ComponentProps<typeof CollapsiblePrimitive.Panel> = $props();
</script>

<CollapsiblePrimitive.Panel
  bind:ref
  class={cn(
    'h-(--collapsible-panel-height) overflow-hidden transition-[height] duration-200 ease-out data-ending-style:h-0 data-starting-style:h-0',
    className
  )}
  data-slot="collapsible-panel"
  {...restProps}
/>

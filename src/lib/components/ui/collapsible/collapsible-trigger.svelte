<script lang="ts">
  import { Collapsible as CollapsiblePrimitive } from '@shardsui/svelte/collapsible';
  import type { ComponentProps } from 'svelte';
  import { cn } from '$lib/utils';

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: ComponentProps<typeof CollapsiblePrimitive.Trigger> = $props();
</script>

<CollapsiblePrimitive.Trigger
  bind:ref
  class={cn('cursor-pointer [&_svg]:transition-transform [&_svg]:duration-200', className)}
  data-slot="collapsible-trigger"
  {...restProps}
/>

<script lang="ts">
  import { Separator as SeparatorPrimitive } from '@shardsui/svelte/separator';
  import type { ComponentProps } from 'svelte';
  import { cn } from '$lib/utils';

  let {
    ref = $bindable(null),
    class: className,
    orientation = 'horizontal',
    ...restProps
  }: ComponentProps<typeof SeparatorPrimitive> = $props();
</script>

<SeparatorPrimitive
  bind:ref
  class={cn(
    "shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px data-[orientation=vertical]:not-[[class^='h-']]:not-[[class*='_h-']]:self-stretch",
    className
  )}
  data-slot="separator"
  {orientation}
  {...restProps}
/>

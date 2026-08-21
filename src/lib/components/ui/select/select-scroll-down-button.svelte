<script lang="ts">
  import ChevronDown from '@lucide/svelte/icons/chevron-down';
  import { Select as SelectPrimitive } from '@shardsui/svelte/select';
  import type { ComponentProps } from 'svelte';
  import { cn } from '$lib/utils';

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: Omit<ComponentProps<typeof SelectPrimitive.ScrollDownArrow>, 'children'> = $props();
</script>

<SelectPrimitive.ScrollDownArrow
  bind:ref
  class={cn(
    'bottom-0 z-50 flex h-6 w-full cursor-default items-center justify-center before:pointer-events-none before:absolute before:inset-x-px before:bottom-px before:h-[200%] before:rounded-b-[calc(var(--radius-lg)-1px)] before:bg-linear-to-t before:from-50% before:from-popover',
    className
  )}
  data-slot="select-scroll-down-arrow"
  {...restProps}
>
  <ChevronDown class="relative size-4.5 sm:size-4" />
</SelectPrimitive.ScrollDownArrow>

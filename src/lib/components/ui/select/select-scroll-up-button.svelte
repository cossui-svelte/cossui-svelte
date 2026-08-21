<script lang="ts">
  import ChevronUp from '@lucide/svelte/icons/chevron-up';
  import { Select as SelectPrimitive } from '@shardsui/svelte/select';
  import type { ComponentProps } from 'svelte';
  import { cn } from '$lib/utils';

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: Omit<ComponentProps<typeof SelectPrimitive.ScrollUpArrow>, 'children'> = $props();
</script>

<SelectPrimitive.ScrollUpArrow
  bind:ref
  class={cn(
    'top-0 z-50 flex h-6 w-full cursor-default items-center justify-center before:pointer-events-none before:absolute before:inset-x-px before:top-px before:h-[200%] before:rounded-t-[calc(var(--radius-lg)-1px)] before:bg-linear-to-b before:from-50% before:from-popover',
    className
  )}
  data-slot="select-scroll-up-arrow"
  {...restProps}
>
  <ChevronUp class="relative size-4.5 sm:size-4" />
</SelectPrimitive.ScrollUpArrow>

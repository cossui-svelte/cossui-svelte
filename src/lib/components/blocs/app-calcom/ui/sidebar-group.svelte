<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn, type WithElementRef } from '#lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
  bind:this={ref}
  class={cn('relative flex w-full min-w-0 flex-col px-1 py-2', className)}
  data-sidebar="group"
  data-slot="sidebar-group"
  {...restProps}
>
  {@render children?.()}
</div>

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
  class={cn('flex flex-col gap-2 px-1 py-2 lg:px-2', className)}
  data-sidebar="header"
  data-slot="sidebar-header"
  {...restProps}
>
  {@render children?.()}
</div>

<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn, type WithElementRef } from '#lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLUListElement>, HTMLUListElement> = $props();
</script>

<ul
  bind:this={ref}
  class={cn(
    'mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-sidebar-border border-l px-2.5 py-0.5',
    className
  )}
  data-sidebar="menu-sub"
  data-slot="sidebar-menu-sub"
  {...restProps}
>
  {@render children?.()}
</ul>

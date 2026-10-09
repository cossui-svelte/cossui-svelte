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
  class={cn('flex min-w-0 flex-col gap-1 lg:w-full', className)}
  data-sidebar="menu"
  data-slot="sidebar-menu"
  {...restProps}
>
  {@render children?.()}
</ul>

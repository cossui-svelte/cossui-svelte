<script lang="ts">
  import type { HTMLLiAttributes } from 'svelte/elements';
  import { cn, type WithElementRef } from '#lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLLiAttributes, HTMLLIElement> = $props();
</script>

<li
  bind:this={ref}
  class={cn('group/menu-sub-item relative', className)}
  data-sidebar="menu-sub-item"
  data-slot="sidebar-menu-sub-item"
  {...restProps}
>
  {@render children?.()}
</li>

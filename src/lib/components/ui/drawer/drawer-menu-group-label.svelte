<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn, type WithElementRef } from '$lib/utils';

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
  bind:this={ref}
  class={cn('px-2 py-1.5 font-medium text-muted-foreground text-xs', className)}
  data-slot="drawer-menu-group-label"
  {...restProps}
>
  {@render children?.()}
</div>

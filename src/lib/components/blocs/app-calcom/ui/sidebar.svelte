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
  class="group peer hidden w-(--sidebar-width) text-sidebar-foreground md:block"
  data-slot="sidebar"
>
  <div
    bind:this={ref}
    class={cn('fixed inset-y-0 h-svh w-(--sidebar-width) pt-2', className)}
    data-slot="sidebar-container"
    {...restProps}
  >
    <div class="flex h-full w-full flex-col" data-sidebar="sidebar" data-slot="sidebar-inner">
      {@render children?.()}
    </div>
  </div>
</div>

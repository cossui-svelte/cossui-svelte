<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { TooltipProvider } from '#lib/components/ui/tooltip/index.js';
  import { cn, type WithElementRef } from '#lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<TooltipProvider delay={150} closeDelay={0}>
  <div
    bind:this={ref}
    class={cn(
      'group/sidebar-wrapper isolate flex min-h-svh w-full bg-sidebar [--sidebar-width:4rem] lg:[--sidebar-width:16rem] 2xl:[--sidebar-width:18rem]',
      className
    )}
    data-slot="sidebar-wrapper"
    {...restProps}
  >
    {@render children?.()}
  </div>
</TooltipProvider>

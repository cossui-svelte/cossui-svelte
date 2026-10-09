<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { ScrollArea } from '#lib/components/ui/scroll-area/index.js';
  import { cn, type WithElementRef } from '#lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<ScrollArea class="min-h-0 flex-1" fill overscrollContain scrollFade>
  <div
    bind:this={ref}
    class={cn('flex h-full flex-col gap-2 px-2', className)}
    data-sidebar="content"
    data-slot="sidebar-content"
    {...restProps}
  >
    {@render children?.()}
  </div>
</ScrollArea>

<script lang="ts">
  import { Tooltip as TooltipPrimitive } from '@shardsui/svelte/tooltip';
  import type { ComponentProps, Snippet } from 'svelte';
  import { cn, type WithoutChildren } from '$lib/utils';

  type Props = Omit<ComponentProps<typeof TooltipPrimitive.Popup>, 'children'> & {
    children?: Snippet;
    side?: ComponentProps<typeof TooltipPrimitive.Positioner>['side'];
    align?: ComponentProps<typeof TooltipPrimitive.Positioner>['align'];
    sideOffset?: ComponentProps<typeof TooltipPrimitive.Positioner>['sideOffset'];
    alignOffset?: ComponentProps<typeof TooltipPrimitive.Positioner>['alignOffset'];
    customAnchor?: ComponentProps<typeof TooltipPrimitive.Positioner>['anchor'];
    showArrow?: boolean;
    portalProps?: WithoutChildren<ComponentProps<typeof TooltipPrimitive.Portal>>;
  };

  let {
    ref = $bindable(null),
    class: className,
    children,
    showArrow = false,
    side = 'top',
    align = 'center',
    sideOffset = 4,
    alignOffset = 0,
    customAnchor,
    portalProps,
    ...restProps
  }: Props = $props();
</script>

<TooltipPrimitive.Portal {...portalProps}>
  <TooltipPrimitive.Positioner
    {side}
    {align}
    {sideOffset}
    {alignOffset}
    anchor={customAnchor}
    class="z-50 h-(--positioner-height) w-(--positioner-width) max-w-(--available-width) transition-[top,left,right,bottom,transform] data-instant:transition-none"
    data-slot="tooltip-positioner"
  >
    <TooltipPrimitive.Popup
      bind:ref
      class={cn(
        'relative flex h-(--popup-height,auto) w-(--popup-width,auto) max-w-70 rounded-md border bg-popover not-dark:bg-clip-padding text-popover-foreground text-xs',
        'origin-(--transform-origin) text-balance shadow-md/5',
        'transition-[width,height,scale,opacity] duration-150 ease-out data-starting-style:scale-95 data-starting-style:opacity-0 data-ending-style:scale-95 data-ending-style:opacity-0 data-instant:duration-0',
        'before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-md)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] dark:before:shadow-[0_-1px_--theme(--color-white/6%)]',
        className
      )}
      data-slot="tooltip-popup"
      {...restProps}
    >
      <TooltipPrimitive.Viewport
        class="relative size-full overflow-clip px-(--viewport-inline-padding) py-1 [--viewport-inline-padding:--spacing(2)] data-instant:transition-none **:data-current:data-ending-style:opacity-0 **:data-current:data-starting-style:opacity-0 **:data-previous:data-ending-style:opacity-0 **:data-previous:data-starting-style:opacity-0 **:data-current:w-[calc(var(--popup-width)-2*var(--viewport-inline-padding)-2px)] **:data-previous:w-[calc(var(--popup-width)-2*var(--viewport-inline-padding)-2px)] **:data-previous:truncate **:data-current:opacity-100 **:data-previous:opacity-100 **:data-current:transition-opacity **:data-previous:transition-opacity"
        data-slot="tooltip-viewport"
      >
        {@render children?.()}
      </TooltipPrimitive.Viewport>
      {#if showArrow}
        <TooltipPrimitive.Arrow
          class="text-popover -my-px drop-shadow-[0_1px_0_hsl(var(--border))] data-[side=bottom]:-top-1.75 data-[side=bottom]:rotate-180 data-[side=left]:-right-2.75 data-[side=left]:-rotate-90 data-[side=right]:-left-2.75 data-[side=right]:rotate-90 data-[side=top]:-bottom-1.75"
        >
          <svg viewBox="0 0 30 10" width="10" height="5" preserveAspectRatio="none">
            <polygon points="0,0 30,0 15,10" fill="currentColor" />
          </svg>
        </TooltipPrimitive.Arrow>
      {/if}
    </TooltipPrimitive.Popup>
  </TooltipPrimitive.Positioner>
</TooltipPrimitive.Portal>

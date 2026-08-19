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
    class="z-50"
  >
    <TooltipPrimitive.Popup
      bind:ref
      class={cn(
        'relative max-w-70 rounded-md border bg-popover px-2 py-1 text-popover-foreground text-xs',
        'origin-(--transform-origin)',
        'transition-[scale,opacity] duration-150 ease-out data-starting-style:scale-95 data-starting-style:opacity-0 data-ending-style:scale-95 data-ending-style:opacity-0',
        className
      )}
      data-slot="tooltip-popup"
      {...restProps}
    >
      {@render children?.()}
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

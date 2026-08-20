<script lang="ts">
  import { Popover as PopoverPrimitive } from '@shardsui/svelte/popover';
  import type { ComponentProps, Snippet } from 'svelte';
  import { cn, type WithoutChildren } from '$lib/utils';

  type Props = Omit<ComponentProps<typeof PopoverPrimitive.Popup>, 'children'> & {
    children?: Snippet;
    side?: ComponentProps<typeof PopoverPrimitive.Positioner>['side'];
    align?: ComponentProps<typeof PopoverPrimitive.Positioner>['align'];
    sideOffset?: ComponentProps<typeof PopoverPrimitive.Positioner>['sideOffset'];
    alignOffset?: ComponentProps<typeof PopoverPrimitive.Positioner>['alignOffset'];
    customAnchor?: ComponentProps<typeof PopoverPrimitive.Positioner>['anchor'];
    showArrow?: boolean;
    tooltipStyle?: boolean;
    portalProps?: WithoutChildren<ComponentProps<typeof PopoverPrimitive.Portal>>;
  };

  let {
    ref = $bindable(null),
    class: className,
    children,
    tooltipStyle = false,
    side = 'bottom',
    align = 'center',
    showArrow = false,
    sideOffset = 4,
    alignOffset = 0,
    customAnchor,
    portalProps,
    ...restProps
  }: Props = $props();
</script>

<PopoverPrimitive.Portal {...portalProps}>
  <PopoverPrimitive.Positioner
    {side}
    {align}
    {sideOffset}
    {alignOffset}
    anchor={customAnchor}
    class="z-50 h-(--positioner-height) w-(--positioner-width) max-w-(--available-width) transition-[top,left,right,bottom,transform] data-instant:transition-none"
    data-slot="popover-positioner"
  >
    <PopoverPrimitive.Popup
      bind:ref
      class={cn(
        'relative flex h-(--popup-height,auto) w-(--popup-width,auto) rounded-lg border bg-popover not-dark:bg-clip-padding text-popover-foreground shadow-lg/5 outline-none',
        'origin-(--transform-origin)',
        'transition-[width,height,scale,opacity] duration-150 ease-out data-starting-style:scale-98 data-starting-style:opacity-0 data-ending-style:scale-98 data-ending-style:opacity-0',
        'before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] dark:before:shadow-[0_-1px_--theme(--color-white/6%)]',
        'has-data-[slot=calendar]:rounded-xl has-data-[slot=calendar]:before:rounded-[calc(var(--radius-xl)-1px)]',
        tooltipStyle &&
          'w-fit text-balance rounded-md text-xs shadow-md/5 before:rounded-[calc(var(--radius-md)-1px)]',
        className
      )}
      data-slot="popover-popup"
      {...restProps}
    >
      {#if showArrow}
        <PopoverPrimitive.Arrow
          class="text-popover -my-px drop-shadow-[0_1px_0_hsl(var(--border))] data-[side=bottom]:-top-1.75 data-[side=bottom]:rotate-180 data-[side=left]:-right-2.75 data-[side=left]:-rotate-90 data-[side=right]:-left-2.75 data-[side=right]:rotate-90 data-[side=top]:-bottom-1.75"
        >
          <svg viewBox="0 0 30 10" width="10" height="5" preserveAspectRatio="none">
            <polygon points="0,0 30,0 15,10" fill="currentColor" />
          </svg>
        </PopoverPrimitive.Arrow>
      {/if}
      <PopoverPrimitive.Viewport
        class={cn(
          'relative size-full max-h-(--available-height) overflow-clip px-(--viewport-inline-padding) py-4 [--viewport-inline-padding:--spacing(4)] has-data-[slot=calendar]:p-2',
          'data-instant:transition-none **:data-current:data-ending-style:opacity-0 **:data-current:data-starting-style:opacity-0 **:data-previous:data-ending-style:opacity-0 **:data-previous:data-starting-style:opacity-0',
          '**:data-current:w-[calc(var(--popup-width)-2*var(--viewport-inline-padding)-2px)] **:data-previous:w-[calc(var(--popup-width)-2*var(--viewport-inline-padding)-2px)] **:data-current:opacity-100 **:data-previous:opacity-100 **:data-current:transition-opacity **:data-previous:transition-opacity',
          tooltipStyle
            ? 'py-1 [--viewport-inline-padding:--spacing(2)]'
            : 'not-data-transitioning:overflow-y-auto'
        )}
        data-slot="popover-viewport"
      >
        {@render children?.()}
      </PopoverPrimitive.Viewport>
    </PopoverPrimitive.Popup>
  </PopoverPrimitive.Positioner>
</PopoverPrimitive.Portal>

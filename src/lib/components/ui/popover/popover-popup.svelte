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
    class="z-50"
  >
    <PopoverPrimitive.Popup
      bind:ref
      class={cn(
        'relative rounded-lg border bg-popover not-dark:bg-clip-padding text-popover-foreground shadow-lg/5 outline-none',
        'origin-(--transform-origin)',
        'transition-[scale,opacity] duration-150 ease-out data-starting-style:scale-98 data-starting-style:opacity-0 data-ending-style:scale-98 data-ending-style:opacity-0',
        'before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] dark:before:shadow-[0_-1px_--theme(--color-white/6%)]',
        'has-data-[slot=calendar]:rounded-xl has-data-[slot=calendar]:before:rounded-[calc(var(--radius-xl)-1px)]',
        tooltipStyle
          ? 'w-fit text-balance rounded-md px-2 py-1 text-xs shadow-md/5 before:rounded-[calc(var(--radius-md)-1px)]'
          : 'px-4 py-4 has-data-[slot=calendar]:p-2',
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
      {@render children?.()}
    </PopoverPrimitive.Popup>
  </PopoverPrimitive.Positioner>
</PopoverPrimitive.Portal>

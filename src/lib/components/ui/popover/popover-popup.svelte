<script lang="ts">
import type { Popover as PopoverPrimitive } from 'bits-ui';
import type { Snippet } from 'svelte';
import { cn } from '$lib/utils.js';

interface Props extends PopoverPrimitive.ContentProps {
  children?: Snippet;
  tooltipStyle?: boolean;
  side?: PopoverPrimitive.ContentProps['side'];
  align?: PopoverPrimitive.ContentProps['align'];
  sideOffset?: number;
  alignOffset?: number;
  showArrow?: boolean;
}

let {
  class: className,
  children,
  tooltipStyle = false,
  side = 'bottom',
  align = 'center',
  showArrow = false,
  sideOffset = 4,
  alignOffset = 0,
  ...restProps
}: Props = $props();
</script>

<PopoverPrimitive.Portal>
  <PopoverPrimitive.Content
    {side}
    {align}
    {sideOffset}
    {alignOffset}
    class={cn(
      "relative flex h-(--popup-height,auto) w-(--popup-width,auto) origin-(--transform-origin) rounded-lg border bg-popover not-dark:bg-clip-padding text-popover-foreground shadow-lg/5 outline-none transition-[width,height,scale,opacity] before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] has-data-[slot=calendar]:rounded-xl has-data-[slot=calendar]:before:rounded-[calc(var(--radius-xl)-1px)] data-starting-style:scale-98 data-starting-style:opacity-0 dark:before:shadow-[0_-1px_--theme(--color-white/6%)]",
      tooltipStyle &&
        "w-fit text-balance rounded-md text-xs shadow-md/5 before:rounded-[calc(var(--radius-md)-1px)]",
      className,
    )}
    data-slot="popover-popup"
    {...restProps}
  >
    <div
      class={cn(
        "relative size-full max-h-(--available-height) overflow-clip px-(--viewport-inline-padding) py-4 [--viewport-inline-padding:--spacing(4)] has-data-[slot=calendar]:p-2 data-instant:transition-none **:data-current:data-ending-style:opacity-0 **:data-current:data-starting-style:opacity-0 **:data-previous:data-ending-style:opacity-0 **:data-previous:data-starting-style:opacity-0 **:data-current:w-[calc(var(--popup-width)-2*var(--viewport-inline-padding)-2px)] **:data-previous:w-[calc(var(--popup-width)-2*var(--viewport-inline-padding)-2px)] **:data-current:opacity-100 **:data-previous:opacity-100 **:data-current:transition-opacity **:data-previous:transition-opacity",
        tooltipStyle
          ? "py-1 [--viewport-inline-padding:--spacing(2)]"
          : "not-data-transitioning:overflow-y-auto",
      )}
      data-slot="popover-viewport"
    >
      {#if showArrow}
        <PopoverPrimitive.Arrow
          class="text-popover -my-px drop-shadow-[0_1px_0_hsl(var(--border))]"
        />
      {/if}
      {@render children?.()}
    </div>
  </PopoverPrimitive.Content>
</PopoverPrimitive.Portal>

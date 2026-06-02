<script lang="ts">
  import type { Snippet } from "svelte";
  import { Popover as PopoverPrimitive, type WithoutChildren } from "bits-ui";
  import { cn } from "$lib/utils.js";

  interface Props extends WithoutChildren<PopoverPrimitive.ContentProps> {
    children?: Snippet;
    tooltipStyle?: boolean;
    showArrow?: boolean;
    portalProps?: PopoverPrimitive.PortalProps;
  }

  let {
    ref = $bindable(null),
    class: className,
    children,
    tooltipStyle = false,
    side = "bottom",
    align = "center",
    showArrow = false,
    sideOffset = 4,
    alignOffset = 0,
    portalProps,
    ...restProps
  }: Props = $props();
</script>

<PopoverPrimitive.Portal {...portalProps}>
  <PopoverPrimitive.Content
    bind:ref
    {side}
    {align}
    {sideOffset}
    {alignOffset}
    class={cn(
      "relative z-50 rounded-lg border bg-popover not-dark:bg-clip-padding text-popover-foreground shadow-lg/5 outline-none",
      "origin-[--bits-popover-content-transform-origin]",
      "transition-[scale,opacity] data-[state=closed]:scale-98 data-[state=closed]:opacity-0 data-[state=open]:scale-100 data-[state=open]:opacity-100",
      "before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] dark:before:shadow-[0_-1px_--theme(--color-white/6%)]",
      "has-data-[slot=calendar]:rounded-xl has-data-[slot=calendar]:before:rounded-[calc(var(--radius-xl)-1px)]",
      tooltipStyle
        ? "w-fit text-balance rounded-md px-2 py-1 text-xs shadow-md/5 before:rounded-[calc(var(--radius-md)-1px)]"
        : "px-4 py-4 has-data-[slot=calendar]:p-2",
      className,
    )}
    data-slot="popover-popup"
    {...restProps}
  >
    {#if showArrow}
      <PopoverPrimitive.Arrow
        class="text-popover -my-px drop-shadow-[0_1px_0_hsl(var(--border))]"
      />
    {/if}
    {@render children?.()}
  </PopoverPrimitive.Content>
</PopoverPrimitive.Portal>

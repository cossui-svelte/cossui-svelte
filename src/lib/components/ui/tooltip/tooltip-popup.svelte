<script lang="ts">
  import type { Snippet } from "svelte";
  import { Tooltip } from "bits-ui";
  import { cn } from "$lib/utils";

  interface Props extends Tooltip.ContentProps {
    children?: Snippet;
    sideOffset?: number;
    showArrow?: boolean;
  }

  let {
    ref = $bindable(null),
    class: className,
    showArrow = false,
    children,
    sideOffset = 4,
    ...restProps
  }: Props = $props();
</script>

<!-- <Tooltip.Portal>
  <Tooltip.Content
    {sideOffset}
    class={cn(
      "relative flex origin-[--bits-tooltip-content-transform-origin] text-balance rounded-md border bg-popover not-dark:bg-clip-padding text-popover-foreground text-xs shadow-md/5 transition-[scale,opacity] before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-md)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] data-[state=closed]:scale-98 data-[state=closed]:opacity-0 data-[state=open]:scale-100 data-[state=open]:opacity-100 dark:before:shadow-[0_-1px_--theme(--color-white/6%)]",
      className,
    )}
    data-slot="tooltip-popup"
    {...restProps}
  >
    <div
      class="relative size-full overflow-clip px-2 py-1"
      data-slot="tooltip-viewport"
    >
      {@render children?.()}
    </div>
  </Tooltip.Content>
</Tooltip.Portal> -->

<Tooltip.Portal>
  <Tooltip.Content
    {ref}
    {sideOffset}
    class={cn(
      "bg-popover text-popover-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-w-70 rounded-md border px-3 py-1.5 text-sm",
      className,
    )}
    {...restProps}
  >
    {@render children?.()}
    {#if showArrow}
      <Tooltip.Arrow
        class="text-popover -my-px drop-shadow-[0_1px_0_hsl(var(--border))]"
      />
    {/if}
  </Tooltip.Content>
</Tooltip.Portal>

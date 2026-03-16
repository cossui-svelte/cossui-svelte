<script lang="ts">
  import type { Snippet } from "svelte";
  import { Tooltip } from "bits-ui";
  import { cn } from "$lib/utils.js";

  interface Props extends Tooltip.ContentProps {
    children?: Snippet;
    sideOffset?: number;
  }

  let {
    class: className,
    children,
    sideOffset = 4,
    ...restProps
  }: Props = $props();
</script>

<Tooltip.Portal>
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
</Tooltip.Portal>

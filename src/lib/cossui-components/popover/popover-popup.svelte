<script lang="ts">
  import type { Snippet } from "svelte";
  import { Popover } from "bits-ui";
  import { cn } from "../../utils.js";

  interface Props extends Popover.ContentProps {
    children?: Snippet;
    tooltipStyle?: boolean;
  }

  let {
    class: className,
    children,
    tooltipStyle = false,
    ...restProps
  }: Props = $props();
</script>

<Popover.Portal>
  <Popover.Content
    class={cn(
      "relative flex origin-[--bits-popover-content-transform-origin] rounded-lg border bg-popover not-dark:bg-clip-padding text-popover-foreground shadow-lg/5 outline-none transition-[width,height,scale,opacity] before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] data-[state=closed]:scale-98 data-[state=closed]:opacity-0 data-[state=open]:scale-100 data-[state=open]:opacity-100 dark:before:shadow-[0_-1px_--theme(--color-white/6%)]",
      tooltipStyle &&
        "w-fit text-balance rounded-md text-xs shadow-md/5 before:rounded-[calc(var(--radius-md)-1px)]",
      className,
    )}
    data-slot="popover-popup"
    {...restProps}
  >
    <div
      class={cn(
        "relative size-full max-h-[var(--bits-popover-content-available-height)] overflow-y-auto px-4 py-4",
        tooltipStyle ? "py-1 px-2" : "",
      )}
      data-slot="popover-viewport"
    >
      {@render children?.()}
    </div>
  </Popover.Content>
</Popover.Portal>

<script lang="ts">
  import type { Snippet } from "svelte";
  import { Combobox } from "bits-ui";
  import { cn } from "$lib/utils";

  interface Props extends Combobox.ContentProps {
    children?: Snippet;
    align?: "start" | "center" | "end";
    sideOffset?: number;
    alignOffset?: number;
    side?: "top" | "right" | "bottom" | "left";
  }

  let {
    class: className,
    children,
    side = "bottom",
    sideOffset = 4,
    alignOffset,
    align = "start",
    ...restProps
  }: Props = $props();
</script>

<Combobox.Portal>
  <Combobox.Content
    class={cn(
      "relative flex max-h-full min-w-(--bits-combobox-anchor-width) max-w-(--bits-combobox-content-available-width) origin-[--bits-combobox-content-transform-origin] rounded-lg border bg-popover not-dark:bg-clip-padding shadow-lg/5 transition-[scale,opacity] before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] data-[state=closed]:scale-98 data-[state=closed]:opacity-0 data-[state=open]:scale-100 data-[state=open]:opacity-100 dark:before:shadow-[0_-1px_--theme(--color-white/6%)]",
      "z-50 select-none",
      className,
    )}
    data-slot="combobox-popup"
    {side}
    {sideOffset}
    {alignOffset}
    {align}
    {...restProps}
  >
    <div
      class="flex max-h-[min(var(--bits-combobox-content-available-height),23rem)] flex-1 flex-col text-foreground"
    >
      {@render children?.()}
    </div>
  </Combobox.Content>
</Combobox.Portal>

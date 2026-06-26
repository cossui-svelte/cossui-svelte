<script lang="ts">
  import { Combobox } from "bits-ui";
  import type { Snippet } from "svelte";
  import { ScrollArea } from "$lib/components/ui/scroll-area";
  import { cn } from "$lib/utils";

  interface Props extends Combobox.ContentProps {
    align?: "start" | "center" | "end";
    alignOffset?: number;
    children?: Snippet;
    side?: "top" | "right" | "bottom" | "left";
    sideOffset?: number;
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
      "relative flex max-h-full min-w-(--bits-combobox-anchor-width) max-w-(--bits-combobox-content-available-width) origin-[--bits-combobox-content-transform-origin] overflow-hidden rounded-lg border bg-popover not-dark:bg-clip-padding shadow-lg/5 transition-[scale,opacity] before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] data-[state=closed]:scale-98 data-[state=closed]:opacity-0 data-[state=open]:scale-100 data-[state=open]:opacity-100 dark:before:shadow-[0_-1px_--theme(--color-white/6%)]",
      "z-50 select-none",
      className,
    )}
    data-slot="autocomplete-popup"
    {side}
    {sideOffset}
    {alignOffset}
    {align}
    {...restProps}
  >
    <ScrollArea
      class="max-h-[min(var(--bits-combobox-content-available-height),23rem)] text-foreground"
      scrollbarGutter
      scrollFade
    >
      {@render children?.()}
    </ScrollArea>
  </Combobox.Content>
</Combobox.Portal>

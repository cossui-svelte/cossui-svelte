<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { ScrollArea } from "$lib/components/ui/scroll-area";
  import { cn } from "$lib/utils";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    children?: Snippet;
    scrollFade?: boolean;
  }

  let {
    class: className,
    children,
    scrollFade = true,
    ...restProps
  }: Props = $props();
</script>

<ScrollArea {scrollFade}>
  <div
    class={cn(
      "p-6 in-[[data-slot=dialog-popup]:has([data-slot=dialog-header])]:pt-1 in-[[data-slot=dialog-popup]:has([data-slot=dialog-footer]:not(.border-t))]:pb-1",
      className,
    )}
    data-slot="dialog-panel"
    {...restProps}
  >
    {@render children?.()}
  </div>
</ScrollArea>

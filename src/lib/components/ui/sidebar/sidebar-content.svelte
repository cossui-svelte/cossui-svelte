<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { ScrollArea } from "$lib/components/ui/scroll-area";
  import { cn } from "$lib/utils.js";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    children?: Snippet;
  }

  let { class: className, children, ...restProps }: Props = $props();
</script>

<ScrollArea class="**:data-[slot=scroll-area-scrollbar]:hidden" scrollFade>
  <div
    class={cn(
      "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
      className,
    )}
    data-sidebar="content"
    data-slot="sidebar-content"
    {...restProps}
  >
    {@render children?.()}
  </div>
</ScrollArea>

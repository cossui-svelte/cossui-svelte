<script lang="ts">
  import type { Snippet } from "svelte";
  import { ScrollArea } from "bits-ui";
  import { cn } from "$lib/utils.js";

  type Props = ScrollArea.RootProps & {
    children?: Snippet;
    scrollFade?: boolean;
    scrollbarGutter?: boolean;
  };

  let {
    class: className,
    children,
    scrollFade = false,
    scrollbarGutter = false,
    ...restProps
  }: Props = $props();
</script>

<ScrollArea.Root class={cn("size-full min-h-0", className)} {...restProps}>
  <ScrollArea.Viewport
    class={cn(
      "h-full rounded-[inherit] outline-none",
      scrollFade &&
        "mask-t-from-[calc(100%-min(var(--fade-size),var(--scroll-area-overflow-y-start)))] mask-b-from-[calc(100%-min(var(--fade-size),var(--scroll-area-overflow-y-end)))] [--fade-size:1.5rem]",
      scrollbarGutter && "data-[scroll-area-overflow-y]:pe-2.5",
    )}
    data-slot="scroll-area-viewport"
  >
    {@render children?.()}
  </ScrollArea.Viewport>
  <ScrollArea.Scrollbar
    class="m-1 flex opacity-0 transition-opacity delay-300 data-[orientation=horizontal]:h-1.5 data-[orientation=vertical]:w-1.5 data-[orientation=horizontal]:flex-col data-[state=visible]:opacity-100 data-[state=visible]:delay-0 data-[state=visible]:duration-100"
    data-slot="scroll-area-scrollbar"
    orientation="vertical"
  >
    <ScrollArea.Thumb
      class="relative flex-1 rounded-full bg-foreground/20"
      data-slot="scroll-area-thumb"
    />
  </ScrollArea.Scrollbar>
  <ScrollArea.Scrollbar
    class="m-1 flex opacity-0 transition-opacity delay-300 data-[orientation=horizontal]:h-1.5 data-[orientation=vertical]:w-1.5 data-[orientation=horizontal]:flex-col data-[state=visible]:opacity-100 data-[state=visible]:delay-0 data-[state=visible]:duration-100"
    data-slot="scroll-area-scrollbar"
    orientation="horizontal"
  >
    <ScrollArea.Thumb
      class="relative flex-1 rounded-full bg-foreground/20"
      data-slot="scroll-area-thumb"
    />
  </ScrollArea.Scrollbar>
  <ScrollArea.Corner data-slot="scroll-area-corner" />
</ScrollArea.Root>

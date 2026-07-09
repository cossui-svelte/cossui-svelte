<script lang="ts">
  import { Command } from "bits-ui";
  import type { Snippet } from "svelte";
  import { ScrollArea } from "$lib/components/ui/scroll-area";
  import { cn } from "$lib/utils";

  type Props = Command.ListProps & { children?: Snippet };

  let { class: className, children, ...restProps }: Props = $props();
</script>

<Command.List
  class={cn(
    "min-h-0 flex-1 **:data-[slot=scroll-area-viewport]:scroll-py-2",
    className,
  )}
  data-slot="command-list"
  {...restProps}
>
  <ScrollArea scrollFade scrollbarGutter>
    <Command.Viewport class="not-empty:p-2">
      {@render children?.()}
    </Command.Viewport>
  </ScrollArea>
</Command.List>

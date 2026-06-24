<script lang="ts">
  import ChevronDown from "@lucide/svelte/icons/chevron-down";
  import Trash from "@lucide/svelte/icons/trash";
  import { Button, buttonVariants } from "$lib/components/ui/button";
  import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from "$lib/components/ui/collapsible";
  import { Frame, FrameHeader, FramePanel } from "$lib/components/ui/frame";
  import { cn } from "$lib/utils";
</script>

<Frame class="w-full">
  <Collapsible>
    <FrameHeader class="flex-row items-center justify-between px-2 py-2">
      <CollapsibleTrigger class={cn(buttonVariants({ variant: "ghost" }), "data-[state=open]:[&_svg]:rotate-180")}>
        <ChevronDown class="size-4" aria-hidden />
        Section header
      </CollapsibleTrigger>
      <Button aria-label="Delete" size="icon" variant="ghost">
        <Trash aria-hidden />
      </Button>
    </FrameHeader>
    <CollapsiblePanel>
      <FramePanel>
        <h2 class="font-semibold text-sm">Section title</h2>
        <p class="text-muted-foreground text-sm">Section description</p>
      </FramePanel>
    </CollapsiblePanel>
  </Collapsible>
</Frame>

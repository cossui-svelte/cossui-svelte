<script lang="ts">
    import ChevronDownIcon from "@lucide/svelte/icons/chevron-down";
    import {
        Collapsible,
        CollapsiblePanel,
        CollapsibleTrigger,
    } from "$lib/components/ui/collapsible";
    import { Frame, FrameHeader, FramePanel } from "$lib/components/ui/frame";
    import TrashIcon from "@lucide/svelte/icons/trash";
    import { Button } from "$lib/components/ui/button";
</script>

<Frame class="w-full">
    <Collapsible>
        <FrameHeader class="flex-row items-center justify-between px-2 py-2">
            <CollapsibleTrigger class="data-panel-open:[&_svg]:rotate-180">
                <Button variant="ghost">
                    <ChevronDownIcon class="size-4" />
                    Section header</Button
                >
            </CollapsibleTrigger>
            <Button aria-label="Delete" size="icon" variant="ghost">
                <TrashIcon />
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

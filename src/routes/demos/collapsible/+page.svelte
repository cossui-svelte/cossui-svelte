<script lang="ts">
    import ComponentPreviewTabs from "$lib/components/app/docs/component-preview-tabs.svelte";
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

<ComponentPreviewTabs>
    <Collapsible>
        <CollapsibleTrigger
            class="inline-flex items-center gap-2 font-medium text-sm data-[state=open]:[&_svg]:rotate-180"
        >
            Show recovery keys
            <ChevronDownIcon class="size-4" />
        </CollapsibleTrigger>
        <CollapsiblePanel>
            <ul class="flex flex-col gap-1 py-2 text-muted-foreground text-sm">
                <li class="rounded-sm bg-muted px-2 py-1 font-mono">
                    4829-1735-6621
                </li>
                <li class="rounded-sm bg-muted px-2 py-1 font-mono">
                    9182-6407-5532
                </li>
                <li class="rounded-sm bg-muted px-2 py-1 font-mono">
                    3051-7924-9018
                </li>
            </ul>
        </CollapsiblePanel>
    </Collapsible>
</ComponentPreviewTabs>
<ComponentPreviewTabs>
    <Frame class="w-full">
        <Collapsible>
            <FrameHeader
                class="flex-row items-center justify-between px-2 py-2"
            >
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
                    <p class="text-muted-foreground text-sm">
                        Section description
                    </p>
                </FramePanel>
            </CollapsiblePanel>
        </Collapsible>
    </Frame>
</ComponentPreviewTabs>

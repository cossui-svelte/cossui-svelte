<script>
    import ComponentPreviewTabs from "$lib/components/app/component-preview-tabs.svelte";
    import {
        Frame,
        FrameDescription,
        FrameFooter,
        FrameHeader,
        FramePanel,
        FrameTitle,
    } from "$lib/components/ui/frame";
</script>

<ComponentPreviewTabs>
    <Frame class="w-full">
        <FrameHeader>
            <FrameTitle>Section header</FrameTitle>
            <FrameDescription
                >Brief description about the section</FrameDescription
            >
        </FrameHeader>
        <FramePanel>
            <h2 class="font-semibold text-sm">Section title</h2>
            <p class="text-muted-foreground text-sm">Section description</p>
        </FramePanel>
        <FrameFooter>
            <p class="text-muted-foreground text-sm">Footer</p>
        </FrameFooter>
    </Frame>
</ComponentPreviewTabs>
<ComponentPreviewTabs>
    <Frame class="w-full">
        <FrameHeader>
            <FrameTitle>Section header</FrameTitle>
            <FrameDescription
                >Brief description about the section</FrameDescription
            >
        </FrameHeader>
        <FramePanel>
            <h2 class="font-semibold text-sm">Separated panel</h2>
            <p class="text-muted-foreground text-sm">Section description</p>
        </FramePanel>
        <FramePanel>
            <h2 class="font-semibold text-sm">Separated panel</h2>
            <p class="text-muted-foreground text-sm">Section description</p>
        </FramePanel>
    </Frame>
</ComponentPreviewTabs>

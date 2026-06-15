<script>
    import ComponentPreviewTabs from "$lib/components/app/docs/component-preview-tabs.svelte";
    import { Kbd, KbdGroup } from "$lib/components/ui/kbd";
</script>

<ComponentPreviewTabs>
    <div class="flex flex-col gap-4">
        <div>
            <p class="mb-2 text-muted-foreground text-sm">Single keys:</p>
            <div class="flex gap-2">
                <Kbd>K</Kbd>
                <Kbd>⌘</Kbd>
                <Kbd>⌃</Kbd>
                <Kbd>⇧</Kbd>
            </div>
        </div>
        <div>
            <p class="mb-2 text-muted-foreground text-sm">Key combinations:</p>
            <div class="flex gap-2">
                <KbdGroup>
                    <Kbd>⌘</Kbd>
                    <Kbd>K</Kbd>
                </KbdGroup>
                <KbdGroup>
                    <Kbd>⌘</Kbd>
                    <Kbd>Shift</Kbd>
                    <Kbd>P</Kbd>
                </KbdGroup>
                <KbdGroup>
                    <Kbd>Ctrl</Kbd>
                    <Kbd>Alt</Kbd>
                    <Kbd>Delete</Kbd>
                </KbdGroup>
            </div>
        </div>
    </div>
</ComponentPreviewTabs>

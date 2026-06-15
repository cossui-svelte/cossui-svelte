<script lang="ts">
    import ComponentPreviewTabs from "$lib/components/app/docs/component-preview-tabs.svelte";
    import {
        Tabs,
        TabsList,
        TabsTab,
        TabsPanel,
    } from "$lib/components/ui/tabs";
</script>

<ComponentPreviewTabs>
    default
    <Tabs value="tab-1">
        <TabsList>
            <TabsTab value="tab-1">Tab 1</TabsTab>
            <TabsTab value="tab-2">Tab 2</TabsTab>
            <TabsTab value="tab-3">Tab 3</TabsTab>
        </TabsList>
        <TabsPanel value="tab-1">
            <p class="p-4 text-center text-muted-foreground text-xs">
                Tab 1 content
            </p>
        </TabsPanel>
        <TabsPanel value="tab-2">
            <p class="p-4 text-center text-muted-foreground text-xs">
                Tab 2 content
            </p>
        </TabsPanel>
        <TabsPanel value="tab-3">
            <p class="p-4 text-center text-muted-foreground text-xs">
                Tab 3 content
            </p>
        </TabsPanel>
    </Tabs>
</ComponentPreviewTabs>
<ComponentPreviewTabs>
    underlined
    <Tabs value="tab-1">
        <div class="border-b">
            <TabsList variant="underline">
                <TabsTab value="tab-1">Tab 1</TabsTab>
                <TabsTab value="tab-2">Tab 2</TabsTab>
                <TabsTab value="tab-3">Tab 3</TabsTab>
            </TabsList>
        </div>
        <TabsPanel value="tab-1">
            <p class="p-4 text-center text-muted-foreground text-xs">
                Tab 1 content
            </p>
        </TabsPanel>
        <TabsPanel value="tab-2">
            <p class="p-4 text-center text-muted-foreground text-xs">
                Tab 2 content
            </p>
        </TabsPanel>
        <TabsPanel value="tab-3">
            <p class="p-4 text-center text-muted-foreground text-xs">
                Tab 3 content
            </p>
        </TabsPanel>
    </Tabs>
</ComponentPreviewTabs>
<ComponentPreviewTabs
    >Vertical Orientation

    <Tabs class="w-full" value="tab-1" orientation="vertical">
        <TabsList>
            <TabsTab value="tab-1">Tab 1</TabsTab>
            <TabsTab value="tab-2">Tab 2</TabsTab>
            <TabsTab value="tab-3">Tab 3</TabsTab>
        </TabsList>
        <TabsPanel value="tab-1">
            <p class="p-4 text-center text-muted-foreground text-xs">
                Tab 1 content
            </p>
        </TabsPanel>
        <TabsPanel value="tab-2">
            <p class="p-4 text-center text-muted-foreground text-xs">
                Tab 2 content
            </p>
        </TabsPanel>
        <TabsPanel value="tab-3">
            <p class="p-4 text-center text-muted-foreground text-xs">
                Tab 3 content
            </p>
        </TabsPanel>
    </Tabs>
</ComponentPreviewTabs>
<ComponentPreviewTabs
    >Underline with Vertical Orientation
    <Tabs class="w-full flex-row" value="tab-1" orientation="vertical">
        <div class="border-s">
            <TabsList variant="underline">
                <TabsTab value="tab-1">Tab 1</TabsTab>
                <TabsTab value="tab-2">Tab 2</TabsTab>
                <TabsTab value="tab-3">Tab 3</TabsTab>
            </TabsList>
        </div>
        <TabsPanel value="tab-1">
            <p class="p-4 text-center text-muted-foreground text-xs">
                Tab 1 content
            </p>
        </TabsPanel>
        <TabsPanel value="tab-2">
            <p class="p-4 text-center text-muted-foreground text-xs">
                Tab 2 content
            </p>
        </TabsPanel>
        <TabsPanel value="tab-3">
            <p class="p-4 text-center text-muted-foreground text-xs">
                Tab 3 content
            </p>
        </TabsPanel>
    </Tabs>
</ComponentPreviewTabs>

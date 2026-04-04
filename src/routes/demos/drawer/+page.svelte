<script lang="ts">
    import ComponentPreviewTabs from "$lib/components/app/ComponentPreviewTabs.svelte";
    import { Button } from "$lib/components/ui/button";
    import {
        Drawer,
        DrawerHeader,
        DrawerPanel,
        DrawerPopup,
        DrawerTitle,
        DrawerTrigger,
    } from "$lib/components/ui/drawer";
</script>

<ComponentPreviewTabs>
    <div class="flex flex-wrap gap-2">
        <Drawer position="right">
            <DrawerTrigger>
                <Button variant="outline">Right</Button>
            </DrawerTrigger>
            <DrawerPopup variant="inset">
                <DrawerHeader>
                    <DrawerTitle>Right</DrawerTitle>
                </DrawerHeader>
                <DrawerPanel>
                    <p class="text-muted-foreground text-sm">
                        Content from the right.
                    </p>
                </DrawerPanel>
            </DrawerPopup>
        </Drawer>

        <Drawer position="left">
            <DrawerTrigger>
                <Button variant="outline">Left</Button>
            </DrawerTrigger>
            <DrawerPopup variant="inset">
                <DrawerHeader>
                    <DrawerTitle>Left</DrawerTitle>
                </DrawerHeader>
                <DrawerPanel>
                    <p class="text-muted-foreground text-sm">
                        Content from the left.
                    </p>
                </DrawerPanel>
            </DrawerPopup>
        </Drawer>

        <Drawer position="top">
            <DrawerTrigger>
                <Button variant="outline">Top</Button>
            </DrawerTrigger>
            <DrawerPopup variant="inset">
                <DrawerHeader>
                    <DrawerTitle>Top</DrawerTitle>
                </DrawerHeader>
                <DrawerPanel>
                    <p class="text-muted-foreground text-sm">
                        Content from the top.
                    </p>
                </DrawerPanel>
            </DrawerPopup>
        </Drawer>

        <Drawer>
            <DrawerTrigger>
                <Button variant="outline">Bottom</Button>
            </DrawerTrigger>
            <DrawerPopup variant="inset">
                <DrawerHeader>
                    <DrawerTitle>Bottom</DrawerTitle>
                </DrawerHeader>
                <DrawerPanel>
                    <p class="text-muted-foreground text-sm">
                        Content from the bottom.
                    </p>
                </DrawerPanel>
            </DrawerPopup>
        </Drawer>
    </div>
</ComponentPreviewTabs>

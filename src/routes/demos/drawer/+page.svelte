<script lang="ts">
    import ComponentPreviewTabs from "$lib/components/app/component-preview-tabs.svelte";
    import { buttonVariants } from "$lib/components/ui/button";
    import {
        Drawer,
        DrawerHeader,
        DrawerPanel,
        DrawerPopup,
        DrawerTitle,
        DrawerTrigger,
    } from "$lib/components/ui/drawer-new";
</script>

<ComponentPreviewTabs>
    <div class="flex flex-wrap gap-2">
        <Drawer position="right">
            <DrawerTrigger class={buttonVariants({ variant: "outline" })}>
                Right
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
            <DrawerTrigger class={buttonVariants({ variant: "outline" })}>
                Left
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
            <DrawerTrigger class={buttonVariants({ variant: "outline" })}>
                Top
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
            <DrawerTrigger class={buttonVariants({ variant: "outline" })}>
                Bottom
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

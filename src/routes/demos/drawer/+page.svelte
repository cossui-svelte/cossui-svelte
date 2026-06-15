<script lang="ts">
    import ComponentPreviewTabs from "$lib/components/app/docs/component-preview-tabs.svelte";
    import { buttonVariants } from "$lib/components/ui/button";
    import {
        Drawer,
        DrawerClose,
        DrawerDescription,
        DrawerFooter,
        DrawerHeader,
        DrawerPanel,
        DrawerPopup,
        DrawerTitle,
        DrawerTrigger,
    } from "$lib/components/ui/drawer";
</script>

<ComponentPreviewTabs>
    <div class="flex flex-wrap gap-2">
        default
        <Drawer position="right">
            <DrawerTrigger class={buttonVariants({ variant: "outline" })}>
                Right
            </DrawerTrigger>
            <DrawerPopup variant="default">
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
            <DrawerPopup variant="default">
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
            <DrawerPopup variant="default">
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
            <DrawerPopup variant="default">
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

<ComponentPreviewTabs>
    <div class="flex flex-wrap gap-2">
        inset
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

<ComponentPreviewTabs>
    straight
    <div class="flex flex-wrap gap-2">
        <Drawer position="right">
            <DrawerTrigger class={buttonVariants({ variant: "outline" })}>
                Right
            </DrawerTrigger>
            <DrawerPopup variant="straight">
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
            <DrawerPopup variant="straight">
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
            <DrawerPopup variant="straight">
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
            <DrawerPopup variant="straight">
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
<ComponentPreviewTabs>
    <Drawer>
        <DrawerTrigger class={buttonVariants({ variant: "outline" })}>
            Nested drawers
        </DrawerTrigger>
        <DrawerPopup showBar>
            <DrawerHeader class="text-center">
                <DrawerTitle>First step</DrawerTitle>
                <DrawerDescription>
                    This is the first step. Tap the button below to continue to
                    the next screen.
                </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter
                class="justify-center sm:justify-center"
                variant="bare"
            >
                <DrawerClose class={buttonVariants({ variant: "ghost" })}
                    >Cancel</DrawerClose
                >
                <Drawer>
                    <DrawerTrigger
                        class={buttonVariants({ variant: "outline" })}
                    >
                        Continue
                    </DrawerTrigger>
                    <DrawerPopup showBar>
                        <DrawerHeader class="text-center">
                            <DrawerTitle>Second step</DrawerTitle>
                            <DrawerDescription>
                                You&apos;ve reached the second step. Tap the
                                button below to continue to the next screen.
                            </DrawerDescription>
                        </DrawerHeader>
                        <DrawerPanel>
                            <div class="flex justify-center">
                                <div
                                    class="size-48 shrink-0 rounded-xl border bg-muted"
                                ></div>
                            </div>
                        </DrawerPanel>
                        <DrawerFooter
                            class="justify-center sm:justify-center"
                            variant="bare"
                        >
                            <DrawerClose
                                class={buttonVariants({ variant: "ghost" })}
                            >
                                Back
                            </DrawerClose>
                            <Drawer>
                                <DrawerTrigger
                                    class={buttonVariants({
                                        variant: "outline",
                                    })}
                                >
                                    Continue
                                </DrawerTrigger>
                                <DrawerPopup showBar>
                                    <DrawerHeader class="text-center">
                                        <DrawerTitle>Third step</DrawerTitle>
                                        <DrawerDescription>
                                            You&apos;ve reached the final step.
                                            You can close this drawer or go
                                            back.
                                        </DrawerDescription>
                                    </DrawerHeader>
                                    <DrawerPanel>
                                        <div class="flex justify-center">
                                            <div
                                                class="size-32 shrink-0 rounded-full border bg-muted"
                                            ></div>
                                        </div>
                                    </DrawerPanel>
                                </DrawerPopup>
                            </Drawer>
                        </DrawerFooter>
                    </DrawerPopup>
                </Drawer>
            </DrawerFooter>
        </DrawerPopup>
    </Drawer>
</ComponentPreviewTabs>

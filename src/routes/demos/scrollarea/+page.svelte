<script>
    import ComponentPreviewTabs from "$lib/components/app/docs/component-preview-tabs.svelte";
    import { ScrollArea } from "$lib/components/ui/scroll-area";

    const tags = Array.from({ length: 200 }, (_, i) => `v1.0.0-alpha.${i}`);
</script>

<ComponentPreviewTabs>
    <ScrollArea class="h-64 rounded-lg border">
        <div class="px-4 py-2">
            <h4 class="mb-2 font-medium text-sm">Tags</h4>
            <div class="flex flex-col gap-1">
                {#each tags as tag}
                    <div class="text-sm">
                        {tag}
                    </div>
                {/each}
            </div>
        </div>
    </ScrollArea>
</ComponentPreviewTabs>

<ComponentPreviewTabs>
    Horizontal Scroll
    <ScrollArea class="max-w-96 rounded-lg border">
        <div class="flex w-max gap-4 p-4">
            {#each Array.from({ length: 20 }, (_, i) => i) as i}
                <div
                    class="flex h-20 w-32 shrink-0 items-center justify-center rounded-md bg-muted"
                >
                    <span class="font-medium text-sm">Item {i + 1}</span>
                </div>
            {/each}
        </div>
    </ScrollArea>
</ComponentPreviewTabs>

<ComponentPreviewTabs>
    Scrollbar Gutter
    <ScrollArea class="max-w-96 rounded-lg border" scrollbarGutter={true}>
        <div class="flex w-max gap-4 p-4">
            {#each Array.from({ length: 20 }, (_, i) => i) as i}
                <div
                    class="flex h-20 w-32 shrink-0 items-center justify-center rounded-md bg-muted"
                >
                    <span class="font-medium text-sm">Item {i + 1}</span>
                </div>
            {/each}
        </div>
    </ScrollArea>
</ComponentPreviewTabs>
<ComponentPreviewTabs
    >Both Scrollbars

    <ScrollArea class="h-80 max-w-80 rounded-lg border">
        <p class="min-w-100 p-4">
            Just as suddenly as it had begun, the sensation stopped, leaving
            Alice feeling slightly disoriented. She looked around and realized
            that the room hadn't changed at all - it was she who had grown
            smaller, shrinking down to a fraction of her previous size. Alice
            felt herself growing larger and larger, filling up the entire room
            until she feared she might burst. The sensation was both thrilling
            and terrifying, as if she were expanding beyond the confines of her
            own body. She wondered if this was what it felt like to be a
            balloon, swelling with air until it could hold no more. Alice peered
            into the mirror, her reflection staring back at her with an air of
            mischief. She wondered what it would be like to step through the
            glass and into the world beyond, where everything seemed to be
            topsy-turvy and nothing was quite as it seemed. It's no use going
            back to yesterday, because I was a different person then, reflected
            Alice.
        </p>
    </ScrollArea>
</ComponentPreviewTabs>

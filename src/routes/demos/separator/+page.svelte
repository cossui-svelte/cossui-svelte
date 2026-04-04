<script>
    import ComponentPreviewTabs from "$lib/components/app/ComponentPreviewTabs.svelte";
    import { Separator } from "$lib/components/ui/separator";
</script>

<ComponentPreviewTabs>
    <div class="max-w-72">
        <div class="flex flex-col gap-1">
            <h4 class="font-medium text-sm">coss ui</h4>
            <p class="text-muted-foreground text-sm">
                Unstyled, accessible primitives for fast product UI and design
                systems.
            </p>
        </div>
        <Separator class="my-4" />
        <div class="flex items-center gap-4 text-sm">
            <div>Blog</div>
            <Separator orientation="vertical" />
            <div>Docs</div>
            <Separator orientation="vertical" />
            <div>Source</div>
            <Separator orientation="vertical" />
            <div>Releases</div>
        </div>
    </div>
</ComponentPreviewTabs>

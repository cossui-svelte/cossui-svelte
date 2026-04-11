<script>
    import ComponentPreviewTabs from "$lib/components/app/ComponentPreviewTabs.svelte";
    import { Button } from "$lib/components/ui/button";
    import {
        Tooltip,
        TooltipPopup,
        TooltipTrigger,
    } from "$lib/components/ui/tooltip";
    import { Globe } from "lucide-svelte";
</script>

<ComponentPreviewTabs>
    <Tooltip>
        <TooltipTrigger>
            <Button variant="outline">Hover me</Button>
        </TooltipTrigger>
        <TooltipPopup class="dark py-3">
            <div class="flex gap-3">
                <Globe
                    class="mt-0.5 shrink-0 opacity-60"
                    size={16}
                    aria-hidden="true"
                />
                <div class="space-y-1">
                    <p class="text-[13px] font-medium">
                        Tooltip with title and icon
                    </p>
                    <p class="text-muted-foreground text-xs">
                        Tooltips are made to be highly customizable, with
                        features like dynamic placement, rich content, and a
                        robust API.
                    </p>
                </div>
            </div>
        </TooltipPopup>
    </Tooltip>
</ComponentPreviewTabs>

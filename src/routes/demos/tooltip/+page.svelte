<script>
    import ComponentPreviewTabs from "$lib/components/app/ComponentPreviewTabs.svelte";
    import { Button } from "$lib/components/ui/button";
    import {
        Tooltip,
        TooltipPopup,
        TooltipTrigger,
    } from "$lib/components/ui/tooltip";
</script>

<ComponentPreviewTabs>
    <Tooltip>
        <TooltipTrigger>
            <Button variant="outline">Hover me</Button>
        </TooltipTrigger>
        <TooltipPopup>Helpful hint</TooltipPopup>
    </Tooltip>
</ComponentPreviewTabs>

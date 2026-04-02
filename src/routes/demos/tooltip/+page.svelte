<script>
    import { Button } from "$lib/components/ui/button";
    import {
        Tooltip,
        TooltipPopup,
        TooltipTrigger,
    } from "$lib/components/ui/tooltip";
</script>

<Tooltip>
    <TooltipTrigger>
        <Button variant="outline">Hover me</Button>
    </TooltipTrigger>
    <TooltipPopup>Helpful hint</TooltipPopup>
</Tooltip>

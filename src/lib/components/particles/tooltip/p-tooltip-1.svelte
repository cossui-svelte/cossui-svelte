<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Tooltip, TooltipPopup, TooltipTrigger } from "$lib/components/ui/tooltip";
</script>

<Tooltip>
  <TooltipTrigger>
    {#snippet child({ props })}
      <Button variant="outline" {...props}>Hover me</Button>
    {/snippet}
  </TooltipTrigger>
  <TooltipPopup>Helpful hint</TooltipPopup>
</Tooltip>

<script lang="ts">
  import { buttonVariants } from '$lib/components/ui/button';
  import {
    Tooltip,
    TooltipPopup,
    TooltipProvider,
    TooltipTrigger
  } from '$lib/components/ui/tooltip';
</script>

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger class={buttonVariants({ variant: 'outline' })}>Hover me</TooltipTrigger>
    <TooltipPopup>Helpful hint</TooltipPopup>
  </Tooltip>
</TooltipProvider>

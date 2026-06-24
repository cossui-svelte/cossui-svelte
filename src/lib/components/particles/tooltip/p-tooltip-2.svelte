<script lang="ts">
  import BoldIcon from "@lucide/svelte/icons/bold";
  import ItalicIcon from "@lucide/svelte/icons/italic";
  import UnderlineIcon from "@lucide/svelte/icons/underline";
  import { ToggleGroup, ToggleGroupItem } from "$lib/components/ui/toggle-group";
  import {
    Tooltip,
    TooltipPopup,
    TooltipProvider,
    TooltipTrigger,
  } from "$lib/components/ui/tooltip";
</script>

<TooltipProvider>
  <ToggleGroup defaultValue={["bold"]} type="multiple">
    <Tooltip>
      <TooltipTrigger>
        {#snippet child({ props })}
          <ToggleGroupItem aria-label="Toggle bold" value="bold" {...props}>
            <BoldIcon />
          </ToggleGroupItem>
        {/snippet}
      </TooltipTrigger>
      <TooltipPopup>Bold</TooltipPopup>
    </Tooltip>
    <Tooltip>
      <TooltipTrigger>
        {#snippet child({ props })}
          <ToggleGroupItem aria-label="Toggle italic" value="italic" {...props}>
            <ItalicIcon />
          </ToggleGroupItem>
        {/snippet}
      </TooltipTrigger>
      <TooltipPopup>Italic</TooltipPopup>
    </Tooltip>
    <Tooltip>
      <TooltipTrigger>
        {#snippet child({ props })}
          <ToggleGroupItem aria-label="Toggle underline" value="underline" {...props}>
            <UnderlineIcon />
          </ToggleGroupItem>
        {/snippet}
      </TooltipTrigger>
      <TooltipPopup>Underline</TooltipPopup>
    </Tooltip>
  </ToggleGroup>
</TooltipProvider>

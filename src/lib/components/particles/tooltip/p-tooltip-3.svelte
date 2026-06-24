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
          <ToggleGroupItem
            aria-label="Toggle bold"
            class="after:absolute after:left-full after:h-full after:w-1"
            value="bold"
            {...props}
          >
            <BoldIcon aria-hidden="true" />
          </ToggleGroupItem>
        {/snippet}
      </TooltipTrigger>
      <TooltipPopup><span>Make text bold</span></TooltipPopup>
    </Tooltip>
    <Tooltip>
      <TooltipTrigger>
        {#snippet child({ props })}
          <ToggleGroupItem
            aria-label="Toggle italic"
            class="after:absolute after:left-full after:h-full after:w-1"
            value="italic"
            {...props}
          >
            <ItalicIcon aria-hidden="true" />
          </ToggleGroupItem>
        {/snippet}
      </TooltipTrigger>
      <TooltipPopup><span>Apply italic formatting to text</span></TooltipPopup>
    </Tooltip>
    <Tooltip>
      <TooltipTrigger>
        {#snippet child({ props })}
          <ToggleGroupItem
            aria-label="Toggle underline"
            class="after:absolute after:left-full after:h-full after:w-1"
            value="underline"
            {...props}
          >
            <UnderlineIcon aria-hidden="true" />
          </ToggleGroupItem>
        {/snippet}
      </TooltipTrigger>
      <TooltipPopup><span>Underline text</span></TooltipPopup>
    </Tooltip>
  </ToggleGroup>
</TooltipProvider>

<script lang="ts">
  import AlignCenterIcon from "@lucide/svelte/icons/align-center";
  import AlignLeftIcon from "@lucide/svelte/icons/align-left";
  import AlignRightIcon from "@lucide/svelte/icons/align-right";
  import DollarSignIcon from "@lucide/svelte/icons/dollar-sign";
  import PercentIcon from "@lucide/svelte/icons/percent";
  import { Button } from "$lib/components/ui/button";
  import { Select, SelectItem, SelectPopup, SelectTrigger } from "$lib/components/ui/select";
  import { ToggleGroup, ToggleGroupItem } from "$lib/components/ui/toggle-group";
  import {
    Toolbar,
    ToolbarGroup,
    ToolbarSeparator,
  } from "$lib/components/ui/toolbar";
  import {
    Tooltip,
    TooltipPopup,
    TooltipProvider,
    TooltipTrigger,
  } from "$lib/components/ui/tooltip";

  const items = [
    { label: "Helvetica", value: "helvetica" },
    { label: "Arial", value: "arial" },
    { label: "Times New Roman", value: "times-new-roman" },
  ];

  let selected = $state("helvetica");
  const selectedLabel = $derived(items.find((i) => i.value === selected)?.label ?? "");
</script>

<TooltipProvider>
  <Toolbar>
    <ToggleGroup class="border-none p-0" value={["left"]} multiple>
      <Tooltip>
        <TooltipTrigger>
          {#snippet child({ props })}
            <ToggleGroupItem aria-label="Align left" value="left" {...props}>
              <AlignLeftIcon />
            </ToggleGroupItem>
          {/snippet}
        </TooltipTrigger>
        <TooltipPopup sideOffset={8}>Align left</TooltipPopup>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger>
          {#snippet child({ props })}
            <ToggleGroupItem aria-label="Align center" value="center" {...props}>
              <AlignCenterIcon />
            </ToggleGroupItem>
          {/snippet}
        </TooltipTrigger>
        <TooltipPopup sideOffset={8}>Align center</TooltipPopup>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger>
          {#snippet child({ props })}
            <ToggleGroupItem aria-label="Align right" value="right" {...props}>
              <AlignRightIcon />
            </ToggleGroupItem>
          {/snippet}
        </TooltipTrigger>
        <TooltipPopup sideOffset={8}>Align right</TooltipPopup>
      </Tooltip>
    </ToggleGroup>
    <ToolbarSeparator/>
    <ToolbarGroup type="single">
      <Tooltip>
        <TooltipTrigger>
          {#snippet child({ props })}
            <Button aria-label="Format as currency" size="icon" variant="ghost" {...props}>
              <DollarSignIcon />
            </Button>
          {/snippet}
        </TooltipTrigger>
        <TooltipPopup sideOffset={8}>Format as currency</TooltipPopup>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger>
          {#snippet child({ props })}
            <Button aria-label="Format as percent" size="icon" variant="ghost" {...props}>
              <PercentIcon />
            </Button>
          {/snippet}
        </TooltipTrigger>
        <TooltipPopup sideOffset={8}>Format as percent</TooltipPopup>
      </Tooltip>
    </ToolbarGroup>
    <ToolbarSeparator />
    <ToolbarGroup type="single">
      <Select value={selected} onValueChange={(v) => { selected = v; }}>
        <Tooltip>
          <TooltipTrigger>
            {#snippet child({ props })}
              <SelectTrigger {...props}>
                <span class="flex-1 truncate">{selectedLabel}</span>
              </SelectTrigger>
            {/snippet}
          </TooltipTrigger>
          <TooltipPopup sideOffset={8}>Select a different font</TooltipPopup>
        </Tooltip>
        <SelectPopup>
          {#each items as { label, value } (value)}
            <SelectItem {value}>{label}</SelectItem>
          {/each}
        </SelectPopup>
      </Select>
    </ToolbarGroup>
    <ToolbarSeparator />
    <ToolbarGroup type="single">
      <Button>Save</Button>
    </ToolbarGroup>
  </Toolbar>
</TooltipProvider>

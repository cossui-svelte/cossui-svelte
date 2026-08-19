<script lang="ts">
  import AlignCenterIcon from '@lucide/svelte/icons/align-center';
  import AlignLeftIcon from '@lucide/svelte/icons/align-left';
  import AlignRightIcon from '@lucide/svelte/icons/align-right';
  import DollarSignIcon from '@lucide/svelte/icons/dollar-sign';
  import PercentIcon from '@lucide/svelte/icons/percent';
  import { Button, buttonVariants } from '$lib/components/ui/button';
  import { Select, SelectItem, SelectPopup, SelectTrigger } from '$lib/components/ui/select';
  import { ToggleGroup, ToggleGroupItem } from '$lib/components/ui/toggle-group';
  import { Toolbar, ToolbarGroup, ToolbarSeparator } from '$lib/components/ui/toolbar';
  import {
    Tooltip,
    TooltipPopup,
    TooltipProvider,
    TooltipTrigger
  } from '$lib/components/ui/tooltip';

  const items = [
    { label: 'Helvetica', value: 'helvetica' },
    { label: 'Arial', value: 'arial' },
    { label: 'Times New Roman', value: 'times-new-roman' }
  ];

  let selected = $state('helvetica');
  const selectedLabel = $derived(items.find((i) => i.value === selected)?.label ?? '');

  let alignLeftRef = $state<HTMLElement | null>(null);
  let alignLeftTipOpen = $state(false);
  let alignCenterRef = $state<HTMLElement | null>(null);
  let alignCenterTipOpen = $state(false);
  let alignRightRef = $state<HTMLElement | null>(null);
  let alignRightTipOpen = $state(false);
  let fontSelectRef = $state<HTMLElement | null>(null);
  let fontSelectTipOpen = $state(false);
</script>

<TooltipProvider>
  <Toolbar>
    <ToggleGroup class="border-none p-0" value={['left']} multiple>
      <Tooltip bind:open={alignLeftTipOpen}>
        <ToggleGroupItem
          aria-label="Align left"
          bind:ref={alignLeftRef}
          value="left"
          onpointerenter={() => (alignLeftTipOpen = true)}
          onpointerleave={() => (alignLeftTipOpen = false)}
          onfocus={() => (alignLeftTipOpen = true)}
          onblur={() => (alignLeftTipOpen = false)}
        >
          <AlignLeftIcon />
        </ToggleGroupItem>
        <TooltipPopup customAnchor={alignLeftRef} sideOffset={8}>Align left</TooltipPopup>
      </Tooltip>
      <Tooltip bind:open={alignCenterTipOpen}>
        <ToggleGroupItem
          aria-label="Align center"
          bind:ref={alignCenterRef}
          value="center"
          onpointerenter={() => (alignCenterTipOpen = true)}
          onpointerleave={() => (alignCenterTipOpen = false)}
          onfocus={() => (alignCenterTipOpen = true)}
          onblur={() => (alignCenterTipOpen = false)}
        >
          <AlignCenterIcon />
        </ToggleGroupItem>
        <TooltipPopup customAnchor={alignCenterRef} sideOffset={8}>Align center</TooltipPopup>
      </Tooltip>
      <Tooltip bind:open={alignRightTipOpen}>
        <ToggleGroupItem
          aria-label="Align right"
          bind:ref={alignRightRef}
          value="right"
          onpointerenter={() => (alignRightTipOpen = true)}
          onpointerleave={() => (alignRightTipOpen = false)}
          onfocus={() => (alignRightTipOpen = true)}
          onblur={() => (alignRightTipOpen = false)}
        >
          <AlignRightIcon />
        </ToggleGroupItem>
        <TooltipPopup customAnchor={alignRightRef} sideOffset={8}>Align right</TooltipPopup>
      </Tooltip>
    </ToggleGroup>
    <ToolbarSeparator />
    <ToolbarGroup type="single">
      <Tooltip>
        <TooltipTrigger
          aria-label="Format as currency"
          class={buttonVariants({ size: 'icon', variant: 'ghost' })}
        >
          <DollarSignIcon />
        </TooltipTrigger>
        <TooltipPopup sideOffset={8}>Format as currency</TooltipPopup>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger
          aria-label="Format as percent"
          class={buttonVariants({ size: 'icon', variant: 'ghost' })}
        >
          <PercentIcon />
        </TooltipTrigger>
        <TooltipPopup sideOffset={8}>Format as percent</TooltipPopup>
      </Tooltip>
    </ToolbarGroup>
    <ToolbarSeparator />
    <ToolbarGroup type="single">
      <Select
        value={selected}
        onValueChange={(v) => {
          selected = v;
        }}
      >
        <Tooltip bind:open={fontSelectTipOpen}>
          <SelectTrigger
            bind:ref={fontSelectRef}
            onpointerenter={() => (fontSelectTipOpen = true)}
            onpointerleave={() => (fontSelectTipOpen = false)}
            onfocus={() => (fontSelectTipOpen = true)}
            onblur={() => (fontSelectTipOpen = false)}
          >
            <span class="flex-1 truncate">{selectedLabel}</span>
          </SelectTrigger>
          <TooltipPopup customAnchor={fontSelectRef} sideOffset={8}>
            Select a different font
          </TooltipPopup>
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

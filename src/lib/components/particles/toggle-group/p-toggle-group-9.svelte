<script lang="ts">
  import BoldIcon from '@lucide/svelte/icons/bold';
  import ItalicIcon from '@lucide/svelte/icons/italic';
  import UnderlineIcon from '@lucide/svelte/icons/underline';
  import { ToggleGroup, ToggleGroupItem } from '$lib/components/ui/toggle-group';
  import { Tooltip, TooltipPopup, TooltipProvider } from '$lib/components/ui/tooltip';

  let boldRef = $state<HTMLElement | null>(null);
  let boldTipOpen = $state(false);
  let italicRef = $state<HTMLElement | null>(null);
  let italicTipOpen = $state(false);
  let underlineRef = $state<HTMLElement | null>(null);
  let underlineTipOpen = $state(false);
</script>

<TooltipProvider>
  <ToggleGroup value={['bold']} multiple>
    <Tooltip bind:open={boldTipOpen}>
      <ToggleGroupItem
        aria-label="Toggle bold"
        bind:ref={boldRef}
        value="bold"
        onpointerenter={() => (boldTipOpen = true)}
        onpointerleave={() => (boldTipOpen = false)}
        onfocus={() => (boldTipOpen = true)}
        onblur={() => (boldTipOpen = false)}
      >
        <BoldIcon />
      </ToggleGroupItem>
      <TooltipPopup customAnchor={boldRef}>Bold</TooltipPopup>
    </Tooltip>
    <Tooltip bind:open={italicTipOpen}>
      <ToggleGroupItem
        aria-label="Toggle italic"
        bind:ref={italicRef}
        value="italic"
        onpointerenter={() => (italicTipOpen = true)}
        onpointerleave={() => (italicTipOpen = false)}
        onfocus={() => (italicTipOpen = true)}
        onblur={() => (italicTipOpen = false)}
      >
        <ItalicIcon />
      </ToggleGroupItem>
      <TooltipPopup customAnchor={italicRef}>Italic</TooltipPopup>
    </Tooltip>
    <Tooltip bind:open={underlineTipOpen}>
      <ToggleGroupItem
        aria-label="Toggle underline"
        bind:ref={underlineRef}
        value="underline"
        onpointerenter={() => (underlineTipOpen = true)}
        onpointerleave={() => (underlineTipOpen = false)}
        onfocus={() => (underlineTipOpen = true)}
        onblur={() => (underlineTipOpen = false)}
      >
        <UnderlineIcon />
      </ToggleGroupItem>
      <TooltipPopup customAnchor={underlineRef}>Underline</TooltipPopup>
    </Tooltip>
  </ToggleGroup>
</TooltipProvider>

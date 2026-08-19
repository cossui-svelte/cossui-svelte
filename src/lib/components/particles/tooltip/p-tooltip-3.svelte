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
        class="after:absolute after:left-full after:h-full after:w-1"
        value="bold"
        onpointerenter={() => (boldTipOpen = true)}
        onpointerleave={() => (boldTipOpen = false)}
        onfocus={() => (boldTipOpen = true)}
        onblur={() => (boldTipOpen = false)}
      >
        <BoldIcon aria-hidden="true" />
      </ToggleGroupItem>
      <TooltipPopup customAnchor={boldRef}><span>Make text bold</span></TooltipPopup>
    </Tooltip>
    <Tooltip bind:open={italicTipOpen}>
      <ToggleGroupItem
        aria-label="Toggle italic"
        bind:ref={italicRef}
        class="after:absolute after:left-full after:h-full after:w-1"
        value="italic"
        onpointerenter={() => (italicTipOpen = true)}
        onpointerleave={() => (italicTipOpen = false)}
        onfocus={() => (italicTipOpen = true)}
        onblur={() => (italicTipOpen = false)}
      >
        <ItalicIcon aria-hidden="true" />
      </ToggleGroupItem>
      <TooltipPopup customAnchor={italicRef}>
        <span>Apply italic formatting to text</span>
      </TooltipPopup>
    </Tooltip>
    <Tooltip bind:open={underlineTipOpen}>
      <ToggleGroupItem
        aria-label="Toggle underline"
        bind:ref={underlineRef}
        class="after:absolute after:left-full after:h-full after:w-1"
        value="underline"
        onpointerenter={() => (underlineTipOpen = true)}
        onpointerleave={() => (underlineTipOpen = false)}
        onfocus={() => (underlineTipOpen = true)}
        onblur={() => (underlineTipOpen = false)}
      >
        <UnderlineIcon aria-hidden="true" />
      </ToggleGroupItem>
      <TooltipPopup customAnchor={underlineRef}><span>Underline text</span></TooltipPopup>
    </Tooltip>
  </ToggleGroup>
</TooltipProvider>

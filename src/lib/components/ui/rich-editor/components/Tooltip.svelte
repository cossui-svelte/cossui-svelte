<script lang="ts">
  import type { Snippet } from 'svelte';
  import { Kbd } from '#lib/components/ui/kbd/index.js';
  import {
    Tooltip,
    TooltipPopup,
    TooltipProvider,
    TooltipTrigger
  } from '#lib/components/ui/tooltip/index.js';

  interface Props {
    tooltip: string;
    children: Snippet<[]>;
    shortCut?: string;
  }

  const { tooltip, children, shortCut }: Props = $props();
</script>

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>
      {@render children()}
    </TooltipTrigger>
    <TooltipPopup>
      <span>{tooltip}</span>
      {#if shortCut}
        <Kbd>{shortCut}</Kbd>
      {/if}
    </TooltipPopup>
  </Tooltip>
</TooltipProvider>

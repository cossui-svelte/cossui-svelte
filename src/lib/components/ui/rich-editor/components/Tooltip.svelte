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
    /** Trigger element type. Use a non-button element when the child is already interactive. */
    as?: keyof HTMLElementTagNameMap;
    class?: string;
  }

  const { tooltip, children, shortCut, as = 'button', class: className }: Props = $props();
</script>

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger {as} class={className}>
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

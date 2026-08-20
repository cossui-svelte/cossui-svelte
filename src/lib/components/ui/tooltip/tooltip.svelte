<script lang="ts">
  import { Tooltip as TooltipPrimitive } from '@shardsui/svelte/tooltip';
  import type { ComponentProps } from 'svelte';

  let {
    delay,
    closeDelay,
    open = $bindable(false),
    triggerId = $bindable(null),
    ...restProps
  }: ComponentProps<typeof TooltipPrimitive.Root> & {
    delay?: number;
    closeDelay?: number;
  } = $props();
</script>

{#if delay !== undefined || closeDelay !== undefined}
  <TooltipPrimitive.Provider {delay} {closeDelay}>
    <TooltipPrimitive.Root bind:open bind:triggerId {...restProps} />
  </TooltipPrimitive.Provider>
{:else}
  <TooltipPrimitive.Root bind:open bind:triggerId {...restProps} />
{/if}

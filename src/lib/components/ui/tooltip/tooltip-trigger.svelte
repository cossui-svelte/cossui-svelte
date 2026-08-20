<script lang="ts">
  import { Tooltip as TooltipPrimitive } from '@shardsui/svelte/tooltip';
  import type { ComponentProps } from 'svelte';

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: ComponentProps<typeof TooltipPrimitive.Trigger> = $props();
</script>

<TooltipPrimitive.Trigger bind:ref class={className} data-slot="tooltip-trigger" {...restProps} />

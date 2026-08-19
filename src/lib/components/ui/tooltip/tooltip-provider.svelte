<script lang="ts">
  import { Tooltip as TooltipPrimitive } from '@shardsui/svelte/tooltip';
  import type { ComponentProps } from 'svelte';

  let { ...restProps }: ComponentProps<typeof TooltipPrimitive.Provider> = $props();
</script>

<TooltipPrimitive.Provider {...restProps} />

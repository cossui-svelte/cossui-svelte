<script lang="ts">
  import { Meter as MeterPrimitive } from '@shardsui/svelte/meter';
  import type { ComponentProps } from 'svelte';
  import { cn } from '$lib/utils';

  let { class: className, ...restProps }: ComponentProps<typeof MeterPrimitive.Value> = $props();
</script>

<MeterPrimitive.Value
  class={cn('text-foreground text-sm tabular-nums', className)}
  data-slot="meter-value"
  {...restProps}
/>

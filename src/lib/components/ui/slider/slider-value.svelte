<script lang="ts">
  import { Slider as SliderPrimitive } from '@shardsui/svelte/slider';
  import type { ComponentProps } from 'svelte';
  import { cn } from '$lib/utils';

  let { class: className, ...restProps }: ComponentProps<typeof SliderPrimitive.Value> = $props();
</script>

<SliderPrimitive.Value
  class={cn('flex justify-end text-sm', className)}
  data-slot="slider-value"
  {...restProps}
/>

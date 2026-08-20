<script lang="ts">
  import { Separator as SeparatorPrimitive } from '@shardsui/svelte/separator';
  import type { ComponentProps } from 'svelte';
  import { cn } from '$lib/utils';

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: ComponentProps<typeof SeparatorPrimitive> = $props();
</script>

<SeparatorPrimitive
  bind:ref
  orientation="horizontal"
  data-slot="otp-field-separator"
  class={cn(
    'rounded-full bg-input data-[orientation=horizontal]:h-0.5 data-[orientation=horizontal]:w-3',
    className
  )}
  {...restProps}
/>

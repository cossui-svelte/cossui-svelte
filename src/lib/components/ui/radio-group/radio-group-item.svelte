<script lang="ts">
  import { Radio as RadioPrimitive } from '@shardsui/svelte/radio';
  import type { ComponentProps } from 'svelte';
  import { cn } from '$lib/utils';

  let {
    class: className,
    ref = $bindable(null),
    value,
    ...restProps
  }: ComponentProps<typeof RadioPrimitive.Root> = $props();
</script>

<RadioPrimitive.Root
  bind:ref
  {value}
  class={cn(
    'border-border-input bg-background hover:border-dark-40 data-checked:border-foreground data-checked:border-6 size-5 shrink-0 cursor-default rounded-full border transition-all duration-100 ease-in-out',
    className
  )}
  data-slot="radio"
  {...restProps}
/>

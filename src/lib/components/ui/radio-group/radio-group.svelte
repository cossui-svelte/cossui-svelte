<script lang="ts">
  import { RadioGroup as RadioGroupPrimitive } from '@shardsui/svelte/radio-group';
  import type { ComponentProps } from 'svelte';
  import { cn } from '$lib/utils';

  let {
    ref = $bindable(null),
    value = $bindable(),
    class: className,
    ...restProps
  }: ComponentProps<typeof RadioGroupPrimitive> = $props();
</script>

<RadioGroupPrimitive
  bind:ref
  bind:value
  class={cn('flex flex-col gap-3', className)}
  data-slot="radio-group"
  {...restProps}
/>

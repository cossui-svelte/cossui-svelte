<script lang="ts">
  import { RadioGroup as RadioGroupPrimitive } from '@shardsui/svelte/radio-group';
  import type { ComponentProps } from 'svelte';
  import { cn } from '$lib/utils';

  let {
    value = $bindable(),
    class: className,
    ...restProps
  }: ComponentProps<typeof RadioGroupPrimitive> = $props();
</script>

<RadioGroupPrimitive
  bind:value
  class={cn('flex flex-col', className)}
  data-slot="drawer-menu-radio-group"
  {...restProps}
/>

<script lang="ts">
  import { Accordion as AccordionPrimitive } from '@shardsui/svelte/accordion';
  import type { ComponentProps } from 'svelte';
  import { cn } from '$lib/utils';

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: ComponentProps<typeof AccordionPrimitive.Item> = $props();
</script>

<AccordionPrimitive.Item
  bind:ref
  class={cn('border-b last:border-b-0', className)}
  data-slot="accordion-item"
  {...restProps}
/>

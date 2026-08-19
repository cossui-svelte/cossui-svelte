<script lang="ts">
  import ChevronDown from '@lucide/svelte/icons/chevron-down';
  import { Accordion as AccordionPrimitive } from '@shardsui/svelte/accordion';
  import type { ComponentProps } from 'svelte';
  import { cn } from '$lib/utils';

  let {
    ref = $bindable(null),
    class: className,
    children: childrenProp,
    ...restProps
  }: ComponentProps<typeof AccordionPrimitive.Trigger> = $props();
</script>

<AccordionPrimitive.Header class="flex">
  <AccordionPrimitive.Trigger
    bind:ref
    class={cn(
      'flex flex-1 cursor-pointer items-start justify-between gap-4 rounded-md py-4 text-left font-medium text-sm outline-none transition-all focus-visible:ring-[3px] focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-64 data-panel-open:*:data-[slot=accordion-indicator]:rotate-180',
      className
    )}
    data-slot="accordion-trigger"
    {...restProps}
  >
    {#snippet children(state)}
      {@render childrenProp?.(state)}

      <ChevronDown
        class="pointer-events-none size-4 shrink-0 translate-y-0.5 opacity-80 transition-transform duration-200 ease-in-out"
        data-slot="accordion-indicator"
      />
    {/snippet}
  </AccordionPrimitive.Trigger>
</AccordionPrimitive.Header>

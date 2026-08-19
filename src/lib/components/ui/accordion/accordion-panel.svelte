<script lang="ts">
  import { Accordion as AccordionPrimitive } from '@shardsui/svelte/accordion';
  import type { ComponentProps } from 'svelte';
  import { cn } from '$lib/utils';

  let {
    ref = $bindable(null),
    class: className,
    children: childrenProp,
    ...restProps
  }: ComponentProps<typeof AccordionPrimitive.Panel> = $props();
</script>

<AccordionPrimitive.Panel
  bind:ref
  class="h-(--accordion-panel-height) w-full overflow-hidden text-muted-foreground text-sm transition-[height] duration-200 ease-out data-ending-style:h-0 data-starting-style:h-0"
  data-slot="accordion-panel"
  {...restProps}
>
  {#snippet children(state)}
    <div class={cn('pt-0 pb-4', className)}>
      {@render childrenProp?.(state)}
    </div>
  {/snippet}
</AccordionPrimitive.Panel>

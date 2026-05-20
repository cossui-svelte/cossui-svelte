<script lang="ts">
import type { Accordion } from 'bits-ui';
import { cn, type WithoutChild } from '$lib/utils.js';

let {
  ref = $bindable(null),
  class: className,
  children,
  ...restProps
}: WithoutChild<Accordion.ContentProps> = $props();
</script>

<Accordion.Content
  bind:ref
  class="h-(--accordion-panel-height) overflow-hidden text-muted-foreground text-sm transition-[height] duration-200 ease-in-out data-ending-style:h-0 data-starting-style:h-0"
  data-slot="accordion-panel"
  {...restProps}
>
  <div class={cn("pt-0 pb-4", className)}>
    {@render children?.()}
  </div>
</Accordion.Content>

<script lang="ts">
  import { Accordion } from "bits-ui";
  import { cn, type WithoutChild } from "$lib/utils.js";

  let {
    ref = $bindable(null),
    class: className,
    children,

    ...restProps
  }: WithoutChild<Accordion.ContentProps> = $props();
</script>

<Accordion.Content
  bind:ref
  class="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
  data-slot="accordion-panel"
  {...restProps}
>
  <div class={cn("pt-0 pb-4", className)}>
    {@render children?.()}
  </div>
</Accordion.Content>

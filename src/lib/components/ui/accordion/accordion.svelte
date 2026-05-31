<script lang="ts">
  import { Accordion as AccordionPrimitive } from "bits-ui";
  import { cn } from "$lib/utils.js";

  let {
    ref = $bindable(null),
    value = $bindable(),
    class: className,
    ...restProps
  }: AccordionPrimitive.RootProps = $props();
</script>

<AccordionPrimitive.Root
  bind:ref
  bind:value={value as never}
  class={className}
  data-slot="accordion"
  {...restProps}
/>

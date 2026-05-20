<script lang="ts">
  import { Accordion } from "bits-ui";
  import { cn } from "$lib/utils.js";

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: Accordion.ItemProps = $props();
</script>

<Accordion.Item
  class={cn("border-b last:border-b-0", className)}
  data-slot="accordion-item"
  {...restProps}
/>

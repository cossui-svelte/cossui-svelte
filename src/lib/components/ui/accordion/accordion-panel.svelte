<script lang="ts">
  import { Accordion } from "bits-ui";
  import { cn, type WithoutChild } from "$lib/utils";

  let {
    ref = $bindable(null),
    class: className,
    children,

    ...restProps
  }: WithoutChild<Accordion.ContentProps> = $props();
</script>

<Accordion.Content
  bind:ref
  class="w-full overflow-hidden text-muted-foreground text-sm transition-[height] duration-200 ease-out data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
  data-slot="accordion-panel"
  {...restProps}
>
  <div class={cn("pt-0 pb-4", className)}>
    {@render children?.()}
  </div>
</Accordion.Content>

<script lang="ts">
  import { Accordion } from "bits-ui";
  import ChevronDown from "@lucide/svelte/icons/chevron-down";

  import { cn, type WithoutChild } from "$lib/utils.js";

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithoutChild<Accordion.TriggerProps> = $props();
</script>

<Accordion.Header class="flex">
  <Accordion.Trigger
    class={cn(
      "flex flex-1 cursor-pointer items-start justify-between gap-4 rounded-md py-4 text-left font-medium text-sm outline-none transition-all focus-visible:ring-[3px] focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-64 data-[state=open]:*:data-[slot=accordion-indicator]:rotate-180",
      className,
    )}
    data-slot="accordion-trigger"
    {...restProps}
  >
    {@render children?.()}
    <ChevronDown
      class="pointer-events-none size-4 shrink-0 translate-y-0.5 opacity-80 transition-transform duration-200 ease-in-out"
      data-slot="accordion-indicator"
    />
  </Accordion.Trigger>
</Accordion.Header>

<script lang="ts">
  import { Accordion as AccordionPrimitive, type Orientation } from "bits-ui";
  import type { HTMLAttributes } from "svelte/elements";

  let {
    ref = $bindable(null),
    value = $bindable(),
    class: className,
    multiple = false,
    ...restProps
  }: HTMLAttributes<HTMLDivElement> & {
    ref?: HTMLDivElement | null;
    value?: string | string[];
    multiple?: boolean;
    disabled?: boolean;
    loop?: boolean;
    orientation?: Orientation;
  } = $props();
</script>

<AccordionPrimitive.Root
  bind:ref
  bind:value={value as never}
  type={(multiple ? "multiple" : "single") as never}
  class={className}
  data-slot="accordion"
  {...(restProps as Record<string, unknown>)}
/>

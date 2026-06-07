<script lang="ts">
  import { Combobox } from "bits-ui";
  import { cn } from "$lib/utils";

  interface Props extends Omit<Combobox.InputProps, "size"> {
    size?: "sm" | "default" | "lg" | number;
  }

  let { class: className, size = "default", ...restProps }: Props = $props();

  const numericSize = $derived(typeof size === "number" ? size : undefined);
</script>

<Combobox.Input
  class={cn(
    "min-w-12 flex-1 text-base outline-none sm:text-sm [[data-slot=combobox-chip]+&]:ps-0.5",
    size === "sm" ? "ps-1.5" : "ps-2",
    className,
  )}
  data-size={typeof size === "string" ? size : undefined}
  data-slot="combobox-chips-input"
  {...(numericSize !== undefined ? ({ size: numericSize } as object) : {})}
  {...restProps}
/>

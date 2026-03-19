<script lang="ts">
  import { cn, type WithElementRef } from "$lib/utils.js";
  import type { HTMLAttributes } from "svelte/elements";

  let {
    ref = $bindable(null),
    class: className,
    variant = "legend",
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
    variant?: "legend" | "label";
  } = $props();
</script>

<div
  bind:this={ref}
  data-slot="fieldset-legend"
  class={cn("font-semibold text-foreground", className)}
  {...restProps}
>
  {@render children?.()}
</div>

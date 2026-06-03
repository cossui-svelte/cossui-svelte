<script lang="ts">
  import { cn } from "$lib/utils";
  import type { WithElementRef } from "bits-ui";
  import type { HTMLAttributes } from "svelte/elements";

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
  bind:this={ref}
  class={cn("flex", className)}
  data-slot="field-item"
  {...restProps}
>
  {@render children?.()}
</div>

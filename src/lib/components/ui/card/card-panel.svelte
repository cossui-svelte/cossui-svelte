<script lang="ts">
  import { cn, type WithElementRef } from "$lib/utils.js";
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
  class={cn(
    "flex-1 p-6 in-[[data-slot=card]:has(>[data-slot=card-header]:not(.border-b))]:pt-0 in-[[data-slot=card]:has(>[data-slot=card-footer]:not(.border-t))]:pb-0",
    className,
  )}
  data-slot="card-panel"
  {...restProps}
>
  {@render children?.()}
</div>

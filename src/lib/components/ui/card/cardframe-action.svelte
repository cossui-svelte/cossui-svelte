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
    "col-start-2 row-span-2 row-start-1 self-center justify-self-end inline-flex",
    className,
  )}
  data-slot="card-frame-action"
  {...restProps}
>
  {@render children?.()}
</div>

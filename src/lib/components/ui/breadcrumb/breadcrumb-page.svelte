<script lang="ts">
  import { cn, type WithElementRef } from "$lib/utils";
  import type { HTMLAttributes } from "svelte/elements";

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLSpanElement>> = $props();
</script>

<span
  bind:this={ref}
  aria-current="page"
  class={cn("font-normal text-foreground", className)}
  data-slot="breadcrumb-page"
  {...restProps}
>
  {@render children?.()}
</span>

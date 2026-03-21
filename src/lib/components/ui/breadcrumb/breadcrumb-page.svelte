<script lang="ts">
  import { cn, type WithElementRef } from "$lib/utils.js";
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
  aria-disabled="true"
  class={cn("font-normal text-foreground", className)}
  data-slot="breadcrumb-page"
  role="link"
  {...restProps}
>
  {@render children?.()}
</span>

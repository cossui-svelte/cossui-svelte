<script lang="ts">
  import { cn, type WithElementRef } from "$lib/utils.js";
  import type { HTMLAttributes } from "svelte/elements";

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLOListElement>> = $props();
</script>

<ol
  bind:this={ref}
  class={cn(
    "wrap-break-word flex flex-wrap items-center gap-1.5 text-muted-foreground text-sm sm:gap-2.5",
    className,
  )}
  data-slot="breadcrumb-list"
  {...restProps}
>
  {@render children?.()}
</ol>

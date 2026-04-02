<script lang="ts">
  import { cn, type WithElementRef } from "$lib/utils.js";
  import type { HTMLAttributes } from "svelte/elements";

  let {
    ref = $bindable(null),
    class: className,
    href,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLAnchorElement>> & {
    href?: string;
  } = $props();
</script>

<a
  bind:this={ref}
  {href}
  class={cn("transition-colors hover:text-foreground", className)}
  data-slot="breadcrumb-link"
  {...restProps}
>
  {@render children?.()}
</a>

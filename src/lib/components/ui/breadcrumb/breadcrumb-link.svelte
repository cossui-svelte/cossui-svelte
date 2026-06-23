<script lang="ts">
  import type { HTMLAnchorAttributes } from "svelte/elements";
  import { cn, type WithElementRef } from "$lib/utils";

  let {
    ref = $bindable(null),
    class: className,
    href,
    children,
    ...restProps
  }: WithElementRef<HTMLAnchorAttributes> = $props();
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

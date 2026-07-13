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

<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- href is caller-supplied; the caller resolves the route, not this generic link primitive -->
<a bind:this={ref} {href}
  class={cn("transition-colors hover:text-foreground", className)}
  data-slot="breadcrumb-link"
  {...restProps}
>
  {@render children?.()}
</a>

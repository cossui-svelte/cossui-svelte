<script lang="ts">
import type { HTMLAttributes } from 'svelte/elements';
import { cn, type WithElementRef } from '$lib/utils.js';

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

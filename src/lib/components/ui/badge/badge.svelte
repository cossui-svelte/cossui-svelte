<script lang="ts">
import type { HTMLAnchorAttributes } from 'svelte/elements';
import { cn, type WithElementRef } from '$lib/utils.js';
import { type BadgeVariants, badgeVariants } from './badgeVariants';

let {
  ref = $bindable(null),
  href,
  class: className,
  variant = 'default',
  size,

  children,
  ...restProps
}: WithElementRef<HTMLAnchorAttributes> & {
  variant?: BadgeVariants['variant'];
  size?: BadgeVariants['size'];
  href?: string;
} = $props();
</script>

<svelte:element
  this={href ? "a" : "span"}
  bind:this={ref}
  data-slot="badge"
  {href}
  class={cn(badgeVariants({ className, size, variant }))}
  {...restProps}
>
  {@render children?.()}
</svelte:element>

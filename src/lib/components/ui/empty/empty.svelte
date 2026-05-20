<script lang="ts">
import type { HTMLAttributes } from 'svelte/elements';
import { cn, type WithElementRef } from '$lib/utils.js';

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
    "flex min-w-0 flex-1 flex-col items-center justify-center gap-6 text-balance px-6 py-12 text-center md:py-20",
    className,
  )}
  data-slot="empty"
  {...restProps}
>
  {@render children?.()}
</div>

<script lang="ts">
import type { HTMLAttributes } from 'svelte/elements';
import { cn, type WithElementRef } from '$lib/utils.js';

let {
  ref = $bindable(null),
  class: className,
  children,
  ...restProps
}: WithElementRef<HTMLAttributes<HTMLElement>> = $props();
</script>

<nav
  bind:this={ref}
  aria-label="breadcrumb"
  data-slot="breadcrumb"
  {...restProps}
>
  {@render children?.()}
</nav>

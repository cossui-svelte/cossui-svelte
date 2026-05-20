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
    "relative flex flex-col px-6 py-4 grid auto-rows-min grid-rows-[auto_auto] items-start gap-x-4 has-data-[slot=card-frame-action]:grid-cols-[1fr_auto]",
    className,
  )}
  data-slot="card-fram-header"
  {...restProps}
>
  {@render children?.()}
</div>

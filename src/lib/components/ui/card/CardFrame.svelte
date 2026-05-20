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
    "[--clip-top:-1rem] [--clip-bottom:-1rem] *:data-[slot=card]:first:[--clip-top:1px] *:data-[slot=card]:last:[--clip-bottom:1px] flex flex-col relative rounded-2xl border bg-card before:bg-muted/72 not-dark:bg-clip-padding text-card-foreground shadow-xs/5 before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-2xl)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] dark:before:shadow-[0_-1px_--theme(--color-white/6%)] *:data-[slot=card]:-m-px *:not-last:data-[slot=card]:rounded-b-xl *:not-last:data-[slot=card]:before:rounded-b-[calc(var(--radius-xl)-1px)] *:not-first:data-[slot=card]:rounded-t-xl *:not-first:data-[slot=card]:before:rounded-t-[calc(var(--radius-xl)-1px)] *:data-[slot=card]:[clip-path:inset(var(--clip-top)_1px_var(--clip-bottom)_1px_round_calc(var(--radius-2xl)-1px))] *:data-[slot=card]:shadow-none *:data-[slot=card]:before:hidden *:data-[slot=card]:bg-clip-padding",
    className,
  )}
  data-slot="card-frame"
  {...restProps}
>
  {@render children?.()}
</div>

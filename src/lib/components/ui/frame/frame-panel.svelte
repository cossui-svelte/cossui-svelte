<script lang="ts">
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import { cn } from '$lib/utils.js';

interface Props extends HTMLAttributes<HTMLDivElement> {
  children?: Snippet;
}

let { class: className, children, ...restProps }: Props = $props();
</script>

<div
  class={cn(
    "relative rounded-xl border bg-background bg-clip-padding p-5 shadow-xs/5 before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-xl)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] dark:before:shadow-[0_-1px_--theme(--color-white/6%)]",
    className,
  )}
  data-slot="frame-panel"
  {...restProps}
>
  {@render children?.()}
</div>

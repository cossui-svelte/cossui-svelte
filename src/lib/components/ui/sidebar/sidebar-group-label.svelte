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
    "flex h-8 shrink-0 items-center rounded-lg px-2 font-medium text-sidebar-foreground text-xs outline-hidden ring-sidebar-ring transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
    "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
    className,
  )}
  data-sidebar="group-label"
  data-slot="sidebar-group-label"
  {...restProps}
>
  {@render children?.()}
</div>

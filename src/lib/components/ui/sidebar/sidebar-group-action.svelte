<script lang="ts">
import type { Snippet } from 'svelte';
import type { HTMLButtonAttributes } from 'svelte/elements';
import { cn } from '$lib/utils.js';

interface Props extends HTMLButtonAttributes {
  children?: Snippet;
}

let { class: className, children, ...restProps }: Props = $props();
</script>

<button
  class={cn(
    "absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-lg p-0 text-sidebar-foreground outline-hidden ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg:not([class*='size-'])]:size-4 [&>svg]:shrink-0",
    "after:absolute after:-inset-2 md:after:hidden",
    "group-data-[collapsible=icon]:hidden",
    className,
  )}
  data-sidebar="group-action"
  data-slot="sidebar-group-action"
  type="button"
  {...restProps}
>
  {@render children?.()}
</button>

<script lang="ts">
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import { cn } from '$lib/utils.js';

interface Props extends HTMLAttributes<HTMLUListElement> {
  children?: Snippet;
}

let { class: className, children, ...restProps }: Props = $props();
</script>

<ul
  class={cn(
    "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-sidebar-border border-l px-2.5 py-0.5",
    "group-data-[collapsible=icon]:hidden",
    className,
  )}
  data-sidebar="menu-sub"
  data-slot="sidebar-menu-sub"
  {...restProps}
>
  {@render children?.()}
</ul>

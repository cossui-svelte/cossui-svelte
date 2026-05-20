<script lang="ts">
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import { cn } from '$lib/utils.js';

interface Props extends HTMLAttributes<HTMLLIElement> {
  children?: Snippet;
}

let { class: className, children, ...restProps }: Props = $props();
</script>

<li
  class={cn("group/menu-sub-item relative", className)}
  data-sidebar="menu-sub-item"
  data-slot="sidebar-menu-sub-item"
  {...restProps}
>
  {@render children?.()}
</li>

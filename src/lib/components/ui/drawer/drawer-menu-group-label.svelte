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
  class={cn("px-2 py-1.5 font-medium text-muted-foreground text-xs", className)}
  data-slot="drawer-menu-group-label"
  {...restProps}
>
  {@render children?.()}
</div>

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
  class={cn("w-full text-sm", className)}
  data-sidebar="group-content"
  data-slot="sidebar-group-content"
  {...restProps}
>
  {@render children?.()}
</div>

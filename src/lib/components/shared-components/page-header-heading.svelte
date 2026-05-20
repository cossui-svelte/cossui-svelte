<script lang="ts">
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import { cn } from '$lib/utils.js';

interface Props extends HTMLAttributes<HTMLHeadingElement> {
  children?: Snippet;
  class?: string;
}

let { class: className, children, ...restProps }: Props = $props();
</script>

<h1 class={cn("font-heading text-4xl lg:text-5xl", className)} {...restProps}>
  {@render children?.()}
</h1>

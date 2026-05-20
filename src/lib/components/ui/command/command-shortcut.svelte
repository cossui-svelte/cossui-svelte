<script lang="ts">
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import { cn } from '$lib/utils.js';

interface Props extends HTMLAttributes<HTMLElement> {
  children?: Snippet;
}

let { class: className, children, ...restProps }: Props = $props();
</script>

<kbd
  class={cn(
    "ms-auto font-medium font-sans text-muted-foreground/72 text-xs tracking-widest",
    className,
  )}
  data-slot="command-shortcut"
  {...restProps}
>
  {@render children?.()}
</kbd>

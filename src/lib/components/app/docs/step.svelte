<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils';

  interface Props {
    children?: Snippet;
    class?: string;
  }

  let { children, class: className }: Props = $props();
</script>

<h3
  class={cn(
    'relative mt-8 mb-2 font-heading font-semibold text-lg [counter-increment:step] first:mt-0',
    "before:-translate-y-1/2 before:absolute before:top-1/2 before:start-[calc(-2rem-1px)] before:flex before:size-6 before:items-center before:justify-center before:rounded-full before:border before:bg-muted before:font-mono before:text-muted-foreground before:text-sm before:content-[counter(step)]",
    className
  )}
>
  {@render children?.()}
</h3>

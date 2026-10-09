<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '#lib/utils.js';

  let {
    class: className,
    children,
    ...restProps
  }: HTMLAttributes<HTMLElement> & { children?: Snippet } = $props();
</script>

<header class={cn('mb-6 flex items-start justify-between gap-4', className)} {...restProps}>
  {@render children?.()}
</header>

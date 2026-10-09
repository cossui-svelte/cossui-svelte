<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '#lib/utils.js';

  let {
    class: className,
    children,
    ...restProps
  }: HTMLAttributes<HTMLDivElement> & { children?: Snippet } = $props();
</script>

<div class={cn('grid grid-cols-1 gap-6 md:grid-cols-2', className)} {...restProps}>
  {@render children?.()}
</div>

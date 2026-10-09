<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '#lib/utils.js';

  let {
    class: className,
    children,
    ...restProps
  }: HTMLAttributes<HTMLParagraphElement> & { children?: Snippet } = $props();
</script>

<p class={cn('text-muted-foreground text-sm max-md:hidden', className)} {...restProps}>
  {@render children?.()}
</p>

<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '#lib/utils.js';

  let {
    children,
    child,
    class: className,
    ...restProps
  }: HTMLAttributes<HTMLDivElement> & {
    children?: Snippet;
    child?: Snippet<[{ props: Record<string, unknown> }]>;
  } = $props();

  const mergedProps = $derived({
    'data-slot': 'list-item-actions',
    ...restProps,
    class: cn('relative flex items-center gap-4', className)
  });
</script>

{#if child}
  {@render child({ props: mergedProps })}
{:else}
  <div {...mergedProps}>
    {@render children?.()}
  </div>
{/if}

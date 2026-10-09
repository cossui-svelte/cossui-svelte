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
    'data-slot': 'list-item-content',
    ...restProps,
    class: cn('flex min-w-0 flex-1 flex-col gap-3', className)
  });
</script>

{#if child}
  {@render child({ props: mergedProps })}
{:else}
  <div {...mergedProps}>
    {@render children?.()}
  </div>
{/if}

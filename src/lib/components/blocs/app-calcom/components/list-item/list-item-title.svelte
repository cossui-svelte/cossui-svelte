<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '#lib/utils.js';

  let {
    children,
    child,
    class: className,
    ...restProps
  }: HTMLAttributes<HTMLHeadingElement> & {
    children?: Snippet;
    child?: Snippet<[{ props: Record<string, unknown> }]>;
  } = $props();

  const mergedProps = $derived({
    'data-slot': 'list-item-title',
    ...restProps,
    class: cn('font-semibold sm:text-sm', className)
  });
</script>

{#if child}
  {@render child({ props: mergedProps })}
{:else}
  <h2 {...mergedProps}>
    {@render children?.()}
  </h2>
{/if}

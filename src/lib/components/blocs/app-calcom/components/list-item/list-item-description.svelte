<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '#lib/utils.js';

  let {
    children,
    child,
    class: className,
    ...restProps
  }: HTMLAttributes<HTMLParagraphElement> & {
    children?: Snippet;
    child?: Snippet<[{ props: Record<string, unknown> }]>;
  } = $props();

  const mergedProps = $derived({
    'data-slot': 'list-item-description',
    ...restProps,
    class: cn('text-muted-foreground text-sm', className)
  });
</script>

{#if child}
  {@render child({ props: mergedProps })}
{:else}
  <p {...mergedProps}>
    {@render children?.()}
  </p>
{/if}

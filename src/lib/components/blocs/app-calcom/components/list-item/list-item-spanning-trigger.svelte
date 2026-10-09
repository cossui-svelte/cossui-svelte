<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '#lib/utils.js';
  import { spanningTriggerClasses } from './list-item-classes.js';

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
    'data-spanning-trigger': '',
    ...restProps,
    class: cn(spanningTriggerClasses, className)
  });
</script>

{#if child}
  {@render child({ props: mergedProps })}
{:else}
  <div {...mergedProps}>
    {@render children?.()}
  </div>
{/if}

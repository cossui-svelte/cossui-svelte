<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn, type WithElementRef } from '#lib/utils.js';
  import SegmentedControlIndicator from './segmented-control-indicator.svelte';
  import {
    type SegmentedControlSize,
    setSegmentedControlSize
  } from './segmented-control-variants.js';

  type Props = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
    size?: SegmentedControlSize;
    /**
     * Replaces the rendered `<div>`, e.g. with a Radio Group primitive or a `<nav>`.
     * Spread `props` on your element and render `content` inside it: it holds the
     * items plus the sliding indicator.
     */
    child?: Snippet<[{ props: Record<string, unknown>; content: Snippet }]>;
  };

  let {
    ref = $bindable(null),
    class: className,
    size = 'default',
    child,
    children,
    ...restProps
  }: Props = $props();

  setSegmentedControlSize(() => size);

  const mergedProps = $derived({
    ...restProps,
    class: cn(
      'relative z-0 flex w-fit items-center justify-center gap-0.5 rounded-lg bg-muted p-0.5',
      className
    ),
    'data-size': size,
    'data-slot': 'segmented-control'
  });
</script>

{#snippet content()}
  {@render children?.()}
  <SegmentedControlIndicator />
{/snippet}

{#if child}
  {@render child({ props: mergedProps, content })}
{:else}
  <div bind:this={ref} {...mergedProps}>
    {@render content()}
  </div>
{/if}

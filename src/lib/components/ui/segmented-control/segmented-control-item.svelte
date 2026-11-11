<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import { cn, type WithElementRef } from '#lib/utils.js';
  import {
    getSegmentedControlSize,
    type SegmentedControlSize,
    segmentedControlItemLayoutClassName,
    segmentedControlItemSizeClassNames
  } from './segmented-control-variants.js';

  type Props = WithElementRef<HTMLButtonAttributes, HTMLButtonElement> & {
    size?: SegmentedControlSize;
    /** Replaces the rendered `<button>`, e.g. with a radio or a link. Spread `props` on your element. */
    child?: Snippet<[{ props: Record<string, unknown> }]>;
  };

  let {
    ref = $bindable(null),
    class: className,
    size,
    child,
    children,
    ...restProps
  }: Props = $props();

  const contextSize = getSegmentedControlSize();
  const resolvedSize = $derived(size ?? contextSize());

  const mergedProps = $derived({
    ...restProps,
    class: cn(
      'relative inline-flex shrink-0 cursor-pointer select-none items-center justify-center whitespace-nowrap rounded-md border border-transparent font-medium text-base text-muted-foreground/72 outline-2 outline-transparent transition-[color,outline-color] hover:bg-transparent hover:text-muted-foreground focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-64 data-disabled:pointer-events-none data-disabled:opacity-64 sm:text-sm',
      'data-checked:bg-background data-checked:text-foreground data-checked:shadow-sm/5 dark:data-checked:bg-input',
      'aria-[current=page]:bg-background aria-[current=page]:text-foreground aria-[current=page]:shadow-sm/5 dark:aria-[current=page]:bg-input',
      'data-pressed:bg-background data-pressed:text-foreground data-pressed:shadow-sm/5 dark:data-pressed:bg-input',
      '[:has(>[data-slot=segmented-control-indicator]:not([hidden]))>&]:bg-transparent! [:has(>[data-slot=segmented-control-indicator]:not([hidden]))>&]:shadow-none!',
      segmentedControlItemLayoutClassName,
      segmentedControlItemSizeClassNames[resolvedSize],
      className
    ),
    'data-size': resolvedSize,
    'data-slot': 'segmented-control-item'
  });
</script>

{#if child}
  {@render child({ props: mergedProps })}
{:else}
  <button bind:this={ref} type="button" {...mergedProps}>
    {@render children?.()}
  </button>
{/if}

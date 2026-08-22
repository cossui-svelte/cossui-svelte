<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn, type WithElementRef } from '$lib/utils';

  type Props = WithElementRef<HTMLAttributes<HTMLTimeElement>> & {
    child?: Snippet<[{ props: HTMLAttributes<HTMLTimeElement> }]>;
  };

  let { child, children, class: className, ref = $bindable(null), ...restProps }: Props = $props();

  const mergedProps = $derived({
    ...restProps,
    class: cn(
      'text-muted-foreground mb-1 block text-xs font-medium group-data-[orientation=vertical]/timeline:max-sm:h-4',
      className
    ),
    'data-slot': 'timeline-date'
  });
</script>

{#if child}
  {@render child({ props: mergedProps })}
{:else}
  <time bind:this={ref} {...mergedProps}> {@render children?.()} </time>
{/if}

<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn, type WithElementRef } from '#lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    children,
    child,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLElement>> & {
    child?: Snippet<[{ props: Record<string, unknown> }]>;
  } = $props();

  const mergedProps = $derived({
    class: cn(
      'flex h-9 shrink-0 items-center gap-2 rounded-lg px-2 font-medium text-base text-sidebar-accent-foreground outline-hidden ring-sidebar-ring transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 sm:text-sm lg:h-7 [&>svg]:size-4.5 [&>svg]:shrink-0 sm:[&>svg]:size-4',
      className
    ),
    'data-sidebar': 'group-label',
    'data-slot': 'sidebar-group-label',
    ...restProps
  });
</script>

{#if child}
  {@render child({ props: mergedProps })}
{:else}
  <div bind:this={ref} {...mergedProps}>
    {@render children?.()}
  </div>
{/if}

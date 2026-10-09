<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn, type WithElementRef } from '#lib/utils.js';
  import { sidebarMenuSubButtonClass } from './menu-button-class.js';

  // An <a> when `href` is set, otherwise a <button> (or `child`, e.g. a collapsible trigger).
  let {
    ref = $bindable(null),
    class: className,
    children,
    child,
    href,
    isActive = false,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLElement>> & {
    child?: Snippet<[{ props: Record<string, unknown> }]>;
    href?: string;
    isActive?: boolean;
  } = $props();

  const mergedProps = $derived({
    class: cn(sidebarMenuSubButtonClass, className),
    'data-active': isActive,
    'data-sidebar': 'menu-sub-button',
    'data-slot': 'sidebar-menu-sub-button',
    ...restProps
  });
</script>

{#if child}
  {@render child({ props: mergedProps })}
{:else if href}
  <a bind:this={ref} {href} {...mergedProps}>
    {@render children?.()}
  </a>
{:else}
  <button bind:this={ref} type="button" {...mergedProps}>
    {@render children?.()}
  </button>
{/if}

<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { Tooltip, TooltipPopup } from '#lib/components/ui/tooltip/index.js';
  import { cn, type WithElementRef } from '#lib/utils.js';
  import { mediaQuery } from '../lib/media-query.svelte.js';
  import { sidebarMenuButtonClass } from './menu-button-class.js';

  // Renders a <button>, or an <a> when `href` is set, or whatever `child` renders (e.g. a menu trigger).
  // `tooltip` is only shown while the sidebar is collapsed to icons (md → lg).
  let {
    ref = $bindable(null),
    class: className,
    children,
    child,
    href,
    isActive = false,
    tooltip,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLElement>> & {
    child?: Snippet<[{ props: Record<string, unknown> }]>;
    href?: string;
    isActive?: boolean;
    tooltip?: string;
  } = $props();

  const isMobile = mediaQuery('max-md');
  const isBetweenMdAndLg = mediaQuery('md:max-lg');
  const showTooltip = $derived(!!tooltip && isBetweenMdAndLg.current && !isMobile.current);

  let tipOpen = $state(false);
  let anchor = $state<HTMLElement | null>(null);

  const tooltipHandlers = $derived(
    showTooltip
      ? {
          onpointerenter: (event: PointerEvent) => {
            anchor = event.currentTarget as HTMLElement;
            tipOpen = true;
          },
          onpointerleave: () => (tipOpen = false),
          onfocus: (event: FocusEvent) => {
            anchor = event.currentTarget as HTMLElement;
            tipOpen = true;
          },
          onblur: () => (tipOpen = false)
        }
      : {}
  );

  const buttonProps = $derived({
    class: cn(sidebarMenuButtonClass, className),
    'data-active': isActive,
    'data-sidebar': 'menu-button',
    'data-slot': 'sidebar-menu-button',
    ...tooltipHandlers,
    ...restProps
  });
</script>

{#snippet button()}
  {#if child}
    {@render child({ props: buttonProps })}
  {:else if href}
    <a bind:this={ref} {href} {...buttonProps}>
      {@render children?.()}
    </a>
  {:else}
    <button bind:this={ref} type="button" {...buttonProps}>
      {@render children?.()}
    </button>
  {/if}
{/snippet}

{#if showTooltip}
  <Tooltip bind:open={tipOpen}>
    {@render button()}
    <TooltipPopup customAnchor={anchor} side="right" align="center">{tooltip}</TooltipPopup>
  </Tooltip>
{:else}
  {@render button()}
{/if}

<script lang="ts">
  import type { Snippet } from 'svelte';
  import { DrawerPrimitive, drawerMenuItemClass } from '#lib/components/ui/drawer/index.js';
  import { MenuItem, MenuLinkItem } from '#lib/components/ui/menu/index.js';
  import { cn } from '#lib/utils.js';
  import { type AdaptiveMenuVisibility, getAdaptiveMenuVariant, isVisible } from './context.js';

  type Props = {
    class?: string;
    disabled?: boolean;
    /** When set, the item renders as a link (MenuLinkItem / anchor). */
    href?: string;
    onclick?: (event: MouseEvent) => void;
    show?: AdaptiveMenuVisibility;
    variant?: 'default' | 'destructive';
    children?: Snippet;
  };

  let {
    class: className,
    disabled,
    href,
    onclick,
    show,
    variant: itemVariant = 'default',
    children
  }: Props = $props();

  const variant = getAdaptiveMenuVariant();
</script>

{#if isVisible(variant, show)}
  {#if variant === 'menu'}
    {#if href}
      <MenuLinkItem class={className} {href} {onclick} variant={itemVariant}>
        {@render children?.()}
      </MenuLinkItem>
    {:else}
      <MenuItem class={className} {disabled} {onclick} variant={itemVariant}>
        {@render children?.()}
      </MenuItem>
    {/if}
  {:else if href}
    <DrawerPrimitive.Close
      as="a"
      aria-disabled={disabled}
      class={cn(drawerMenuItemClass, className)}
      data-slot="drawer-menu-item"
      data-variant={itemVariant}
      {onclick}
      {...{ href }}
    >
      {@render children?.()}
    </DrawerPrimitive.Close>
  {:else}
    <DrawerPrimitive.Close
      class={cn(drawerMenuItemClass, className)}
      data-slot="drawer-menu-item"
      data-variant={itemVariant}
      {disabled}
      {onclick}
      type="button"
    >
      {@render children?.()}
    </DrawerPrimitive.Close>
  {/if}
{/if}

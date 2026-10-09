<script lang="ts">
  import type { ComponentProps, Snippet } from 'svelte';
  import { DrawerMenu, DrawerPanel, DrawerPopup } from '#lib/components/ui/drawer/index.js';
  import { MenuPopup } from '#lib/components/ui/menu/index.js';
  import { getAdaptiveMenuVariant } from './context.js';

  let {
    align,
    alignOffset,
    side,
    sideOffset,
    children,
    menuPopupProps,
    drawerPopupProps,
    drawerPanelProps,
    drawerMenuProps
  }: {
    align?: ComponentProps<typeof MenuPopup>['align'];
    alignOffset?: ComponentProps<typeof MenuPopup>['alignOffset'];
    side?: ComponentProps<typeof MenuPopup>['side'];
    sideOffset?: ComponentProps<typeof MenuPopup>['sideOffset'];
    children?: Snippet;
    menuPopupProps?: Omit<ComponentProps<typeof MenuPopup>, 'children'>;
    drawerPopupProps?: Omit<ComponentProps<typeof DrawerPopup>, 'children'>;
    drawerPanelProps?: Omit<ComponentProps<typeof DrawerPanel>, 'children'>;
    drawerMenuProps?: Omit<ComponentProps<typeof DrawerMenu>, 'children'>;
  } = $props();

  const variant = getAdaptiveMenuVariant();
</script>

{#if variant === 'menu'}
  <MenuPopup {align} {alignOffset} {side} {sideOffset} {...menuPopupProps}>
    {@render children?.()}
  </MenuPopup>
{:else}
  <DrawerPopup showBar {...drawerPopupProps}>
    <DrawerPanel {...drawerPanelProps}>
      <DrawerMenu {...drawerMenuProps}>{@render children?.()}</DrawerMenu>
    </DrawerPanel>
  </DrawerPopup>
{/if}

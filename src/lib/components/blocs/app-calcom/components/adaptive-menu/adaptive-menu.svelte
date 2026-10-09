<script lang="ts">
  import type { ComponentProps, Snippet } from 'svelte';
  import { Drawer } from '#lib/components/ui/drawer/index.js';
  import { Menu } from '#lib/components/ui/menu/index.js';
  import AdaptiveMenuVariant from './adaptive-menu-variant.svelte';

  let {
    children,
    menuProps,
    drawerProps
  }: {
    children?: Snippet;
    menuProps?: Omit<ComponentProps<typeof Menu>, 'children'>;
    drawerProps?: Omit<ComponentProps<typeof Drawer>, 'children'>;
  } = $props();
</script>

<Menu {...menuProps}>
  <AdaptiveMenuVariant variant="menu">{@render children?.()}</AdaptiveMenuVariant>
</Menu>
<Drawer {...drawerProps}>
  <AdaptiveMenuVariant variant="drawer">{@render children?.()}</AdaptiveMenuVariant>
</Drawer>

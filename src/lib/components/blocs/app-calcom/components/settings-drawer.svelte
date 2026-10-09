<script lang="ts">
  import MenuIcon from '@lucide/svelte/icons/menu';
  import {
    Drawer,
    DrawerHeader,
    DrawerPanel,
    DrawerPopup,
    DrawerTitle,
    DrawerTrigger
  } from '#lib/components/ui/drawer/index.js';
  import { SidebarMenuButton } from '../ui/index.js';
  import SettingsNavContent from './settings-nav-content.svelte';

  let open = $state(false);
</script>

<Drawer bind:open position="left">
  <SidebarMenuButton aria-label="Menu" tooltip="Menu">
    {#snippet child({ props })}
      <DrawerTrigger {...props}>
        <MenuIcon />
      </DrawerTrigger>
    {/snippet}
  </SidebarMenuButton>
  <DrawerPopup showCloseButton variant="straight">
    <DrawerHeader class="sr-only">
      <DrawerTitle>Settings</DrawerTitle>
    </DrawerHeader>
    <DrawerPanel class="px-2 pt-4!">
      <SettingsNavContent onItemClick={() => (open = false)} />
    </DrawerPanel>
  </DrawerPopup>
</Drawer>

<script lang="ts">
  import CheckIcon from '@lucide/svelte/icons/check';
  import ChevronsUpDownIcon from '@lucide/svelte/icons/chevrons-up-down';
  import GalleryVerticalEndIcon from '@lucide/svelte/icons/gallery-vertical-end';
  import { Menu, MenuItem, MenuPopup, MenuTrigger } from '#lib/components/ui/menu/index.js';
  import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
  } from '#lib/components/ui/sidebar/index.js';

  let { versions, defaultVersion }: { versions: string[]; defaultVersion: string } = $props();

  // svelte-ignore state_referenced_locally
  let selectedVersion = $state(defaultVersion);
</script>

<SidebarMenu>
  <SidebarMenuItem>
    <Menu>
      <SidebarMenuButton
        size="lg"
        class="data-popup-open:bg-sidebar-accent data-popup-open:text-sidebar-accent-foreground"
      >
        {#snippet child({ props })}
          <MenuTrigger {...props}>
            <div
              class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
            >
              <GalleryVerticalEndIcon class="size-4" />
            </div>
            <div class="flex flex-col gap-0.5 leading-none">
              <span class="font-semibold">Documentation</span>
              <span class="">v{selectedVersion}</span>
            </div>
            <ChevronsUpDownIcon class="ms-auto" />
          </MenuTrigger>
        {/snippet}
      </SidebarMenuButton>
      <MenuPopup class="w-(--anchor-width)" align="start">
        {#each versions as version (version)}
          <MenuItem onclick={() => (selectedVersion = version)}>
            v{version}
            {#if version === selectedVersion}
              <CheckIcon class="ms-auto" />
            {/if}
          </MenuItem>
        {/each}
      </MenuPopup>
    </Menu>
  </SidebarMenuItem>
</SidebarMenu>

<script lang="ts">
  import DotsIcon from '@lucide/svelte/icons/ellipsis';
  import FolderIcon from '@lucide/svelte/icons/folder';
  import Share3Icon from '@lucide/svelte/icons/share';
  import TrashIcon from '@lucide/svelte/icons/trash';
  import type { Component } from 'svelte';
  import { Menu, MenuItem, MenuPopup, MenuSeparator, MenuTrigger } from '$lib/components/ui/menu';
  import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar
  } from '$lib/components/ui/sidebar';

  let { items }: { items: { name: string; url: string; icon: Component }[] } = $props();

  const sidebar = useSidebar();
</script>

<SidebarGroup class="group-data-[collapsible=icon]:hidden">
  <SidebarGroupLabel>Documents</SidebarGroupLabel>
  <SidebarMenu>
    {#each items as item (item.name)}
      <SidebarMenuItem>
        <SidebarMenuButton>
          {#snippet child({ props })}
            <a {...props} href={item.url}>
              <item.icon />
              <span>{item.name}</span>
            </a>
          {/snippet}
        </SidebarMenuButton>
        <Menu>
          <SidebarMenuAction showOnHover class="rounded-sm data-popup-open:bg-accent">
            {#snippet child({ props })}
              <MenuTrigger {...props}>
                <DotsIcon />
                <span class="sr-only">More</span>
              </MenuTrigger>
            {/snippet}
          </SidebarMenuAction>
          <MenuPopup
            class="w-24 rounded-lg"
            side={sidebar.isMobile ? 'bottom' : 'right'}
            align={sidebar.isMobile ? 'end' : 'start'}
          >
            <MenuItem>
              <FolderIcon />
              <span>Open</span>
            </MenuItem>
            <MenuItem>
              <Share3Icon />
              <span>Share</span>
            </MenuItem>
            <MenuSeparator />
            <MenuItem variant="destructive">
              <TrashIcon />
              <span>Delete</span>
            </MenuItem>
          </MenuPopup>
        </Menu>
      </SidebarMenuItem>
    {/each}
    <SidebarMenuItem>
      <SidebarMenuButton class="text-sidebar-foreground/70">
        <DotsIcon class="text-sidebar-foreground/70" />
        <span>More</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  </SidebarMenu>
</SidebarGroup>

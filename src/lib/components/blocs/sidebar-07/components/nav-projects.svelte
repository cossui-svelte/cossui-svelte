<script lang="ts">
  import EllipsisIcon from '@lucide/svelte/icons/ellipsis';
  import FolderIcon from '@lucide/svelte/icons/folder';
  import ForwardIcon from '@lucide/svelte/icons/forward';
  import Trash2Icon from '@lucide/svelte/icons/trash-2';
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

  let {
    projects
  }: {
    projects: {
      name: string;
      url: string;
      icon: Component;
    }[];
  } = $props();

  const sidebar = useSidebar();
</script>

<SidebarGroup class="group-data-[collapsible=icon]:hidden">
  <SidebarGroupLabel>Projects</SidebarGroupLabel>
  <SidebarMenu>
    {#each projects as item (item.name)}
      <SidebarMenuItem>
        <SidebarMenuButton>
          {#snippet child({
    props
  })}
            <a href={item.url} {...props}>
              <item.icon />
              <span>{item.name}</span>
            </a>
          {/snippet}
        </SidebarMenuButton>
        <Menu>
          <SidebarMenuAction showOnHover>
            {#snippet child({
    props
  })}
              <MenuTrigger {...props}>
                <EllipsisIcon />
                <span class="sr-only">More</span>
              </MenuTrigger>
            {/snippet}
          </SidebarMenuAction>
          <MenuPopup
            class="w-48 rounded-lg"
            side={sidebar.isMobile ? 'bottom' : 'right'}
            align={sidebar.isMobile ? 'end' : 'start'}
          >
            <MenuItem>
              <FolderIcon class="text-muted-foreground" />
              <span>View Project</span>
            </MenuItem>
            <MenuItem>
              <ForwardIcon class="text-muted-foreground" />
              <span>Share Project</span>
            </MenuItem>
            <MenuSeparator />
            <MenuItem>
              <Trash2Icon class="text-muted-foreground" />
              <span>Delete Project</span>
            </MenuItem>
          </MenuPopup>
        </Menu>
      </SidebarMenuItem>
    {/each}
    <SidebarMenuItem>
      <SidebarMenuButton class="text-sidebar-foreground/70">
        <EllipsisIcon class="text-sidebar-foreground/70" />
        <span>More</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  </SidebarMenu>
</SidebarGroup>

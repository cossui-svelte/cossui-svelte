<script lang="ts">
  import ArrowUpRightIcon from '@lucide/svelte/icons/arrow-up-right';
  import EllipsisIcon from '@lucide/svelte/icons/ellipsis';
  import LinkIcon from '@lucide/svelte/icons/link';
  import StarOffIcon from '@lucide/svelte/icons/star-off';
  import Trash2Icon from '@lucide/svelte/icons/trash-2';
  import {
    Menu,
    MenuItem,
    MenuPopup,
    MenuSeparator,
    MenuTrigger
  } from '#lib/components/ui/menu/index.js';
  import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar
  } from '#lib/components/ui/sidebar/index.js';

  let { favorites }: { favorites: { name: string; url: string; emoji: string }[] } = $props();

  const sidebar = useSidebar();
</script>

<SidebarGroup class="group-data-[collapsible=icon]:hidden">
  <SidebarGroupLabel>Favorites</SidebarGroupLabel>
  <SidebarMenu>
    {#each favorites as item (item.name)}
      <SidebarMenuItem>
        <SidebarMenuButton>
          {#snippet child({ props })}
            <a href={item.url} title={item.name} {...props}>
              <span>{item.emoji}</span>
              <span>{item.name}</span>
            </a>
          {/snippet}
        </SidebarMenuButton>
        <Menu>
          <SidebarMenuAction showOnHover>
            {#snippet child({ props })}
              <MenuTrigger {...props}>
                <EllipsisIcon />
                <span class="sr-only">More</span>
              </MenuTrigger>
            {/snippet}
          </SidebarMenuAction>
          <MenuPopup
            class="w-56 rounded-lg"
            side={sidebar.isMobile ? 'bottom' : 'right'}
            align={sidebar.isMobile ? 'end' : 'start'}
          >
            <MenuItem>
              <StarOffIcon class="text-muted-foreground" />
              <span>Remove from Favorites</span>
            </MenuItem>
            <MenuSeparator />
            <MenuItem>
              <LinkIcon class="text-muted-foreground" />
              <span>Copy Link</span>
            </MenuItem>
            <MenuItem>
              <ArrowUpRightIcon class="text-muted-foreground" />
              <span>Open in New Tab</span>
            </MenuItem>
            <MenuSeparator />
            <MenuItem>
              <Trash2Icon class="text-muted-foreground" />
              <span>Delete</span>
            </MenuItem>
          </MenuPopup>
        </Menu>
      </SidebarMenuItem>
    {/each}
    <SidebarMenuItem>
      <SidebarMenuButton class="text-sidebar-foreground/70">
        <EllipsisIcon />
        <span>More</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  </SidebarMenu>
</SidebarGroup>

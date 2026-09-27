<script lang="ts">
  import EllipsisIcon from '@lucide/svelte/icons/ellipsis';
  import { Menu, MenuLinkItem, MenuPopup, MenuTrigger } from '$lib/components/ui/menu';
  import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar
  } from '$lib/components/ui/sidebar';

  let {
    items
  }: {
    items: {
      title: string;
      url: string;
      icon?: typeof EllipsisIcon;
      isActive?: boolean;
      items?: {
        title: string;
        url: string;
      }[];
    }[];
  } = $props();

  const sidebar = useSidebar();
</script>

<SidebarGroup>
  <SidebarMenu>
    {#each items as item (item.title)}
      <Menu>
        <SidebarMenuItem>
          <SidebarMenuButton
            class="data-popup-open:bg-sidebar-accent data-popup-open:text-sidebar-accent-foreground"
          >
            {#snippet child({
    props
  })}
              <MenuTrigger {...props}>
                {item.title}
                <EllipsisIcon class="ms-auto" />
              </MenuTrigger>
            {/snippet}
          </SidebarMenuButton>
          {#if item.items?.length}
            <MenuPopup
              side={sidebar.isMobile ? 'bottom' : 'right'}
              align={sidebar.isMobile ? 'end' : 'start'}
              class="min-w-56 rounded-lg"
            >
              {#each item.items as subItem (subItem.title)}
                <MenuLinkItem href={subItem.url}>{subItem.title}</MenuLinkItem>
              {/each}
            </MenuPopup>
          {/if}
        </SidebarMenuItem>
      </Menu>
    {/each}
  </SidebarMenu>
</SidebarGroup>

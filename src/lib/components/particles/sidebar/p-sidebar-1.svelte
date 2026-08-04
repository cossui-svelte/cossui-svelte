<script lang="ts">
  import CalendarIcon from '@lucide/svelte/icons/calendar';
  import HouseIcon from '@lucide/svelte/icons/house';
  import InboxIcon from '@lucide/svelte/icons/inbox';
  import SearchIcon from '@lucide/svelte/icons/search';
  import SettingsIcon from '@lucide/svelte/icons/settings';
  import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger
  } from '$lib/components/ui/sidebar';

  // Menu items.
  const items = [
    {
      title: 'Home',
      url: '#',
      icon: HouseIcon
    },
    {
      title: 'Inbox',
      url: '#',
      icon: InboxIcon
    },
    {
      title: 'Calendar',
      url: '#',
      icon: CalendarIcon
    },
    {
      title: 'Search',
      url: '#',
      icon: SearchIcon
    },
    {
      title: 'Settings',
      url: '#',
      icon: SettingsIcon
    }
  ];
</script>

<SidebarProvider>
  <Sidebar>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Application</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {#each items as item (item.title)}
              <SidebarMenuItem>
                <SidebarMenuButton>
                  {#snippet child({ props })}
                    <a href={item.url} {...props}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  {/snippet}
                </SidebarMenuButton>
              </SidebarMenuItem>
            {/each}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
  <main>
    <SidebarTrigger />
  </main>
</SidebarProvider>

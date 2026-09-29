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
    SidebarInset,
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

<!-- transform-gpu makes this box the containing block for the sidebar's `fixed`
     panel, so the demo stays inside the preview card instead of the viewport. -->
<div class="relative h-100 w-full transform-gpu overflow-hidden rounded-xl border">
  <SidebarProvider class="h-full min-h-full">
    <Sidebar class="h-full">
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
    <SidebarInset class="h-full">
      <header class="flex h-12 shrink-0 items-center gap-2 border-b px-3">
        <SidebarTrigger />
        <span class="font-medium text-sm">Application</span>
      </header>
      <div class="p-4 text-muted-foreground text-sm">Content area</div>
    </SidebarInset>
  </SidebarProvider>
</div>

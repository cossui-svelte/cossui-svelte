<script lang="ts">
  import PlusIcon from '@lucide/svelte/icons/plus';
  import type { ComponentProps } from 'svelte';
  import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator
  } from '#lib/components/ui/sidebar/index.js';
  import Calendars from './calendars.svelte';
  import DatePicker from './date-picker.svelte';
  import NavUser from './nav-user.svelte';

  // This is sample data.
  const data = {
    user: {
      name: 'shadcn',
      email: 'm@example.com',
      avatar: '/avatars/user.jpg'
    },
    calendars: [
      {
        name: 'My Calendars',
        items: ['Personal', 'Work', 'Family']
      },
      {
        name: 'Favorites',
        items: ['Holidays', 'Birthdays']
      },
      {
        name: 'Other',
        items: ['Travel', 'Reminders', 'Deadlines']
      }
    ]
  };

  let { ref = $bindable(null), ...restProps }: ComponentProps<typeof Sidebar> = $props();
</script>

<Sidebar
  bind:ref
  collapsible="none"
  class="sticky top-0 hidden h-svh border-s lg:flex"
  {...restProps}
>
  <SidebarHeader class="h-16 border-b border-sidebar-border">
    <NavUser user={data.user} />
  </SidebarHeader>
  <SidebarContent>
    <DatePicker />
    <SidebarSeparator class="mx-0" />
    <Calendars calendars={data.calendars} />
  </SidebarContent>
  <SidebarFooter>
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton>
          <PlusIcon />
          <span>New Calendar</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarFooter>
</Sidebar>

<script lang="ts">
  import NotificationIcon from '@lucide/svelte/icons/bell';
  import UserCircleIcon from '@lucide/svelte/icons/circle-user';
  import CreditCardIcon from '@lucide/svelte/icons/credit-card';
  import DotsVerticalIcon from '@lucide/svelte/icons/ellipsis-vertical';
  import LogoutIcon from '@lucide/svelte/icons/log-out';
  import { Avatar, AvatarFallback, AvatarImage } from '$lib/components/ui/avatar';
  import {
    Menu,
    MenuGroup,
    MenuGroupLabel,
    MenuItem,
    MenuPopup,
    MenuSeparator,
    MenuTrigger
  } from '$lib/components/ui/menu';
  import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar
  } from '$lib/components/ui/sidebar';

  let { user }: { user: { name: string; email: string; avatar: string } } = $props();

  const sidebar = useSidebar();
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
            <Avatar class="size-8 rounded-lg grayscale">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback class="rounded-lg">CN</AvatarFallback>
            </Avatar>
            <div class="grid flex-1 text-start text-sm leading-tight">
              <span class="truncate font-medium">{user.name}</span>
              <span class="truncate text-xs text-muted-foreground">
                {user.email}
              </span>
            </div>
            <DotsVerticalIcon class="ms-auto size-4" />
          </MenuTrigger>
        {/snippet}
      </SidebarMenuButton>
      <MenuPopup
        class="w-(--anchor-width) min-w-56 rounded-lg"
        side={sidebar.isMobile ? 'bottom' : 'right'}
        align="end"
        sideOffset={4}
      >
        <MenuGroup>
          <MenuGroupLabel class="p-0 font-normal">
            <div class="flex items-center gap-2 px-1 py-1.5 text-start text-sm">
              <Avatar class="size-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback class="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div class="grid flex-1 text-start text-sm leading-tight">
                <span class="truncate font-medium">{user.name}</span>
                <span class="truncate text-xs text-muted-foreground">
                  {user.email}
                </span>
              </div>
            </div>
          </MenuGroupLabel>
        </MenuGroup>
        <MenuSeparator />
        <MenuGroup>
          <MenuItem>
            <UserCircleIcon />
            Account
          </MenuItem>
          <MenuItem>
            <CreditCardIcon />
            Billing
          </MenuItem>
          <MenuItem>
            <NotificationIcon />
            Notifications
          </MenuItem>
        </MenuGroup>
        <MenuSeparator />
        <MenuItem>
          <LogoutIcon />
          Log out
        </MenuItem>
      </MenuPopup>
    </Menu>
  </SidebarMenuItem>
</SidebarMenu>

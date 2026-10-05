<script lang="ts">
  import BadgeCheckIcon from '@lucide/svelte/icons/badge-check';
  import BellIcon from '@lucide/svelte/icons/bell';
  import ChevronsUpDownIcon from '@lucide/svelte/icons/chevrons-up-down';
  import CreditCardIcon from '@lucide/svelte/icons/credit-card';
  import LogOutIcon from '@lucide/svelte/icons/log-out';
  import SparklesIcon from '@lucide/svelte/icons/sparkles';
  import { Avatar, AvatarFallback, AvatarImage } from '#lib/components/ui/avatar/index.js';
  import {
    Menu,
    MenuGroup,
    MenuGroupLabel,
    MenuItem,
    MenuPopup,
    MenuSeparator,
    MenuTrigger
  } from '#lib/components/ui/menu/index.js';
  import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar
  } from '#lib/components/ui/sidebar/index.js';

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
            <Avatar class="size-8 rounded-lg">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback class="rounded-lg">CN</AvatarFallback>
            </Avatar>
            <div class="grid flex-1 text-start text-sm leading-tight">
              <span class="truncate font-medium">{user.name}</span>
              <span class="truncate text-xs">{user.email}</span>
            </div>
            <ChevronsUpDownIcon class="ms-auto size-4" />
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
                <span class="truncate text-xs">{user.email}</span>
              </div>
            </div>
          </MenuGroupLabel>
        </MenuGroup>
        <MenuSeparator />
        <MenuGroup>
          <MenuItem>
            <SparklesIcon />
            Upgrade to Pro
          </MenuItem>
        </MenuGroup>
        <MenuSeparator />
        <MenuGroup>
          <MenuItem>
            <BadgeCheckIcon />
            Account
          </MenuItem>
          <MenuItem>
            <CreditCardIcon />
            Billing
          </MenuItem>
          <MenuItem>
            <BellIcon />
            Notifications
          </MenuItem>
        </MenuGroup>
        <MenuSeparator />
        <MenuItem>
          <LogOutIcon />
          Log out
        </MenuItem>
      </MenuPopup>
    </Menu>
  </SidebarMenuItem>
</SidebarMenu>

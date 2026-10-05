<script lang="ts">
  import ChevronsUpDownIcon from '@lucide/svelte/icons/chevrons-up-down';
  import PlusIcon from '@lucide/svelte/icons/plus';
  import type { Component } from 'svelte';
  import {
    Menu,
    MenuGroup,
    MenuGroupLabel,
    MenuItem,
    MenuPopup,
    MenuSeparator,
    MenuShortcut,
    MenuTrigger
  } from '#lib/components/ui/menu/index.js';
  import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar
  } from '#lib/components/ui/sidebar/index.js';

  let { teams }: { teams: { name: string; logo: Component; plan: string }[] } = $props();
  const sidebar = useSidebar();

  // svelte-ignore state_referenced_locally
  let activeTeam = $state(teams[0]);
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
              <activeTeam.logo class="size-4" />
            </div>
            <div class="grid flex-1 text-start text-sm leading-tight">
              <span class="truncate font-medium">
                {activeTeam.name}
              </span>
              <span class="truncate text-xs">{activeTeam.plan}</span>
            </div>
            <ChevronsUpDownIcon class="ms-auto" />
          </MenuTrigger>
        {/snippet}
      </SidebarMenuButton>
      <MenuPopup
        class="w-(--anchor-width) min-w-56 rounded-lg"
        align="start"
        side={sidebar.isMobile ? 'bottom' : 'right'}
        sideOffset={4}
      >
        <MenuGroup>
          <MenuGroupLabel class="text-xs text-muted-foreground">Teams</MenuGroupLabel>
          {#each teams as team, index (team.name)}
            <MenuItem onclick={() => (activeTeam = team)} class="gap-2 p-2">
              <div class="flex size-6 items-center justify-center rounded-md border">
                <team.logo class="size-3.5 shrink-0" />
              </div>
              {team.name}
              <MenuShortcut>⌘{index + 1}</MenuShortcut>
            </MenuItem>
          {/each}
        </MenuGroup>
        <MenuSeparator />
        <MenuItem class="gap-2 p-2">
          <div class="flex size-6 items-center justify-center rounded-md border bg-transparent">
            <PlusIcon class="size-4" />
          </div>
          <div class="font-medium text-muted-foreground">Add team</div>
        </MenuItem>
      </MenuPopup>
    </Menu>
  </SidebarMenuItem>
</SidebarMenu>

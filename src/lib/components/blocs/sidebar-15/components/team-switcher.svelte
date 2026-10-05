<script lang="ts">
  import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';
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
    SidebarMenuItem
  } from '#lib/components/ui/sidebar/index.js';

  let {
    teams
  }: {
    teams: {
      name: string;
      logo: Component;
      plan: string;
    }[];
  } = $props();

  // svelte-ignore state_referenced_locally
  let activeTeam = $state(teams[0]);
</script>

<SidebarMenu>
  <SidebarMenuItem>
    <Menu>
      <SidebarMenuButton class="w-fit px-1.5">
        {#snippet child({ props })}
          <MenuTrigger {...props}>
            <div
              class="flex aspect-square size-5 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground"
            >
              <activeTeam.logo class="size-3" />
            </div>
            <span class="truncate font-medium">{activeTeam.name}</span>
            <ChevronDownIcon class="opacity-50" />
          </MenuTrigger>
        {/snippet}
      </SidebarMenuButton>
      <MenuPopup class="w-64 rounded-lg" align="start" side="bottom" sideOffset={4}>
        <MenuGroup>
          <MenuGroupLabel class="text-xs text-muted-foreground">Teams</MenuGroupLabel>
          {#each teams as team, index (team.name)}
            <MenuItem onclick={() => (activeTeam = team)} class="gap-2 p-2">
              <div class="flex size-6 items-center justify-center rounded-xs border">
                <team.logo class="size-4 shrink-0" />
              </div>
              {team.name}
              <MenuShortcut>⌘{index + 1}</MenuShortcut>
            </MenuItem>
          {/each}
        </MenuGroup>
        <MenuSeparator />
        <MenuItem class="gap-2 p-2">
          <div class="flex size-6 items-center justify-center rounded-md border bg-background">
            <PlusIcon class="size-4" />
          </div>
          <div class="font-medium text-muted-foreground">Add team</div>
        </MenuItem>
      </MenuPopup>
    </Menu>
  </SidebarMenuItem>
</SidebarMenu>

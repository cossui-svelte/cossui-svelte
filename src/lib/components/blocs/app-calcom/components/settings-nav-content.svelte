<script lang="ts">
  import LayoutDashboardIcon from '@lucide/svelte/icons/layout-dashboard';
  import PlusIcon from '@lucide/svelte/icons/plus';
  import UsersIcon from '@lucide/svelte/icons/users';
  import { href, router } from '../lib/router.svelte.js';
  import {
    adminSettingsItems,
    orgSettingsItems,
    teamSettingsItems,
    userSettingsItems
  } from '../lib/settings-navigation-data.js';
  import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem
  } from '../ui/index.js';
  import SettingsNavSection from './settings-nav-section.svelte';
  import SettingsTeamCollapsible from './settings-team-collapsible.svelte';

  // `onItemClick` is set by the mobile drawer (closes it); the desktop sidebar leaves labels icon-only below lg.
  let { onItemClick }: { onItemClick?: () => void } = $props();

  const isOtherTeamsActive = $derived(router.isWithin('/teams/other'));
</script>

<div class="pb-2">
  <SidebarGroup>
    <SidebarMenuSub class="mx-0 gap-0.5 border-none px-0 md:max-lg:flex">
      <SidebarMenuSubItem>
        <SidebarMenuSubButton
          class="md:max-lg:flex"
          href={href('/settings/my-account/general')}
          isActive={router.path === '/settings'}
          onclick={onItemClick}
        >
          <LayoutDashboardIcon class="opacity-80" />
          <span class={onItemClick ? undefined : 'max-lg:sr-only'}>Overview</span>
        </SidebarMenuSubButton>
      </SidebarMenuSubItem>
    </SidebarMenuSub>
  </SidebarGroup>

  {#each userSettingsItems as section (section.url)}
    <SettingsNavSection {section} {onItemClick} />
  {/each}

  <SidebarGroup>
    <SidebarGroupLabel class="transition-colors hover:bg-sidebar-accent/50">
      {#snippet child({ props })}
        <a {...props} href={href('/teams')}>
          <UsersIcon class="opacity-80" />
          My teams
        </a>
      {/snippet}
    </SidebarGroupLabel>
    <SidebarMenuSub class="mx-0 gap-0.5 border-none px-0">
      {#each teamSettingsItems as team (team.url)}
        <SettingsTeamCollapsible {team} {onItemClick} />
      {/each}
      <SidebarMenuSubButton href={href('/settings/teams/new')} onclick={onItemClick}>
        <PlusIcon class="opacity-80" />
        <span>Add a team</span>
      </SidebarMenuSubButton>
    </SidebarMenuSub>
  </SidebarGroup>

  {#each orgSettingsItems as section (section.url)}
    <SettingsNavSection {section} {onItemClick} />
  {/each}

  {#each adminSettingsItems as section (section.url)}
    <SettingsNavSection {section} {onItemClick} />
  {/each}

  <SidebarGroup>
    <SidebarMenuSub class="mx-0 gap-0.5 border-none px-0 md:max-lg:flex">
      <SidebarMenuSubItem>
        <SidebarMenuSubButton
          aria-current={isOtherTeamsActive ? 'page' : undefined}
          class="md:max-lg:flex"
          href={href('/teams/other')}
          isActive={isOtherTeamsActive}
          onclick={onItemClick}
        >
          <UsersIcon class="opacity-80" />
          <span class={onItemClick ? undefined : 'max-lg:sr-only'}>Other teams</span>
        </SidebarMenuSubButton>
      </SidebarMenuSubItem>
    </SidebarMenuSub>
  </SidebarGroup>
</div>

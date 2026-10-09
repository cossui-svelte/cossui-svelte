<script lang="ts">
  import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
  import { Avatar, AvatarFallback, AvatarImage } from '#lib/components/ui/avatar/index.js';
  import {
    Collapsible,
    CollapsiblePanel,
    CollapsibleTrigger
  } from '#lib/components/ui/collapsible/index.js';
  import { router } from '../lib/router.svelte.js';
  import type { SettingsNavItem } from '../lib/settings-navigation-data.js';
  import { SidebarMenuSub, sidebarMenuSubButtonClass } from '../ui/index.js';
  import SettingsNavItemLink from './settings-nav-item.svelte';

  let { team, onItemClick }: { team: SettingsNavItem; onItemClick?: () => void } = $props();

  let open = $state(false);
  // Start open when the current page belongs to this team.
  $effect.pre(() => {
    if (team.children?.some((child) => router.path === child.url)) open = true;
  });
</script>

<Collapsible bind:open>
  <CollapsibleTrigger class={sidebarMenuSubButtonClass}>
    <ChevronRightIcon class="opacity-80 transition-transform in-data-panel-open:rotate-90" />
    {#if team.avatar}
      <Avatar class="size-4 shrink-0">
        <AvatarImage alt={team.title} src={team.avatar.src} />
        <AvatarFallback class="text-[.625rem]">{team.avatar.fallback}</AvatarFallback>
      </Avatar>
    {/if}
    <span class="flex-1 truncate">{team.title}</span>
  </CollapsibleTrigger>
  <CollapsiblePanel>
    <SidebarMenuSub class="mx-0 gap-0.5 border-none px-0">
      {#each team.children ?? [] as item (item.url)}
        <SettingsNavItemLink {item} {onItemClick} />
      {/each}
    </SidebarMenuSub>
  </CollapsiblePanel>
</Collapsible>

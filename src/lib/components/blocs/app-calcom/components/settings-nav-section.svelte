<script lang="ts">
  import { Avatar, AvatarFallback, AvatarImage } from '#lib/components/ui/avatar/index.js';
  import type { SettingsNavItem } from '../lib/settings-navigation-data.js';
  import { SidebarGroup, SidebarGroupLabel, SidebarMenuSub } from '../ui/index.js';
  import SettingsNavItemLink from './settings-nav-item.svelte';

  let { section, onItemClick }: { section: SettingsNavItem; onItemClick?: () => void } = $props();
</script>

<SidebarGroup>
  <SidebarGroupLabel>
    {#if section.avatar}
      <Avatar class="size-4.5 sm:size-4">
        <AvatarImage alt={section.title} src={section.avatar.src} />
        <AvatarFallback class="text-[.625rem]">{section.avatar.fallback}</AvatarFallback>
      </Avatar>
    {/if}
    {#if section.icon}
      <section.icon class="opacity-80" />
    {/if}
    <span>{section.title}</span>
  </SidebarGroupLabel>
  {#if section.children}
    <SidebarMenuSub class="mx-0 gap-0.5 border-none px-0 md:max-lg:flex">
      {#each section.children as item (item.url)}
        <SettingsNavItemLink {item} {onItemClick} />
      {/each}
    </SidebarMenuSub>
  {/if}
</SidebarGroup>

<script lang="ts">
  import ExternalLinkIcon from '@lucide/svelte/icons/external-link';
  import { Badge } from '#lib/components/ui/badge/index.js';
  import { href as toHref, router } from '../lib/router.svelte.js';
  import type { SettingsNavChild } from '../lib/settings-navigation-data.js';
  import { SidebarMenuSubButton, SidebarMenuSubItem } from '../ui/index.js';

  let { item, onItemClick }: { item: SettingsNavChild; onItemClick?: () => void } = $props();
</script>

<SidebarMenuSubItem>
  <SidebarMenuSubButton
    class="ps-8.5 sm:ps-8 md:max-lg:flex"
    href={toHref(item.url)}
    isActive={router.path === item.url}
    onclick={onItemClick}
  >
    <span class="flex min-w-0 flex-1 items-center gap-1">
      {item.title}
      {#if item.external}
        <ExternalLinkIcon class="size-3 opacity-80" />
      {/if}
      {#if item.badge}
        <Badge class="pointer-events-none ms-1" variant="info">{item.badge.label}</Badge>
      {/if}
    </span>
  </SidebarMenuSubButton>
</SidebarMenuSubItem>

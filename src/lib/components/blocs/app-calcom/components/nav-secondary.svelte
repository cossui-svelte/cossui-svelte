<script lang="ts">
  import type { ComponentProps } from 'svelte';
  import type { NavItem } from '../lib/navigation-data.js';
  import { href } from '../lib/router.svelte.js';
  import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/index.js';

  let {
    items,
    ...restProps
  }: { items: Pick<NavItem, 'title' | 'url' | 'icon'>[] } & ComponentProps<typeof SidebarGroup> =
    $props();
</script>

<SidebarGroup {...restProps}>
  <SidebarMenu class="gap-0.5">
    {#each items as item (item.title)}
      <SidebarMenuItem>
        <SidebarMenuButton href={href(item.url)} tooltip={item.title}>
          <item.icon />
          <span class="md:max-lg:sr-only lg:inline">{item.title}</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    {/each}
  </SidebarMenu>
</SidebarGroup>

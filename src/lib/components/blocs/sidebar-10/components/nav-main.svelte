<script lang="ts">
  import type { Component } from 'svelte';
  import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '$lib/components/ui/sidebar';

  let {
    items
  }: {
    items: {
      title: string;
      url: string;
      icon: Component;
      isActive?: boolean;
    }[];
  } = $props();
</script>

<SidebarMenu>
  {#each items as item (item.title)}
    <SidebarMenuItem>
      <SidebarMenuButton isActive={item.isActive}>
        {#snippet child({
    props
  })}
          <a href={item.url} {...props}>
            <item.icon />
            <span>{item.title}</span>
          </a>
        {/snippet}
      </SidebarMenuButton>
    </SidebarMenuItem>
  {/each}
</SidebarMenu>

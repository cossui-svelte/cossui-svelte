<script lang="ts">
  import type { Component, ComponentProps } from 'svelte';
  import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem
  } from '$lib/components/ui/sidebar';

  let {
    ref = $bindable(null),
    items,
    ...restProps
  }: ComponentProps<typeof SidebarGroup> & {
    items: {
      title: string;
      url: string;
      icon: Component;
      badge?: string;
    }[];
  } = $props();
</script>

<SidebarGroup bind:ref {...restProps}>
  <SidebarGroupContent>
    <SidebarMenu>
      {#each items as item (item.title)}
        <SidebarMenuItem>
          <SidebarMenuButton>
            {#snippet child({ props })}
              <a href={item.url} {...props}>
                <item.icon />
                <span>{item.title}</span>
              </a>
            {/snippet}
          </SidebarMenuButton>
          {#if item.badge}
            <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
          {/if}
        </SidebarMenuItem>
      {/each}
    </SidebarMenu>
  </SidebarGroupContent>
</SidebarGroup>

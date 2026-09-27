<script lang="ts">
  import type { Component, ComponentProps } from 'svelte';
  import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
  } from '$lib/components/ui/sidebar';

  let {
    ref = $bindable(null),
    items,
    ...restProps
  }: {
    items: {
      title: string;
      url: string;
      icon: Component;
    }[];
  } & ComponentProps<typeof SidebarGroup> = $props();
</script>

<SidebarGroup bind:ref {...restProps}>
  <SidebarGroupContent>
    <SidebarMenu>
      {#each items as item (item.title)}
        <SidebarMenuItem>
          <SidebarMenuButton size="sm">
            {#snippet child({ props })}
              <a href={item.url} {...props}>
                <item.icon />
                <span>{item.title}</span>
              </a>
            {/snippet}
          </SidebarMenuButton>
        </SidebarMenuItem>
      {/each}
    </SidebarMenu>
  </SidebarGroupContent>
</SidebarGroup>

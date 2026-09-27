<script lang="ts">
  import type { Component, ComponentProps } from 'svelte';
  import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
  } from '$lib/components/ui/sidebar';
  import type { WithoutChildren } from '$lib/utils';

  let {
    items,
    ...restProps
  }: { items: { title: string; url: string; icon: Component }[] } & WithoutChildren<
    ComponentProps<typeof SidebarGroup>
  > = $props();
</script>

<SidebarGroup {...restProps}>
  <SidebarGroupContent>
    <SidebarMenu>
      {#each items as item (item.title)}
        <SidebarMenuItem>
          <SidebarMenuButton>
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
  </SidebarGroupContent>
</SidebarGroup>

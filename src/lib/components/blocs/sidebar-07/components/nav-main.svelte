<script lang="ts">
  import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
  import type { Component } from 'svelte';
  import {
    Collapsible,
    CollapsiblePanel,
    CollapsibleTrigger
  } from '#lib/components/ui/collapsible/index.js';
  import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem
  } from '#lib/components/ui/sidebar/index.js';

  let {
    items
  }: {
    items: {
      title: string;
      url: string;
      icon?: Component;
      isActive?: boolean;
      items?: {
        title: string;
        url: string;
      }[];
    }[];
  } = $props();
</script>

<SidebarGroup>
  <SidebarGroupLabel>Platform</SidebarGroupLabel>
  <SidebarMenu>
    {#each items as item (item.title)}
      <Collapsible open={item.isActive} class="group/collapsible">
        <SidebarMenuItem>
          <SidebarMenuButton tooltipContent={item.title}>
            {#snippet child({ props })}
              <CollapsibleTrigger {...props}>
                {#if item.icon}
                  <item.icon />
                {/if}
                <span>{item.title}</span>
                <ChevronRightIcon
                  class="ms-auto transition-transform duration-200 group-data-open/collapsible:rotate-90"
                />
              </CollapsibleTrigger>
            {/snippet}
          </SidebarMenuButton>
          <CollapsiblePanel>
            <SidebarMenuSub>
              {#each item.items ?? [] as subItem (subItem.title)}
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton>
                    {#snippet child({ props })}
                      <a href={subItem.url} {...props}>
                        <span>{subItem.title}</span>
                      </a>
                    {/snippet}
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              {/each}
            </SidebarMenuSub>
          </CollapsiblePanel>
        </SidebarMenuItem>
      </Collapsible>
    {/each}
  </SidebarMenu>
</SidebarGroup>

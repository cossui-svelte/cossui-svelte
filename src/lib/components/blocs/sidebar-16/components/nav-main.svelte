<script lang="ts">
  import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
  import type { Component } from 'svelte';
  import {
    Collapsible,
    CollapsiblePanel,
    CollapsibleTrigger
  } from '$lib/components/ui/collapsible';
  import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem
  } from '$lib/components/ui/sidebar';

  let {
    items
  }: {
    items: {
      title: string;
      url: string;
      icon: Component;
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
      <Collapsible open={item.isActive}>
        <SidebarMenuItem>
          <SidebarMenuButton tooltipContent={item.title}>
            {#snippet child({
    props
  })}
              <a href={item.url} {...props}>
                <item.icon />
                <span>{item.title}</span>
              </a>
            {/snippet}
          </SidebarMenuButton>
          {#if item.items?.length}
            <SidebarMenuAction class="data-panel-open:rotate-90">
              {#snippet child({
    props
  })}
                <CollapsibleTrigger {...props}>
                  <ChevronRightIcon />
                  <span class="sr-only">Toggle</span>
                </CollapsibleTrigger>
              {/snippet}
            </SidebarMenuAction>
            <CollapsiblePanel>
              <SidebarMenuSub>
                {#each item.items as subItem (subItem.title)}
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton>
                      {#snippet child({
    props
  })}
                        <a href={subItem.url} {...props}>
                          <span>{subItem.title}</span>
                        </a>
                      {/snippet}
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                {/each}
              </SidebarMenuSub>
            </CollapsiblePanel>
          {/if}
        </SidebarMenuItem>
      </Collapsible>
    {/each}
  </SidebarMenu>
</SidebarGroup>

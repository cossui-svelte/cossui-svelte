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
    {#each items as mainItem (mainItem.title)}
      <Collapsible open={mainItem.isActive}>
        <SidebarMenuItem>
          <SidebarMenuButton tooltipContent={mainItem.title}>
            {#snippet child({ props })}
              <a href={mainItem.url} {...props}>
                <mainItem.icon />
                <span>{mainItem.title}</span>
              </a>
            {/snippet}
          </SidebarMenuButton>
          {#if mainItem.items?.length}
            <SidebarMenuAction class="data-panel-open:rotate-90">
              {#snippet child({ props })}
                <CollapsibleTrigger {...props}>
                  <ChevronRightIcon />
                  <span class="sr-only">Toggle</span>
                </CollapsibleTrigger>
              {/snippet}
            </SidebarMenuAction>
            <CollapsiblePanel>
              <SidebarMenuSub>
                {#each mainItem.items as subItem (subItem.title)}
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton href={subItem.url}>
                      <span>{subItem.title}</span>
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

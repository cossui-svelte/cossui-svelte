<script lang="ts">
  import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
  import {
    Collapsible,
    CollapsiblePanel,
    CollapsibleTrigger
  } from '#lib/components/ui/collapsible/index.js';
  import {
    Menu,
    MenuGroup,
    MenuGroupLabel,
    MenuLinkItem,
    MenuPopup,
    MenuTrigger
  } from '#lib/components/ui/menu/index.js';
  import { cn } from '#lib/utils.js';
  import type { NavItem } from '../lib/navigation-data.js';
  import { href, router } from '../lib/router.svelte.js';
  import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    sidebarMenuButtonClass
  } from '../ui/index.js';
  import WorkflowsBadge from './workflows-badge.svelte';

  let { items }: { items: NavItem[] } = $props();
</script>

<SidebarGroup>
  <SidebarMenu class="gap-0.5">
    {#each items as item (item.title)}
      {@const subItems = item.items ?? []}
      <SidebarMenuItem>
        {#if subItems.length > 0}
          {@const isActive = subItems.some((subItem) => router.path.startsWith(subItem.url))}
          <!-- Menu version for collapsed sidebar (md-lg breakpoint) -->
          <Menu>
            <div class="hidden md:max-lg:block">
              <SidebarMenuButton
                aria-label={item.title}
                isActive={isActive || item.isActive}
                tooltip={item.title}
              >
                {#snippet child({ props })}
                  <MenuTrigger {...props}>
                    <item.icon />
                  </MenuTrigger>
                {/snippet}
              </SidebarMenuButton>
            </div>
            <MenuPopup align="start" alignOffset={0} side="right">
              <MenuGroup>
                <MenuGroupLabel>{item.title}</MenuGroupLabel>
                {#each subItems as subItem (subItem.title)}
                  <MenuLinkItem href={href(subItem.url)}>
                    <span>{subItem.title}</span>
                  </MenuLinkItem>
                {/each}
              </MenuGroup>
            </MenuPopup>
          </Menu>

          <!-- Collapsible version for expanded sidebar -->
          <Collapsible open={isActive || !!item.isActive}>
            <CollapsibleTrigger class={cn(sidebarMenuButtonClass, 'justify-between max-lg:hidden')}>
              <span class="flex items-center gap-2">
                <item.icon class="size-4" />
                <span>{item.title}</span>
              </span>
              <ChevronRightIcon
                class="opacity-80 transition-transform in-data-panel-open:rotate-90"
              />
            </CollapsibleTrigger>
            <CollapsiblePanel class="max-lg:hidden">
              <SidebarMenuSub class="mx-0 gap-0.5 border-none px-0">
                {#each subItems as subItem (subItem.title)}
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton
                      class="ps-8"
                      href={href(subItem.url)}
                      isActive={router.path.startsWith(subItem.url)}
                    >
                      <span>{subItem.title}</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                {/each}
              </SidebarMenuSub>
            </CollapsiblePanel>
          </Collapsible>
        {:else}
          <SidebarMenuButton
            href={href(item.url)}
            isActive={router.path.startsWith(item.matchPath ?? item.url)}
            tooltip={item.title}
          >
            <item.icon />
            <span class="max-lg:sr-only">{item.title}</span>
            {#if item.title === 'Workflows'}
              <WorkflowsBadge />
            {/if}
          </SidebarMenuButton>
        {/if}
      </SidebarMenuItem>
    {/each}
  </SidebarMenu>
</SidebarGroup>

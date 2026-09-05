<script lang="ts">
  import { Badge } from '$lib/components/ui/badge';
  import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
  } from '$lib/components/ui/sidebar';
  import { type FolderNode, type NavTree, PAGES_NEW } from '$lib/docs';
  import { cn } from '$lib/utils';
  import { page } from '$app/state';

  interface Props {
    class?: string;
    tree: NavTree;
  }

  let { tree, class: className }: Props = $props();
</script>

<Sidebar
  class={cn(
    'sticky top-(--header-height) z-30 hidden h-[calc(100svh-var(--header-height))] bg-transparent lg:flex',
    className
  )}
  collapsible="none"
>
  <SidebarContent class="px-4 py-2">
    <div class="h-(--top-spacing) shrink-0"></div>
    {#each tree.children as group ((group as FolderNode).$id ?? String(group.name))}
      <SidebarGroup class="gap-1">
        <SidebarGroupLabel class="h-7 px-0 text-sidebar-accent-foreground">
          {group.name}
        </SidebarGroupLabel>
        <SidebarGroupContent>
          {#if group.type === 'folder'}
            <SidebarMenu class="gap-0.5">
              {#each group.children as item (item.type === 'page' ? item.url : String(item.name))}
                {#if item.type === 'page'}
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      class="ps-3.5 hover:bg-transparent active:bg-transparent"
                      isActive={item.url === page.url.pathname}
                    >
                      {#snippet child({ props })}
                        <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- item.url is caller-supplied nav data, already app-relative -->
                        <a href={item.url} {...props}>
                          {item.name}
                          {#if PAGES_NEW.length > 0 && PAGES_NEW.includes(item.url)}
                            <Badge variant="info">New</Badge>
                          {/if}
                        </a>
                      {/snippet}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                {/if}
              {/each}
            </SidebarMenu>
          {/if}
        </SidebarGroupContent>
      </SidebarGroup>
    {/each}
  </SidebarContent>
</Sidebar>

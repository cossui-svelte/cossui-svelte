<script lang="ts">
  import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
  import EllipsisIcon from '@lucide/svelte/icons/ellipsis';
  import PlusIcon from '@lucide/svelte/icons/plus';
  import {
    Collapsible,
    CollapsiblePanel,
    CollapsibleTrigger
  } from '$lib/components/ui/collapsible';
  import {
    SidebarGroup,
    SidebarGroupContent,
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
    workspaces
  }: {
    workspaces: {
      name: string;
      emoji: string;
      pages: {
        name: string;
        emoji: string;
      }[];
    }[];
  } = $props();
</script>

<SidebarGroup>
  <SidebarGroupLabel>Workspaces</SidebarGroupLabel>
  <SidebarGroupContent>
    <SidebarMenu>
      {#each workspaces as workspace (workspace.name)}
        <Collapsible>
          <SidebarMenuItem>
            <SidebarMenuButton>
              {#snippet child({
    props
  })}
                <a href="##" {...props}>
                  <span>{workspace.emoji}</span>
                  <span>{workspace.name}</span>
                </a>
              {/snippet}
            </SidebarMenuButton>
            <SidebarMenuAction
              class="start-2 bg-sidebar-accent text-sidebar-accent-foreground data-panel-open:rotate-90"
              showOnHover
            >
              {#snippet child({
    props
  })}
                <CollapsibleTrigger {...props}>
                  <ChevronRightIcon />
                </CollapsibleTrigger>
              {/snippet}
            </SidebarMenuAction>
            <SidebarMenuAction showOnHover>
              <PlusIcon />
            </SidebarMenuAction>
            <CollapsiblePanel>
              <SidebarMenuSub>
                {#each workspace.pages as page (page.name)}
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton>
                      {#snippet child({
    props
  })}
                        <a href="##" {...props}>
                          <span>{page.emoji}</span>
                          <span>{page.name}</span>
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
      <SidebarMenuItem>
        <SidebarMenuButton class="text-sidebar-foreground/70">
          <EllipsisIcon />
          <span>More</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarGroupContent>
</SidebarGroup>

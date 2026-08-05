<script lang="ts">
  import ChartPieIcon from '@lucide/svelte/icons/chart-pie';
  import EllipsisIcon from '@lucide/svelte/icons/ellipsis';
  import FrameIcon from '@lucide/svelte/icons/frame';
  import LifeBuoyIcon from '@lucide/svelte/icons/life-buoy';
  import MapIcon from '@lucide/svelte/icons/map';
  import SendIcon from '@lucide/svelte/icons/send';
  import { Menu, MenuItem, MenuPopup, MenuTrigger } from '$lib/components/ui/menu';
  import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarInset,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger
  } from '$lib/components/ui/sidebar';

  const projects = [
    { name: 'Design Engineering', url: '#', icon: FrameIcon },
    { name: 'Sales & Marketing', url: '#', icon: ChartPieIcon },
    { name: 'Travel', url: '#', icon: MapIcon },
    { name: 'Support', url: '#', icon: LifeBuoyIcon },
    { name: 'Feedback', url: '#', icon: SendIcon }
  ];
</script>

<!-- transform-gpu makes this box the containing block for the sidebar's `fixed`
     panel, so the demo stays inside the preview card instead of the viewport. -->
<div class="relative h-100 w-full transform-gpu overflow-hidden rounded-xl border">
  <SidebarProvider class="h-full min-h-full">
    <Sidebar class="h-full">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {#each projects as project (project.name)}
                <SidebarMenuItem>
                  <SidebarMenuButton
                    class="group-has-[[data-state=open]]/menu-item:bg-sidebar-accent"
                  >
                    {#snippet child({ props })}
                      <a href={project.url} {...props}>
                        <project.icon />
                        <span>{project.name}</span>
                      </a>
                    {/snippet}
                  </SidebarMenuButton>
                  <Menu>
                    <MenuTrigger>
                      {#snippet child({ props })}
                        <SidebarMenuAction {...props}>
                          <EllipsisIcon />
                          <span class="sr-only">More</span>
                        </SidebarMenuAction>
                      {/snippet}
                    </MenuTrigger>
                    <MenuPopup align="start" side="right">
                      <MenuItem>
                        <span>Edit Project</span>
                      </MenuItem>
                      <MenuItem>
                        <span>Delete Project</span>
                      </MenuItem>
                    </MenuPopup>
                  </Menu>
                </SidebarMenuItem>
              {/each}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
    <SidebarInset class="h-full">
      <header class="flex h-12 shrink-0 items-center gap-2 border-b px-3">
        <SidebarTrigger />
        <span class="font-medium text-sm">Projects</span>
      </header>
      <div class="p-4 text-muted-foreground text-sm">Content area</div>
    </SidebarInset>
  </SidebarProvider>
</div>

<script lang="ts">
  import ChartPieIcon from '@lucide/svelte/icons/chart-pie';
  import FrameIcon from '@lucide/svelte/icons/frame';
  import MapIcon from '@lucide/svelte/icons/map';
  import PlusIcon from '@lucide/svelte/icons/plus';
  import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupAction,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger
  } from '$lib/components/ui/sidebar';
  import { toastManager } from '$lib/components/ui/toast';

  const projects = [
    { name: 'Design Engineering', url: '#', icon: FrameIcon },
    { name: 'Sales & Marketing', url: '#', icon: ChartPieIcon },
    { name: 'Travel', url: '#', icon: MapIcon }
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
          <SidebarGroupAction
            title="Add Project"
            onclick={() => toastManager.add({ title: 'You clicked the group action!' })}
          >
            <PlusIcon />
            <span class="sr-only">Add Project</span>
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu>
              {#each projects as project (project.name)}
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    {#snippet child({ props })}
                      <a href={project.url} {...props}>
                        <project.icon />
                        <span>{project.name}</span>
                      </a>
                    {/snippet}
                  </SidebarMenuButton>
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

<script lang="ts">
  import ChartPieIcon from '@lucide/svelte/icons/chart-pie';
  import FrameIcon from '@lucide/svelte/icons/frame';
  import LifeBuoyIcon from '@lucide/svelte/icons/life-buoy';
  import MapIcon from '@lucide/svelte/icons/map';
  import SendIcon from '@lucide/svelte/icons/send';
  import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarInset,
    SidebarMenu,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger
  } from '$lib/components/ui/sidebar';

  const projects = [
    { name: 'Design Engineering', url: '#', icon: FrameIcon, badge: '24' },
    { name: 'Sales & Marketing', url: '#', icon: ChartPieIcon, badge: '12' },
    { name: 'Travel', url: '#', icon: MapIcon, badge: '3' },
    { name: 'Support', url: '#', icon: LifeBuoyIcon, badge: '21' },
    { name: 'Feedback', url: '#', icon: SendIcon, badge: '8' }
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
                  <SidebarMenuButton>
                    {#snippet child({ props })}
                      <a href={project.url} {...props}>
                        <project.icon />
                        <span>{project.name}</span>
                      </a>
                    {/snippet}
                  </SidebarMenuButton>
                  <SidebarMenuBadge>{project.badge}</SidebarMenuBadge>
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

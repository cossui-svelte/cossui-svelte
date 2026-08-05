<script lang="ts">
  import ChartPieIcon from '@lucide/svelte/icons/chart-pie';
  import FrameIcon from '@lucide/svelte/icons/frame';
  import LifeBuoyIcon from '@lucide/svelte/icons/life-buoy';
  import MapIcon from '@lucide/svelte/icons/map';
  import PanelLeftCloseIcon from '@lucide/svelte/icons/panel-left-close';
  import PanelLeftOpenIcon from '@lucide/svelte/icons/panel-left-open';
  import SendIcon from '@lucide/svelte/icons/send';
  import { Button } from '$lib/components/ui/button';
  import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider
  } from '$lib/components/ui/sidebar';

  const projects = [
    { name: 'Design Engineering', url: '#', icon: FrameIcon },
    { name: 'Sales & Marketing', url: '#', icon: ChartPieIcon },
    { name: 'Travel', url: '#', icon: MapIcon },
    { name: 'Support', url: '#', icon: LifeBuoyIcon },
    { name: 'Feedback', url: '#', icon: SendIcon }
  ];

  let open = $state(true);
</script>

<!-- transform-gpu makes this box the containing block for the sidebar's `fixed`
     panel, so the demo stays inside the preview card instead of the viewport. -->
<div class="relative h-100 w-full transform-gpu overflow-hidden rounded-xl border">
  <SidebarProvider bind:open class="h-full min-h-full">
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
                </SidebarMenuItem>
              {/each}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
    <SidebarInset class="h-full">
      <header class="flex h-12 shrink-0 items-center gap-2 border-b px-3">
        <Button onclick={() => (open = !open)} size="sm" variant="ghost">
          {#if open}
            <PanelLeftCloseIcon />
          {:else}
            <PanelLeftOpenIcon />
          {/if}
          <span>{open ? 'Close' : 'Open'} Sidebar</span>
        </Button>
      </header>
      <div class="p-4 text-muted-foreground text-sm">
        Sidebar is {open ? 'open' : 'closed'}
      </div>
    </SidebarInset>
  </SidebarProvider>
</div>

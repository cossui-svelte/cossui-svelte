<script lang="ts">
  import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarProvider,
    SidebarTrigger
  } from '$lib/components/ui/sidebar';

  const items = [
    {
      title: 'Getting Started',
      url: '#',
      items: [
        { title: 'Installation', url: '#' },
        { title: 'Project Structure', url: '#' }
      ]
    },
    {
      title: 'Build Your Application',
      url: '#',
      items: [
        { title: 'Routing', url: '#' },
        { title: 'Data Fetching', url: '#' },
        { title: 'Rendering', url: '#' },
        { title: 'Caching', url: '#' },
        { title: 'Styling', url: '#' },
        { title: 'Optimizing', url: '#' },
        { title: 'Configuring', url: '#' },
        { title: 'Testing', url: '#' },
        { title: 'Authentication', url: '#' },
        { title: 'Deploying', url: '#' }
      ]
    },
    {
      title: 'API Reference',
      url: '#',
      items: [
        { title: 'Components', url: '#' },
        { title: 'File Conventions', url: '#' },
        { title: 'Functions', url: '#' },
        { title: 'Configuration Options', url: '#' },
        { title: 'CLI', url: '#' }
      ]
    },
    {
      title: 'Architecture',
      url: '#',
      items: [
        { title: 'Accessibility', url: '#' },
        { title: 'Fast Refresh', url: '#' },
        { title: 'Compiler', url: '#' },
        { title: 'Supported Browsers', url: '#' }
      ]
    }
  ];
</script>

<!-- transform-gpu makes this box the containing block for the sidebar's `fixed`
     panel, so the demo stays inside the preview card instead of the viewport. -->
<div class="relative h-140 w-full transform-gpu overflow-hidden rounded-xl border">
  <SidebarProvider class="h-full min-h-full">
    <Sidebar class="h-full">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {#each items as item (item.title)}
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    {#snippet child({ props })}
                      <a href={item.url} {...props}>
                        <span>{item.title}</span>
                      </a>
                    {/snippet}
                  </SidebarMenuButton>
                  <SidebarMenuSub>
                    {#each item.items as subItem (subItem.title)}
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
        <span class="font-medium text-sm">Documentation</span>
      </header>
      <div class="p-4 text-muted-foreground text-sm">Content area</div>
    </SidebarInset>
  </SidebarProvider>
</div>

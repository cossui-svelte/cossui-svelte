<script lang="ts">
  import CheckIcon from '@lucide/svelte/icons/check';
  import ChevronsUpDownIcon from '@lucide/svelte/icons/chevrons-up-down';
  import SearchIcon from '@lucide/svelte/icons/search';
  import { Label } from '$lib/components/ui/label';
  import { Menu, MenuItem, MenuPopup, MenuTrigger } from '$lib/components/ui/menu';
  import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInput,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarRail,
    SidebarTrigger
  } from '$lib/components/ui/sidebar';

  const data = {
    versions: ['1.0.1', '1.1.0-alpha', '2.0.0-beta1'],
    navMain: [
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
          { title: 'Data Fetching', url: '#', isActive: true },
          { title: 'Rendering', url: '#' },
          { title: 'Caching', url: '#' },
          { title: 'Styling', url: '#' },
          { title: 'Optimizing', url: '#' },
          { title: 'Configuring', url: '#' },
          { title: 'Testing', url: '#' },
          { title: 'Authentication', url: '#' },
          { title: 'Deploying', url: '#' },
          { title: 'Upgrading', url: '#' },
          { title: 'Examples', url: '#' }
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
          { title: 'CLI', url: '#' },
          { title: 'Edge Runtime', url: '#' }
        ]
      },
      {
        title: 'Architecture',
        url: '#',
        items: [
          { title: 'Accessibility', url: '#' },
          { title: 'Fast Refresh', url: '#' },
          { title: 'Compiler', url: '#' },
          { title: 'Supported Browsers', url: '#' },
          { title: 'Turbopack', url: '#' }
        ]
      }
    ]
  };

  let selectedVersion = $state(data.versions[0]);
</script>

<!-- transform-gpu makes this box the containing block for the sidebar's `fixed`
     panel, so the demo stays inside the preview card instead of the viewport. -->
<div class="relative h-140 w-full transform-gpu overflow-hidden rounded-xl border">
  <SidebarProvider class="h-full min-h-full">
    <Sidebar class="h-full">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Menu>
              <SidebarMenuButton size="lg">
                {#snippet child({ props })}
                  <MenuTrigger
                    {...props}
                    class="data-popup-open:bg-sidebar-accent data-popup-open:text-sidebar-accent-foreground"
                  >
                    <div class="flex flex-col gap-0.5 leading-none">
                      <span class="font-medium">Documentation</span>
                      <span class="text-muted-foreground text-xs">v{selectedVersion}</span>
                    </div>
                    <ChevronsUpDownIcon class="ms-auto" />
                  </MenuTrigger>
                {/snippet}
              </SidebarMenuButton>
              <MenuPopup align="start" class="w-(--anchor-width)">
                {#each data.versions as version (version)}
                  <MenuItem onclick={() => (selectedVersion = version)}>
                    v{version}
                    {#if version === selectedVersion}
                      <CheckIcon class="ms-auto" />
                    {/if}
                  </MenuItem>
                {/each}
              </MenuPopup>
            </Menu>
          </SidebarMenuItem>
        </SidebarMenu>
        <form>
          <SidebarGroup class="py-0">
            <SidebarGroupContent class="relative">
              <Label for="search" class="sr-only">Search</Label>
              <SidebarInput id="search" placeholder="Search the docs..." class="ps-8" />
              <SearchIcon
                class="pointer-events-none absolute top-1/2 start-2 size-4 -translate-y-1/2 opacity-50 select-none"
              />
            </SidebarGroupContent>
          </SidebarGroup>
        </form>
      </SidebarHeader>
      <SidebarContent>
        {#each data.navMain as item (item.title)}
          <SidebarGroup>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {#each item.items as subItem (subItem.title)}
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive={subItem.isActive}>
                      {#snippet child({ props })}
                        <a href={subItem.url} {...props}>{subItem.title}</a>
                      {/snippet}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                {/each}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        {/each}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
    <SidebarInset class="h-full">
      <header class="flex h-12 shrink-0 items-center gap-2 border-b px-3">
        <SidebarTrigger class="-ms-1" />
        <span class="font-medium text-sm">Documentation</span>
      </header>
      <div class="flex flex-1 flex-col gap-4 p-4">
        <div class="grid auto-rows-min gap-4 md:grid-cols-3">
          <div class="aspect-video rounded-xl bg-muted/50"></div>
          <div class="aspect-video rounded-xl bg-muted/50"></div>
          <div class="aspect-video rounded-xl bg-muted/50"></div>
        </div>
        <div class="flex-1 rounded-xl bg-muted/50"></div>
      </div>
    </SidebarInset>
  </SidebarProvider>
</div>

<script lang="ts" module>
  // sample data
  const data = {
    navMain: [
      {
        title: 'Getting Started',
        url: '#',
        items: [
          {
            title: 'Installation',
            url: '#'
          },
          {
            title: 'Project Structure',
            url: '#'
          }
        ]
      },
      {
        title: 'Build Your Application',
        url: '#',
        items: [
          {
            title: 'Routing',
            url: '#'
          },
          {
            title: 'Data Fetching',
            url: '#',
            isActive: true
          },
          {
            title: 'Rendering',
            url: '#'
          },
          {
            title: 'Caching',
            url: '#'
          },
          {
            title: 'Styling',
            url: '#'
          },
          {
            title: 'Optimizing',
            url: '#'
          },
          {
            title: 'Configuring',
            url: '#'
          },
          {
            title: 'Testing',
            url: '#'
          },
          {
            title: 'Authentication',
            url: '#'
          },
          {
            title: 'Deploying',
            url: '#'
          },
          {
            title: 'Upgrading',
            url: '#'
          },
          {
            title: 'Examples',
            url: '#'
          }
        ]
      },
      {
        title: 'API Reference',
        url: '#',
        items: [
          {
            title: 'Components',
            url: '#'
          },
          {
            title: 'File Conventions',
            url: '#'
          },
          {
            title: 'Functions',
            url: '#'
          },
          {
            title: 'next.config.js Options',
            url: '#'
          },
          {
            title: 'CLI',
            url: '#'
          },
          {
            title: 'Edge Runtime',
            url: '#'
          }
        ]
      },
      {
        title: 'Architecture',
        url: '#',
        items: [
          {
            title: 'Accessibility',
            url: '#'
          },
          {
            title: 'Fast Refresh',
            url: '#'
          },
          {
            title: 'Next.js Compiler',
            url: '#'
          },
          {
            title: 'Supported Browsers',
            url: '#'
          },
          {
            title: 'Turbopack',
            url: '#'
          }
        ]
      },
      {
        title: 'Community',
        url: '#',
        items: [
          {
            title: 'Contribution Guide',
            url: '#'
          }
        ]
      }
    ]
  };
</script>

<script lang="ts">
  import GalleryVerticalEndIcon from '@lucide/svelte/icons/gallery-vertical-end';
  import type { ComponentProps } from 'svelte';
  import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem
  } from '$lib/components/ui/sidebar';

  let { ref = $bindable(null), ...restProps }: ComponentProps<typeof Sidebar> = $props();
</script>

<Sidebar bind:ref variant="floating" {...restProps}>
  <SidebarHeader>
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg">
          {#snippet child({ props })}
            <a href="##" {...props}>
              <div
                class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
              >
                <GalleryVerticalEndIcon class="size-4" />
              </div>
              <div class="flex flex-col gap-0.5 leading-none">
                <span class="font-medium">Documentation</span>
                <span class="">v1.0.0</span>
              </div>
            </a>
          {/snippet}
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarHeader>
  <SidebarContent>
    <SidebarGroup>
      <SidebarMenu class="gap-2">
        {#each data.navMain as item (item.title)}
          <SidebarMenuItem>
            <SidebarMenuButton>
              {#snippet child({ props })}
                <a href={item.url} class="font-medium" {...props}>
                  {item.title}
                </a>
              {/snippet}
            </SidebarMenuButton>
            {#if item.items?.length}
              <SidebarMenuSub class="ms-0 border-s-0 px-1.5">
                {#each item.items as subItem (subItem.title)}
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton isActive={subItem.isActive}>
                      {#snippet child({ props })}
                        <a href={subItem.url} {...props}>{subItem.title}</a>
                      {/snippet}
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                {/each}
              </SidebarMenuSub>
            {/if}
          </SidebarMenuItem>
        {/each}
      </SidebarMenu>
    </SidebarGroup>
  </SidebarContent>
</Sidebar>

<script lang="ts">
  import type { ComponentProps } from 'svelte';
  import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail
  } from '#lib/components/ui/sidebar/index.js';

  // This is sample data.
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

  let { ref = $bindable(null), ...restProps }: ComponentProps<typeof Sidebar> = $props();
</script>

<Sidebar bind:ref {...restProps}>
  <SidebarContent>
    <SidebarGroup>
      <SidebarGroupLabel>Table of Contents</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {#each data.navMain as item (item.title)}
            <SidebarMenuItem>
              <SidebarMenuButton class="font-medium">
                {#snippet child({ props })}
                  <a href={item.url} {...props}>
                    {item.title}
                  </a>
                {/snippet}
              </SidebarMenuButton>
              {#if item.items?.length}
                <SidebarMenuSub>
                  {#each item.items as subItem (subItem.title)}
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton href={subItem.url} isActive={subItem.isActive}>
                        {subItem.title}
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  {/each}
                </SidebarMenuSub>
              {/if}
            </SidebarMenuItem>
          {/each}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  </SidebarContent>
  <SidebarRail />
</Sidebar>

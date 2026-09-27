<script lang="ts" module>
  // sample data

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
</script>

<script lang="ts">
  import GalleryVerticalEndIcon from '@lucide/svelte/icons/gallery-vertical-end';
  import MinusIcon from '@lucide/svelte/icons/minus';
  import PlusIcon from '@lucide/svelte/icons/plus';
  import type { ComponentProps } from 'svelte';
  import {
    Collapsible,
    CollapsiblePanel,
    CollapsibleTrigger
  } from '$lib/components/ui/collapsible';
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
    SidebarMenuSubItem,
    SidebarRail
  } from '$lib/components/ui/sidebar';
  import SearchForm from './search-form.svelte';

  let { ref = $bindable(null), ...restProps }: ComponentProps<typeof Sidebar> = $props();
</script>

<Sidebar bind:ref {...restProps}>
  <SidebarHeader>
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg">
          {#snippet child({
    props
  })}
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
    <SearchForm />
  </SidebarHeader>
  <SidebarContent>
    <SidebarGroup>
      <SidebarMenu>
        {#each data.navMain as item, index (item.title)}
          <Collapsible open={index === 1} class="group/collapsible">
            <SidebarMenuItem>
              <SidebarMenuButton>
                {#snippet child({
    props
  })}
                  <CollapsibleTrigger {...props}>
                    {item.title}
                    <PlusIcon class="ms-auto group-data-open/collapsible:hidden" />
                    <MinusIcon class="ms-auto group-data-closed/collapsible:hidden" />
                  </CollapsibleTrigger>
                {/snippet}
              </SidebarMenuButton>
              {#if item.items?.length}
                <CollapsiblePanel>
                  <SidebarMenuSub>
                    {#each item.items as subItem (subItem.title)}
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton isActive={subItem.isActive}>
                          {#snippet child({
    props
  })}
                            <a href={subItem.url} {...props}>{subItem.title}</a>
                          {/snippet}
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    {/each}
                  </SidebarMenuSub>
                </CollapsiblePanel>
              {/if}
            </SidebarMenuItem>
          </Collapsible>
        {/each}
      </SidebarMenu>
    </SidebarGroup>
  </SidebarContent>
  <SidebarRail />
</Sidebar>

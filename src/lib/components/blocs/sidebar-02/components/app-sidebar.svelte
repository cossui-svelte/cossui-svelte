<script lang="ts" module>
  // sample data
  const data = {
    versions: ['1.0.1', '1.1.0-alpha', '2.0.0-beta1'],
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
  import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
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
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail
  } from '$lib/components/ui/sidebar';
  import SearchForm from './search-form.svelte';
  import VersionSwitcher from './version-switcher.svelte';

  let { ref = $bindable(null), ...restProps }: ComponentProps<typeof Sidebar> = $props();
</script>

<Sidebar bind:ref {...restProps}>
  <SidebarHeader>
    <VersionSwitcher versions={data.versions} defaultVersion={data.versions[0]} />
    <SearchForm />
  </SidebarHeader>
  <SidebarContent class="gap-0">
    <!-- We create a collapsible SidebarGroup for each parent. -->
    {#each data.navMain as item (item.title)}
      <Collapsible title={item.title} open class="group/collapsible">
        <SidebarGroup>
          <SidebarGroupLabel
            class="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            {#snippet child({ props })}
              <CollapsibleTrigger {...props}>
                {item.title}
                <ChevronRightIcon
                  class="ms-auto transition-transform group-data-open/collapsible:rotate-90"
                />
              </CollapsibleTrigger>
            {/snippet}
          </SidebarGroupLabel>
          <CollapsiblePanel>
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
          </CollapsiblePanel>
        </SidebarGroup>
      </Collapsible>
    {/each}
  </SidebarContent>
  <SidebarRail />
</Sidebar>

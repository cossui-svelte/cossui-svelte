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
            title: 'Svelte Compiler',
            url: '#'
          },
          {
            title: 'Supported Browsers',
            url: '#'
          },
          {
            title: 'Rollup',
            url: '#'
          }
        ]
      }
    ]
  };
</script>

<script lang="ts">
  import type { ComponentProps } from 'svelte';
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

<Sidebar {...restProps} bind:ref>
  <SidebarHeader>
    <VersionSwitcher versions={data.versions} defaultVersion={data.versions[0]} />
    <SearchForm />
  </SidebarHeader>
  <SidebarContent>
    <!-- We create a SidebarGroup for each parent. -->
    {#each data.navMain as group (group.title)}
      <SidebarGroup>
        <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {#each group.items as item (item.title)}
              <SidebarMenuItem>
                <SidebarMenuButton isActive={item.isActive}>
                  {#snippet child({ props })}
                    <a href={item.url} {...props}>{item.title}</a>
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

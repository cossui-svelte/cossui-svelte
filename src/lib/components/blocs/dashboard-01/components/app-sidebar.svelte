<script lang="ts">
  import InnerShadowTopIcon from '@lucide/svelte/icons/aperture';
  import CameraIcon from '@lucide/svelte/icons/camera';
  import ChartBarIcon from '@lucide/svelte/icons/chart-bar';
  import HelpIcon from '@lucide/svelte/icons/circle-question-mark';
  import DatabaseIcon from '@lucide/svelte/icons/database';
  import FileAiIcon from '@lucide/svelte/icons/file-code';
  import FileDescriptionIcon from '@lucide/svelte/icons/file-text';
  import FileWordIcon from '@lucide/svelte/icons/file-type';
  import FolderIcon from '@lucide/svelte/icons/folder';
  import DashboardIcon from '@lucide/svelte/icons/layout-dashboard';
  import ListDetailsIcon from '@lucide/svelte/icons/list';
  import ReportIcon from '@lucide/svelte/icons/scroll-text';
  import SearchIcon from '@lucide/svelte/icons/search';
  import SettingsIcon from '@lucide/svelte/icons/settings';
  import UsersIcon from '@lucide/svelte/icons/users';
  import type { ComponentProps } from 'svelte';
  import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
  } from '#lib/components/ui/sidebar/index.js';
  import NavDocuments from './nav-documents.svelte';
  import NavMain from './nav-main.svelte';
  import NavSecondary from './nav-secondary.svelte';
  import NavUser from './nav-user.svelte';

  const data = {
    user: {
      name: 'shadcn',
      email: 'm@example.com',
      avatar: '/avatars/user.jpg'
    },
    navMain: [
      {
        title: 'Dashboard',
        url: '#',
        icon: DashboardIcon
      },
      {
        title: 'Lifecycle',
        url: '#',
        icon: ListDetailsIcon
      },
      {
        title: 'Analytics',
        url: '#',
        icon: ChartBarIcon
      },
      {
        title: 'Projects',
        url: '#',
        icon: FolderIcon
      },
      {
        title: 'Team',
        url: '#',
        icon: UsersIcon
      }
    ],
    navClouds: [
      {
        title: 'Capture',
        icon: CameraIcon,
        isActive: true,
        url: '#',
        items: [
          {
            title: 'Active Proposals',
            url: '#'
          },
          {
            title: 'Archived',
            url: '#'
          }
        ]
      },
      {
        title: 'Proposal',
        icon: FileDescriptionIcon,
        url: '#',
        items: [
          {
            title: 'Active Proposals',
            url: '#'
          },
          {
            title: 'Archived',
            url: '#'
          }
        ]
      },
      {
        title: 'Prompts',
        icon: FileAiIcon,
        url: '#',
        items: [
          {
            title: 'Active Proposals',
            url: '#'
          },
          {
            title: 'Archived',
            url: '#'
          }
        ]
      }
    ],
    navSecondary: [
      {
        title: 'Settings',
        url: '#',
        icon: SettingsIcon
      },
      {
        title: 'Get Help',
        url: '#',
        icon: HelpIcon
      },
      {
        title: 'Search',
        url: '#',
        icon: SearchIcon
      }
    ],
    documents: [
      {
        name: 'Data Library',
        url: '#',
        icon: DatabaseIcon
      },
      {
        name: 'Reports',
        url: '#',
        icon: ReportIcon
      },
      {
        name: 'Word Assistant',
        url: '#',
        icon: FileWordIcon
      }
    ]
  };

  let { ...restProps }: ComponentProps<typeof Sidebar> = $props();
</script>

<Sidebar collapsible="offcanvas" {...restProps}>
  <SidebarHeader>
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton class="data-[slot=sidebar-menu-button]:!p-1.5">
          {#snippet child({ props })}
            <a href="##" {...props}>
              <InnerShadowTopIcon class="!size-5" />
              <span class="text-base font-semibold">Acme Inc.</span>
            </a>
          {/snippet}
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarHeader>
  <SidebarContent>
    <NavMain items={data.navMain} />
    <NavDocuments items={data.documents} />
    <NavSecondary items={data.navSecondary} class="mt-auto" />
  </SidebarContent>
  <SidebarFooter>
    <NavUser user={data.user} />
  </SidebarFooter>
</Sidebar>

<script lang="ts" module>
  import AudioWaveformIcon from '@lucide/svelte/icons/audio-waveform';
  import BookOpenIcon from '@lucide/svelte/icons/book-open';
  import BotIcon from '@lucide/svelte/icons/bot';
  import ChartPieIcon from '@lucide/svelte/icons/chart-pie';
  import CommandIcon from '@lucide/svelte/icons/command';
  import FrameIcon from '@lucide/svelte/icons/frame';
  import GalleryVerticalEndIcon from '@lucide/svelte/icons/gallery-vertical-end';
  import MapIcon from '@lucide/svelte/icons/map';
  import Settings2Icon from '@lucide/svelte/icons/settings-2';
  import SquareTerminalIcon from '@lucide/svelte/icons/square-terminal';

  // This is sample data.
  const data = {
    user: {
      name: 'shadcn',
      email: 'm@example.com',
      avatar: '/avatars/user.jpg'
    },
    teams: [
      {
        name: 'Acme Inc',
        logo: GalleryVerticalEndIcon,
        plan: 'Enterprise'
      },
      {
        name: 'Acme Corp.',
        logo: AudioWaveformIcon,
        plan: 'Startup'
      },
      {
        name: 'Evil Corp.',
        logo: CommandIcon,
        plan: 'Free'
      }
    ],
    navMain: [
      {
        title: 'Playground',
        url: '#',
        icon: SquareTerminalIcon,
        isActive: true,
        items: [
          {
            title: 'History',
            url: '#'
          },
          {
            title: 'Starred',
            url: '#'
          },
          {
            title: 'Settings',
            url: '#'
          }
        ]
      },
      {
        title: 'Models',
        url: '#',
        icon: BotIcon,
        items: [
          {
            title: 'Genesis',
            url: '#'
          },
          {
            title: 'Explorer',
            url: '#'
          },
          {
            title: 'Quantum',
            url: '#'
          }
        ]
      },
      {
        title: 'Documentation',
        url: '#',
        icon: BookOpenIcon,
        items: [
          {
            title: 'Introduction',
            url: '#'
          },
          {
            title: 'Get Started',
            url: '#'
          },
          {
            title: 'Tutorials',
            url: '#'
          },
          {
            title: 'Changelog',
            url: '#'
          }
        ]
      },
      {
        title: 'Settings',
        url: '#',
        icon: Settings2Icon,
        items: [
          {
            title: 'General',
            url: '#'
          },
          {
            title: 'Team',
            url: '#'
          },
          {
            title: 'Billing',
            url: '#'
          },
          {
            title: 'Limits',
            url: '#'
          }
        ]
      }
    ],
    projects: [
      {
        name: 'Design Engineering',
        url: '#',
        icon: FrameIcon
      },
      {
        name: 'Sales & Marketing',
        url: '#',
        icon: ChartPieIcon
      },
      {
        name: 'Travel',
        url: '#',
        icon: MapIcon
      }
    ]
  };
</script>

<script lang="ts">
  import type { ComponentProps } from 'svelte';
  import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail
  } from '#lib/components/ui/sidebar/index.js';
  import NavMain from './nav-main.svelte';
  import NavProjects from './nav-projects.svelte';
  import NavUser from './nav-user.svelte';
  import TeamSwitcher from './team-switcher.svelte';

  let {
    ref = $bindable(null),
    collapsible = 'icon',
    ...restProps
  }: ComponentProps<typeof Sidebar> = $props();
</script>

<Sidebar bind:ref {collapsible} {...restProps}>
  <SidebarHeader>
    <TeamSwitcher teams={data.teams} />
  </SidebarHeader>
  <SidebarContent>
    <NavMain items={data.navMain} />
    <NavProjects projects={data.projects} />
  </SidebarContent>
  <SidebarFooter>
    <NavUser user={data.user} />
  </SidebarFooter>
  <SidebarRail />
</Sidebar>

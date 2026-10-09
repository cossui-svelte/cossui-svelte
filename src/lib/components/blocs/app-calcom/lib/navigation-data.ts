import type { Component } from 'svelte';
type IconComponent = Component<{ class?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>;
import ActivityIcon from '@lucide/svelte/icons/activity';
import CalendarIcon from '@lucide/svelte/icons/calendar';
import ClockFadingIcon from '@lucide/svelte/icons/clock-fading';
import ContactRoundIcon from '@lucide/svelte/icons/contact-round';
import CopyIcon from '@lucide/svelte/icons/copy';
import ExternalLinkIcon from '@lucide/svelte/icons/external-link';
import GiftIcon from '@lucide/svelte/icons/gift';
import Grid2x2Plus from '@lucide/svelte/icons/grid-2x2-plus';
import Link2Icon from '@lucide/svelte/icons/link-2';
import RouteIcon from '@lucide/svelte/icons/route';
import SettingsIcon from '@lucide/svelte/icons/settings';
import UsersRoundIcon from '@lucide/svelte/icons/users-round';
import WorkflowIcon from '@lucide/svelte/icons/workflow';

export interface NavItem {
  title: string;
  url: string;
  icon: IconComponent;
  isActive?: boolean;
  badge?: string;
  matchPath?: string;
  items?: {
    title: string;
    url: string;
  }[];
}

export interface User {
  avatar: string;
  email: string;
  name: string;
}

export const navMainItems: NavItem[] = [
  {
    icon: Link2Icon,
    title: 'Event Types',
    url: '/event-types'
  },
  {
    icon: CalendarIcon,
    matchPath: '/booking',
    title: 'Bookings',
    url: '/booking/upcoming'
  },
  {
    icon: ClockFadingIcon,
    title: 'Availability',
    url: '/availability'
  },
  {
    icon: ContactRoundIcon,
    title: 'Members',
    url: '/members'
  },
  {
    icon: UsersRoundIcon,
    title: 'Teams',
    url: '/teams'
  },
  {
    icon: Grid2x2Plus,
    items: [
      {
        title: 'App Store',
        url: '/apps/store'
      },
      {
        title: 'Installed Apps',
        url: '/apps/installed'
      }
    ],
    title: 'Apps',
    url: '/apps'
  },
  {
    icon: RouteIcon,
    title: 'Routing',
    url: '/routing'
  },
  {
    icon: WorkflowIcon,
    title: 'Workflows',
    url: '/workflows'
  },
  {
    icon: ActivityIcon,
    title: 'Insights',
    url: '/insights'
  }
];

export const navFooterItems: NavItem[] = [
  {
    icon: ExternalLinkIcon,
    title: 'View public page',
    url: '/public'
  },
  {
    icon: CopyIcon,
    title: 'Copy public page link',
    url: '#'
  },
  {
    icon: GiftIcon,
    title: 'Refer and earn',
    url: '/refer'
  },
  {
    icon: SettingsIcon,
    title: 'Settings',
    url: '/settings'
  }
];

export const user: User = {
  avatar: '',
  email: 'pasqua@example.com',
  name: 'Pasquale'
};

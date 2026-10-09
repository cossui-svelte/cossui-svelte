import type { Component } from 'svelte';
type IconComponent = Component<{ class?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>;
import CreditCardIcon from '@lucide/svelte/icons/credit-card';
import KeyIcon from '@lucide/svelte/icons/key';
import LockIcon from '@lucide/svelte/icons/lock';
import TerminalIcon from '@lucide/svelte/icons/terminal';

export interface SettingsNavChild {
  title: string;
  url: string;
  external?: boolean;
  badge?: {
    label: string;
  };
}

export interface SettingsNavItem {
  title: string;
  url: string;
  icon?: IconComponent;
  avatar?: {
    src: string;
    fallback: string;
  };
  children?: SettingsNavChild[];
}

export const userSettingsItems: SettingsNavItem[] = [
  {
    avatar: {
      fallback: 'LT',
      src: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80'
    },
    children: [
      { title: 'Profile', url: '/settings/my-account/profile' },
      { title: 'General', url: '/settings/my-account/general' },
      { title: 'Calendars', url: '/settings/my-account/calendars' },
      { title: 'Conferencing', url: '/settings/my-account/conferencing' },
      { title: 'Appearance', url: '/settings/my-account/appearance' },
      { title: 'Out of office', url: '/settings/my-account/out-of-office' },
      {
        title: 'Push notifications',
        url: '/settings/my-account/push-notifications'
      },
      { title: 'Features', url: '/settings/my-account/features' }
    ],
    title: 'Luke Tracy',
    url: '/settings/my-account'
  },
  {
    children: [
      { title: 'Password', url: '/settings/security/password' },
      { title: 'Impersonation', url: '/settings/security/impersonation' },
      {
        title: 'Two factor authentication',
        url: '/settings/security/two-factor-auth'
      },
      { title: 'Compliance', url: '/settings/security/compliance' }
    ],
    icon: KeyIcon,
    title: 'Security',
    url: '/settings/security'
  },
  {
    children: [{ title: 'Manage billing', url: '/settings/billing' }],
    icon: CreditCardIcon,
    title: 'Billing',
    url: '/settings/billing'
  },
  {
    children: [
      { title: 'Webhooks', url: '/settings/developer/webhooks' },
      { title: 'OAuth', url: '/settings/developer/oauth' },
      { title: 'API keys', url: '/settings/developer/api-keys' }
    ],
    icon: TerminalIcon,
    title: 'Developer',
    url: '/settings/developer'
  }
];

export const adminSettingsItems: SettingsNavItem[] = [
  {
    children: [
      { title: 'Flags', url: '/settings/admin/flags' },
      { title: 'License', url: '/settings/admin/license' },
      { title: 'Billing', url: '/settings/admin/billing' },
      { title: 'Impersonation', url: '/settings/admin/impersonation' },
      { title: 'Apps', url: '/settings/admin/apps' },
      { title: 'Users', url: '/settings/admin/users' },
      { title: 'Organizations', url: '/settings/admin/organizations' },
      { title: 'Locked SMS', url: '/settings/admin/locked-sms' },
      { title: 'Blocklist', url: '/settings/admin/blocklist' },
      { title: 'OAuth', url: '/settings/admin/oauth' },
      {
        title: 'Workspace Platforms',
        url: '/settings/admin/workspace-platforms'
      },
      { title: 'Playground', url: '/settings/admin/playground' }
    ],
    icon: LockIcon,
    title: 'Admin',
    url: '/settings/admin'
  }
];

const teamNavChildren: SettingsNavChild[] = [
  { title: 'Profile', url: '/settings/teams/47/profile' },
  { title: 'Members', url: '/settings/teams/47/members' },
  {
    badge: { label: 'New' },
    title: 'Roles',
    url: '/settings/teams/47/roles'
  },
  { title: 'Appearance', url: '/settings/teams/47/appearance' },
  { title: 'Features', url: '/settings/teams/47/features' },
  { title: 'Billing', url: '/settings/teams/47/billing' },
  { title: 'Settings', url: '/settings/teams/47/settings' }
];

export const teamSettingsItems: SettingsNavItem[] = [
  {
    children: teamNavChildren,
    title: 'Acme Inc.',
    url: '/settings/teams/47'
  }
];

export const orgSettingsItems: SettingsNavItem[] = [
  {
    avatar: {
      fallback: 'CC',
      src: 'https://pbs.twimg.com/profile_images/1994776674391457792/7utKOMi6_400x400.jpg'
    },
    children: [
      { title: 'Profile', url: '/settings/organizations/profile' },
      { title: 'General', url: '/settings/organizations/general' },
      {
        title: 'Guest notifications',
        url: '/settings/organizations/guest-notifications'
      },
      {
        external: true,
        title: 'Members',
        url: '/settings/organizations/members'
      },
      { title: 'Attributes', url: '/settings/organizations/attributes' },
      {
        title: 'Privacy & security',
        url: '/settings/organizations/privacy-security'
      },
      { title: 'SSO', url: '/settings/organizations/sso' },
      { title: 'Directory sync', url: '/settings/organizations/dsync' },
      {
        external: true,
        title: 'API Docs',
        url: 'https://cal.com/docs/api-reference/v2'
      },
      { title: 'Features', url: '/settings/organizations/features' },
      {
        title: 'Delegation credential',
        url: '/settings/organizations/delegation-credential'
      },
      {
        title: 'Roles & permissions',
        url: '/settings/organizations/roles-permissions'
      },
      { title: 'Billing', url: '/settings/organizations/billing' },
      { title: 'Plans', url: '/settings/organizations/plans' }
    ],
    title: 'Cal.com',
    url: '/settings/organizations'
  }
];

export const settingsNavItems: SettingsNavItem[] = [
  ...userSettingsItems,
  ...orgSettingsItems,
  ...adminSettingsItems
];

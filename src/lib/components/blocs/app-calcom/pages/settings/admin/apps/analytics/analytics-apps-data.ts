import CalendarIcon from '@lucide/svelte/icons/calendar';
import CameraIcon from '@lucide/svelte/icons/camera';
import ChartColumnIcon from '@lucide/svelte/icons/chart-column';
import CreditCardIcon from '@lucide/svelte/icons/credit-card';
import HashIcon from '@lucide/svelte/icons/hash';
import Link2Icon from '@lucide/svelte/icons/link-2';
import MessageSquareIcon from '@lucide/svelte/icons/message-square';
import type { Component } from 'svelte';

export interface AnalyticsApp {
  id: string;
  name: string;
  description: string;
  icon: Component<{ class?: string }>;
  enabled: boolean;
  configured?: boolean;
  configurable?: boolean;
  slug: string;
}

export const ANALYTICS_APPS: AnalyticsApp[] = [
  {
    configurable: false,
    description:
      'Privacy-first web analytics for devs (Google Analytics alternative) — 3 KB, GDPR-compliant',
    enabled: false,
    icon: ChartColumnIcon,
    id: 'databuddy',
    name: 'Databuddy',
    slug: 'databuddy'
  },
  {
    configurable: true,
    configured: true,
    description:
      'Dub is the modern link attribution platform for you to create short links, track conversion analytics, and run affiliate programs.',
    enabled: true,
    icon: Link2Icon,
    id: 'dub',
    name: 'Dub',
    slug: 'dub'
  },
  {
    configurable: false,
    description:
      "Fathom Analytics provides simple, privacy-focused website analytics. We're a GDPR-compliant, Google Analytics alternative.",
    enabled: false,
    icon: ChartColumnIcon,
    id: 'fathom',
    name: 'Fathom',
    slug: 'fathom'
  },
  {
    configurable: true,
    description:
      'Google Analytics is a web analytics service offered by Google that tracks and reports website traffic, currently as a platform inside the Google Marketing Platform brand.',
    enabled: false,
    icon: ChartColumnIcon,
    id: 'google-analytics',
    name: 'Google Analytics',
    slug: 'google-analytics'
  },
  {
    configurable: false,
    description: 'App to install Google Tag Manager',
    enabled: false,
    icon: ChartColumnIcon,
    id: 'google-tag-manager',
    name: 'Google Tag Manager',
    slug: 'google-tag-manager'
  },
  {
    configurable: false,
    description:
      'Insihts is an all-in-one platform for businesses looking to track user behavior, optimize workflows, and make data-driven decisions. Whether you are a marketer, product manager, or part of a customer success team, Insihts provides the tools you need to succeed.',
    enabled: false,
    icon: ChartColumnIcon,
    id: 'insihts',
    name: 'Insihts',
    slug: 'insihts'
  },
  {
    configurable: false,
    description: "Google Analytics alternative that protects your data and your customers' privacy",
    enabled: false,
    icon: ChartColumnIcon,
    id: 'matomo',
    name: 'Matomo',
    slug: 'matomo'
  },
  {
    configurable: true,
    description:
      'Add Meta Pixel to your bookings page to measure, optimize and build audiences for your ad campaigns.',
    enabled: false,
    icon: ChartColumnIcon,
    id: 'meta-pixel',
    name: 'Meta Pixel',
    slug: 'meta-pixel'
  },
  {
    configurable: false,
    description: 'Simple, privacy-friendly Google Analytics',
    enabled: false,
    icon: ChartColumnIcon,
    id: 'plausible',
    name: 'Plausible',
    slug: 'plausible'
  }
];

export const APP_CATEGORIES = [
  {
    href: '/settings/admin/apps/analytics',
    icon: ChartColumnIcon,
    id: 'analytics',
    label: 'Analytics'
  },
  {
    href: '/settings/admin/apps/analytics',
    icon: Link2Icon,
    id: 'ai-automation',
    label: 'AI & Automation'
  },
  {
    href: '/settings/admin/apps/analytics',
    icon: CalendarIcon,
    id: 'calendar',
    label: 'Calendar'
  },
  {
    href: '/settings/admin/apps/analytics',
    icon: CameraIcon,
    id: 'conferencing',
    label: 'Conferencing'
  },
  {
    href: '/settings/admin/apps/analytics',
    icon: ChartColumnIcon,
    id: 'crm',
    label: 'CRM'
  },
  {
    href: '/settings/admin/apps/analytics',
    icon: MessageSquareIcon,
    id: 'messaging',
    label: 'Messaging'
  },
  {
    href: '/settings/admin/apps/analytics',
    icon: CreditCardIcon,
    id: 'payment',
    label: 'Payment'
  },
  {
    href: '/settings/admin/apps/analytics',
    icon: HashIcon,
    id: 'other',
    label: 'Other'
  }
] as const;

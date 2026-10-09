import type { Component } from 'svelte';

export type RouteLayout = 'dashboard' | 'settings';

export interface Route {
  /** `:name` segments are captured and passed to the page as `params`. */
  pattern: string;
  layout: RouteLayout;
  redirect?: string;
  load?: () => Promise<{ default: Component<{ params: Record<string, string> }> }>;
}

// Mirrors the Next.js `app/` tree of the original calcom example. Pages live in `./pages/<route>/page.svelte`.
export const routes: Route[] = [
  { pattern: '/', layout: 'dashboard', redirect: '/event-types' },
  { pattern: '/booking', layout: 'dashboard', redirect: '/booking/upcoming' },
  { pattern: '/settings', layout: 'settings', redirect: '/settings/my-account/general' },
  { pattern: '/settings/my-account', layout: 'settings', redirect: '/settings/my-account/general' },
  { pattern: '/settings/developer', layout: 'settings', redirect: '/settings/developer/webhooks' },
  {
    pattern: '/event-types',
    layout: 'dashboard',
    load: () => import('./pages/event-types/page.svelte')
  },
  { pattern: '/members', layout: 'dashboard', load: () => import('./pages/members/page.svelte') },
  {
    pattern: '/booking/upcoming',
    layout: 'dashboard',
    load: () => import('./pages/booking/upcoming/page.svelte')
  },
  {
    pattern: '/booking/upcoming/empty',
    layout: 'dashboard',
    load: () => import('./pages/booking/upcoming/empty/page.svelte')
  },
  {
    pattern: '/booking/past',
    layout: 'dashboard',
    load: () => import('./pages/booking/past/page.svelte')
  },
  {
    pattern: '/booking/canceled',
    layout: 'dashboard',
    load: () => import('./pages/booking/canceled/page.svelte')
  },
  {
    pattern: '/booking/recurring',
    layout: 'dashboard',
    load: () => import('./pages/booking/recurring/page.svelte')
  },
  {
    pattern: '/booking/unconfirmed',
    layout: 'dashboard',
    load: () => import('./pages/booking/unconfirmed/page.svelte')
  },
  {
    pattern: '/settings/my-account/profile',
    layout: 'settings',
    load: () => import('./pages/settings/my-account/profile/page.svelte')
  },
  {
    pattern: '/settings/my-account/general',
    layout: 'settings',
    load: () => import('./pages/settings/my-account/general/page.svelte')
  },
  {
    pattern: '/settings/my-account/calendars',
    layout: 'settings',
    load: () => import('./pages/settings/my-account/calendars/page.svelte')
  },
  {
    pattern: '/settings/my-account/calendars/empty',
    layout: 'settings',
    load: () => import('./pages/settings/my-account/calendars/empty/page.svelte')
  },
  {
    pattern: '/settings/my-account/conferencing',
    layout: 'settings',
    load: () => import('./pages/settings/my-account/conferencing/page.svelte')
  },
  {
    pattern: '/settings/my-account/appearance',
    layout: 'settings',
    load: () => import('./pages/settings/my-account/appearance/page.svelte')
  },
  {
    pattern: '/settings/my-account/push-notifications',
    layout: 'settings',
    load: () => import('./pages/settings/my-account/push-notifications/page.svelte')
  },
  {
    pattern: '/settings/my-account/features',
    layout: 'settings',
    load: () => import('./pages/settings/my-account/features/page.svelte')
  },
  {
    pattern: '/settings/security/password',
    layout: 'settings',
    load: () => import('./pages/settings/security/password/page.svelte')
  },
  {
    pattern: '/settings/security/impersonation',
    layout: 'settings',
    load: () => import('./pages/settings/security/impersonation/page.svelte')
  },
  {
    pattern: '/settings/security/two-factor-auth',
    layout: 'settings',
    load: () => import('./pages/settings/security/two-factor-auth/page.svelte')
  },
  {
    pattern: '/settings/security/compliance',
    layout: 'settings',
    load: () => import('./pages/settings/security/compliance/page.svelte')
  },
  {
    pattern: '/settings/billing',
    layout: 'settings',
    load: () => import('./pages/settings/billing/page.svelte')
  },
  {
    pattern: '/settings/developer/webhooks',
    layout: 'settings',
    load: () => import('./pages/settings/developer/webhooks/page.svelte')
  },
  {
    pattern: '/settings/developer/webhooks/new',
    layout: 'settings',
    load: () => import('./pages/settings/developer/webhooks/new/page.svelte')
  },
  {
    pattern: '/settings/developer/webhooks/demo',
    layout: 'settings',
    load: () => import('./pages/settings/developer/webhooks/demo/page.svelte')
  },
  {
    pattern: '/settings/developer/oauth',
    layout: 'settings',
    load: () => import('./pages/settings/developer/oauth/page.svelte')
  },
  {
    pattern: '/settings/developer/api-keys',
    layout: 'settings',
    load: () => import('./pages/settings/developer/api-keys/page.svelte')
  },
  {
    pattern: '/settings/organizations/attributes',
    layout: 'settings',
    load: () => import('./pages/settings/organizations/attributes/page.svelte')
  },
  {
    pattern: '/settings/organizations/attributes/new',
    layout: 'settings',
    load: () => import('./pages/settings/organizations/attributes/new/page.svelte')
  },
  {
    pattern: '/settings/organizations/attributes/demo',
    layout: 'settings',
    load: () => import('./pages/settings/organizations/attributes/demo/page.svelte')
  },
  {
    pattern: '/settings/organizations/attributes/:id/edit',
    layout: 'settings',
    load: () => import('./pages/settings/organizations/attributes/[id]/edit/page.svelte')
  },
  {
    pattern: '/settings/organizations/delegation-credential',
    layout: 'settings',
    load: () => import('./pages/settings/organizations/delegation-credential/page.svelte')
  },
  {
    pattern: '/settings/organizations/dsync',
    layout: 'settings',
    load: () => import('./pages/settings/organizations/dsync/page.svelte')
  },
  {
    pattern: '/settings/teams/:id/appearance',
    layout: 'settings',
    load: () => import('./pages/settings/teams/[id]/appearance/page.svelte')
  },
  {
    pattern: '/settings/teams/:id/billing',
    layout: 'settings',
    load: () => import('./pages/settings/teams/[id]/billing/page.svelte')
  },
  {
    pattern: '/settings/teams/:id/features',
    layout: 'settings',
    load: () => import('./pages/settings/teams/[id]/features/page.svelte')
  },
  {
    pattern: '/settings/teams/:id/members',
    layout: 'settings',
    load: () => import('./pages/settings/teams/[id]/members/page.svelte')
  },
  {
    pattern: '/settings/teams/:id/profile',
    layout: 'settings',
    load: () => import('./pages/settings/teams/[id]/profile/page.svelte')
  },
  {
    pattern: '/settings/teams/:id/profile/no-permissions',
    layout: 'settings',
    load: () => import('./pages/settings/teams/[id]/profile/no-permissions/page.svelte')
  },
  {
    pattern: '/settings/teams/:id/roles',
    layout: 'settings',
    load: () => import('./pages/settings/teams/[id]/roles/page.svelte')
  },
  {
    pattern: '/settings/teams/:id/settings',
    layout: 'settings',
    load: () => import('./pages/settings/teams/[id]/settings/page.svelte')
  },
  {
    pattern: '/settings/admin/apps',
    layout: 'settings',
    load: () => import('./pages/settings/admin/apps/page.svelte')
  },
  {
    pattern: '/settings/admin/apps/analytics',
    layout: 'settings',
    load: () => import('./pages/settings/admin/apps/analytics/page.svelte')
  },
  {
    pattern: '/settings/admin/billing',
    layout: 'settings',
    load: () => import('./pages/settings/admin/billing/page.svelte')
  },
  {
    pattern: '/settings/admin/flags',
    layout: 'settings',
    load: () => import('./pages/settings/admin/flags/page.svelte')
  },
  {
    pattern: '/settings/admin/impersonation',
    layout: 'settings',
    load: () => import('./pages/settings/admin/impersonation/page.svelte')
  },
  {
    pattern: '/settings/admin/oauth',
    layout: 'settings',
    load: () => import('./pages/settings/admin/oauth/page.svelte')
  }
];

export interface RouteMatch {
  route: Route | null;
  layout: RouteLayout;
  params: Record<string, string>;
}

export function matchRoute(path: string): RouteMatch {
  const segments = path.split('/').filter(Boolean);
  for (const route of routes) {
    const patternSegments = route.pattern.split('/').filter(Boolean);
    if (patternSegments.length !== segments.length) continue;
    const params: Record<string, string> = {};
    const matches = patternSegments.every((segment, index) => {
      if (segment.startsWith(':')) {
        params[segment.slice(1)] = decodeURIComponent(segments[index]);
        return true;
      }
      return segment === segments[index];
    });
    if (matches) return { route, layout: route.layout, params };
  }
  // Unknown routes (the original app 404s on them too) keep the layout of their section.
  return {
    route: null,
    layout: path.startsWith('/settings') ? 'settings' : 'dashboard',
    params: {}
  };
}

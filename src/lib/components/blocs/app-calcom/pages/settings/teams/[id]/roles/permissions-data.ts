export const DEFAULT_ROLES = [
  { dotClass: 'bg-emerald-500', title: 'Owner' },
  { dotClass: 'bg-violet-500', title: 'Admin' },
  { dotClass: 'bg-amber-400', title: 'Member' }
] as const;

export type Grant = { description: string; id: string; label: string };

export const PERMISSION_ROWS = [
  { id: 'roles', label: 'Roles' },
  { id: 'event-types', label: 'Event types' },
  { id: 'teams', label: 'Teams' },
  { id: 'bookings', label: 'Bookings' },
  { id: 'insights', label: 'Insights' },
  { id: 'workflows', label: 'Workflows' },
  { id: 'routing-forms', label: 'Routing forms' },
  { id: 'webhook', label: 'Webhook' },
  { id: 'feature-opt-in', label: 'Feature Opt-In' }
] as const;

export type RowId = (typeof PERMISSION_ROWS)[number]['id'];

export const PERMISSION_DETAILS: Record<RowId, { grants: Grant[]; viewGrantId: string }> = {
  bookings: {
    grants: [
      { description: 'View bookings', id: 'bookings:view', label: 'View' },
      {
        description: 'View all team bookings',
        id: 'bookings:view-team',
        label: 'View team bookings'
      },
      {
        description: 'View meeting recordings',
        id: 'bookings:recordings',
        label: 'View recordings'
      },
      { description: 'Edit bookings', id: 'bookings:edit', label: 'Edit' },
      {
        description: 'View audit history',
        id: 'bookings:audit',
        label: 'View team audit logs'
      }
    ],
    viewGrantId: 'bookings:view'
  },
  'event-types': {
    grants: [
      { description: 'Create event types', id: 'event-types:create', label: 'Create' },
      { description: 'View event types', id: 'event-types:view', label: 'View' },
      { description: 'Edit event types', id: 'event-types:edit', label: 'Edit' },
      { description: 'Delete event types', id: 'event-types:delete', label: 'Delete' }
    ],
    viewGrantId: 'event-types:view'
  },
  'feature-opt-in': {
    grants: [
      { description: 'View feature flags', id: 'feature-opt-in:view', label: 'View' },
      { description: 'Change opt-in settings', id: 'feature-opt-in:edit', label: 'Edit' }
    ],
    viewGrantId: 'feature-opt-in:view'
  },
  insights: {
    grants: [
      { description: 'View reports', id: 'insights:view', label: 'View' },
      { description: 'Export data', id: 'insights:export', label: 'Export' }
    ],
    viewGrantId: 'insights:view'
  },
  roles: {
    grants: [
      { description: 'Create roles', id: 'roles:create', label: 'Create' },
      { description: 'View roles', id: 'roles:view', label: 'View' },
      { description: 'Edit roles', id: 'roles:edit', label: 'Edit' },
      { description: 'Delete roles', id: 'roles:delete', label: 'Delete' }
    ],
    viewGrantId: 'roles:view'
  },
  'routing-forms': {
    grants: [
      { description: 'View routing forms', id: 'routing-forms:view', label: 'View' },
      { description: 'Edit routing forms', id: 'routing-forms:edit', label: 'Edit' }
    ],
    viewGrantId: 'routing-forms:view'
  },
  teams: {
    grants: [
      { description: 'View team details', id: 'teams:view', label: 'View' },
      { description: 'Update team settings', id: 'teams:edit', label: 'Edit' },
      { description: 'Delete team', id: 'teams:delete', label: 'Delete' },
      { description: 'Invite members', id: 'teams:invite', label: 'Invite' },
      { description: 'Remove members', id: 'teams:remove', label: 'Remove' },
      { description: 'List team members', id: 'teams:list-members', label: 'List members' },
      {
        description: 'Change member roles',
        id: 'teams:change-role',
        label: 'Change member role'
      },
      { description: 'Impersonate members', id: 'teams:impersonate', label: 'Impersonate' }
    ],
    viewGrantId: 'teams:view'
  },
  webhook: {
    grants: [
      { description: 'View webhooks', id: 'webhook:view', label: 'View' },
      { description: 'Manage webhooks', id: 'webhook:manage', label: 'Manage' }
    ],
    viewGrantId: 'webhook:view'
  },
  workflows: {
    grants: [
      { description: 'View workflows', id: 'workflows:view', label: 'View' },
      { description: 'Edit workflows', id: 'workflows:edit', label: 'Edit' }
    ],
    viewGrantId: 'workflows:view'
  }
};

export type PermissionLevel = 'all' | 'custom' | 'none' | 'read';

export function grantsForMode(
  rowId: RowId,
  mode: PermissionLevel,
  customSnapshot: string[] | undefined
): string[] {
  const { grants, viewGrantId } = PERMISSION_DETAILS[rowId];
  const allIds = grants.map((g) => g.id);
  if (mode === 'none') return [];
  if (mode === 'read') return [viewGrantId];
  if (mode === 'all') return [...allIds];
  return customSnapshot ?? [];
}

export function defaultPermissionLevels(): Record<RowId, PermissionLevel> {
  return Object.fromEntries(PERMISSION_ROWS.map((row) => [row.id, 'read' as const])) as Record<
    RowId,
    PermissionLevel
  >;
}

export function defaultGrantSelection(): Record<RowId, string[]> {
  return Object.fromEntries(
    PERMISSION_ROWS.map((row) => [row.id, grantsForMode(row.id, 'read', undefined)])
  ) as Record<RowId, string[]>;
}

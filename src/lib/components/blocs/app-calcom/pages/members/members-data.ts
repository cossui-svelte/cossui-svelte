export type MemberRole = 'Developer' | 'Admin' | 'Owner' | 'Support' | 'Member';

export type RoleFilter = 'all' | MemberRole;

export type ColumnKey =
  | 'role'
  | 'teams'
  | 'seniority'
  | 'preferredLanguage'
  | 'products'
  | 'userCount'
  | 'region'
  | 'lastActive';

export type ColumnToggleItem = { label: string; value: ColumnKey };

export const COLUMN_TOGGLE_ITEMS: ColumnToggleItem[] = [
  { label: 'Role', value: 'role' },
  { label: 'Teams', value: 'teams' },
  { label: 'Seniority', value: 'seniority' },
  { label: 'Preferred Language', value: 'preferredLanguage' },
  { label: 'Products', value: 'products' },
  { label: 'User Count', value: 'userCount' },
  { label: 'Region', value: 'region' },
  { label: 'Last active', value: 'lastActive' }
];

export const ROLE_FILTER_ITEMS: { label: string; value: RoleFilter }[] = [
  { label: 'All members', value: 'all' },
  { label: 'Developers', value: 'Developer' },
  { label: 'Admins', value: 'Admin' },
  { label: 'Owners', value: 'Owner' },
  { label: 'Support', value: 'Support' },
  { label: 'Members', value: 'Member' }
];

export const DEFAULT_COLUMN_VISIBILITY: Record<ColumnKey, boolean> = {
  lastActive: true,
  preferredLanguage: true,
  products: true,
  region: true,
  role: true,
  seniority: true,
  teams: true,
  userCount: true
};

export type Member = {
  id: string;
  name: string;
  email: string;
  role: MemberRole;
  teams: string[];
  seniority?: string;
  preferredLanguage?: string;
  products: string[];
  userCount?: string[];
  region?: string;
  lastActive: string;
  avatarUrl?: string;
};

export const members: Member[] = [
  {
    avatarUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop&q=80',
    email: 'hariom@cal.com',
    id: 'hariom',
    lastActive: '5/7/2026',
    name: 'Hariom',
    preferredLanguage: 'German',
    products: ['Organizations'],
    region: 'California',
    role: 'Developer',
    seniority: 'Senior',
    teams: ['Team', 'Engineering', 'Design', 'Product']
  },
  {
    avatarUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop&q=80',
    email: 'sarah@cal.com',
    id: 'sarah-chen',
    lastActive: '5/12/2026',
    name: 'Sarah Chen',
    products: ['Organizations', 'Enterprise', 'Teams', 'Routing'],
    role: 'Admin',
    seniority: 'Senior',
    teams: ['Engineering', 'Leadership'],
    userCount: ['51-100', '101-250', '251-500']
  },
  {
    avatarUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop&q=80',
    email: 'marcus@cal.com',
    id: 'marcus-johnson',
    lastActive: '5/15/2026',
    name: 'Marcus Johnson',
    preferredLanguage: 'English',
    products: ['Enterprise'],
    role: 'Owner',
    teams: ['Leadership', 'Sales', 'Marketing', 'Support']
  },
  {
    email: 'emma@cal.com',
    id: 'emma-wilson',
    lastActive: '5/3/2026',
    name: 'Emma Wilson',
    products: ['Organizations', 'Teams'],
    role: 'Support',
    teams: ['Support', 'Customer Success']
  },
  {
    avatarUrl:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=128&h=128&fit=crop&q=80',
    email: 'lisa@cal.com',
    id: 'lisa-park',
    lastActive: '5/18/2026',
    name: 'Lisa Park',
    preferredLanguage: 'French',
    products: ['Routing', 'Workflows', 'Insights'],
    region: 'California',
    role: 'Developer',
    seniority: 'Senior',
    teams: ['Engineering'],
    userCount: ['101-250']
  },
  {
    avatarUrl:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=128&h=128&fit=crop&q=80',
    email: 'james@cal.com',
    id: 'james-rivera',
    lastActive: '5/10/2026',
    name: 'James Rivera',
    products: ['Organizations'],
    role: 'Member',
    teams: ['Marketing', 'Growth', 'Content']
  },
  {
    avatarUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=128&h=128&fit=crop&q=80',
    email: 'nina@cal.com',
    id: 'nina-kowalski',
    lastActive: '5/6/2026',
    name: 'Nina Kowalski',
    preferredLanguage: 'German',
    products: ['Enterprise', 'Organizations'],
    role: 'Admin',
    teams: ['Product', 'Design', 'Engineering', 'QA', 'DevOps']
  },
  {
    email: 'david@cal.com',
    id: 'david-okonkwo',
    lastActive: '5/14/2026',
    name: 'David Okonkwo',
    products: ['Teams'],
    role: 'Developer',
    seniority: 'Senior',
    teams: ['Engineering', 'Platform'],
    userCount: ['51-100', '101-250']
  },
  {
    avatarUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=128&h=128&fit=crop&q=80',
    email: 'olivia@cal.com',
    id: 'olivia-martinez',
    lastActive: '5/2/2026',
    name: 'Olivia Martinez',
    preferredLanguage: 'English',
    products: [],
    region: 'California',
    role: 'Support',
    teams: ['Support']
  },
  {
    avatarUrl:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&h=128&fit=crop&q=80',
    email: 'alex@cal.com',
    id: 'alex-thompson',
    lastActive: '5/16/2026',
    name: 'Alex Thompson',
    products: ['Organizations', 'Enterprise', 'Insights'],
    role: 'Owner',
    teams: ['Leadership']
  },
  {
    email: 'priya@cal.com',
    id: 'priya-sharma',
    lastActive: '5/9/2026',
    name: 'Priya Sharma',
    preferredLanguage: 'French',
    products: ['Workflows'],
    role: 'Member',
    teams: ['Customer Success', 'Onboarding', 'Training']
  },
  {
    avatarUrl:
      'https://images.unsplash.com/photo-1504593811423-6dd665756598?w=128&h=128&fit=crop&q=80',
    email: 'ryan@cal.com',
    id: 'ryan-foster',
    lastActive: '5/11/2026',
    name: 'Ryan Foster',
    products: ['Routing', 'Apps'],
    role: 'Developer',
    seniority: 'Senior',
    teams: ['Engineering', 'Infrastructure'],
    userCount: ['251-500', '501-1000', '1000+']
  }
];

export const PRIVILEGED_ROLES: MemberRole[] = ['Developer', 'Admin', 'Owner'];

export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0]?.charAt(0).toUpperCase() ?? '';
  return `${parts[0]?.charAt(0) ?? ''}${parts.at(-1)?.charAt(0) ?? ''}`.toUpperCase();
}

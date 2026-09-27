// Hand-maintained metadata for the blocs under `src/lib/components/blocs/<name>/`.
// Each bloc's entry point is `<name>/page.svelte`, rendered full-page at `/blocs/view/<name>`.
// Ported from shadcn-svelte blocks (https://shadcn-svelte.com/blocks).

export type BlocCategory = 'sidebar' | 'dashboard' | 'login' | 'signup' | 'otp' | 'calendar';

export interface BlocMeta {
  category: BlocCategory;
  /** Classes for the wrapper the bloc is rendered in on its view page. */
  containerClass?: string;
  description: string;
  /** Height of the preview iframe. Defaults to `DEFAULT_IFRAME_HEIGHT`. */
  iframeHeight?: string;
}

export const DEFAULT_IFRAME_HEIGHT = '930px';

export const blocCategories: { slug: BlocCategory; name: string }[] = [
  { slug: 'sidebar', name: 'Sidebar' },
  { slug: 'dashboard', name: 'Dashboard' },
  { slug: 'login', name: 'Login' },
  { slug: 'signup', name: 'Signup' },
  { slug: 'otp', name: 'OTP' },
  { slug: 'calendar', name: 'Calendar' }
];

export const FEATURED_BLOCS = ['dashboard-01', 'sidebar-07', 'sidebar-03', 'login-03', 'login-04'];

const CALENDAR_CONTAINER =
  'flex min-h-svh w-full min-w-0 items-start justify-center bg-background px-6 py-12 md:pt-20 xl:py-24';
const CALENDAR_CONTAINER_TOP =
  'flex min-h-svh w-full min-w-0 items-start justify-center bg-background px-6 py-12';

const calendar = (description: string, extra: Partial<BlocMeta> = {}): BlocMeta => ({
  category: 'calendar',
  containerClass: CALENDAR_CONTAINER,
  description,
  iframeHeight: '600px',
  ...extra
});

export const blocMetadata: Record<string, BlocMeta> = {
  'dashboard-01': {
    category: 'dashboard',
    description: 'A dashboard with sidebar, charts and data table.'
  },

  'sidebar-01': {
    category: 'sidebar',
    description: 'A simple sidebar with navigation grouped by section.'
  },
  'sidebar-02': { category: 'sidebar', description: 'A sidebar with collapsible sections.' },
  'sidebar-03': { category: 'sidebar', description: 'A sidebar with submenus.' },
  'sidebar-04': { category: 'sidebar', description: 'A floating sidebar with submenus.' },
  'sidebar-05': { category: 'sidebar', description: 'A sidebar with collapsible submenus.' },
  'sidebar-06': { category: 'sidebar', description: 'A sidebar with submenus as dropdowns.' },
  'sidebar-07': { category: 'sidebar', description: 'A sidebar that collapses to icons.' },
  'sidebar-08': { category: 'sidebar', description: 'An inset sidebar with secondary navigation.' },
  'sidebar-09': { category: 'sidebar', description: 'Collapsible nested sidebars.' },
  'sidebar-10': { category: 'sidebar', description: 'A sidebar in a popover.' },
  'sidebar-11': { category: 'sidebar', description: 'A sidebar with a collapsible file tree.' },
  'sidebar-12': { category: 'sidebar', description: 'A sidebar with a calendar.' },
  'sidebar-13': { category: 'sidebar', description: 'A sidebar in a dialog.' },
  'sidebar-14': { category: 'sidebar', description: 'A sidebar on the right.' },
  'sidebar-15': { category: 'sidebar', description: 'A left and right sidebar.' },
  'sidebar-16': { category: 'sidebar', description: 'A sidebar with a sticky site header.' },

  'login-01': { category: 'login', description: 'A simple login form.' },
  'login-02': { category: 'login', description: 'A two column login page with a cover image.' },
  'login-03': { category: 'login', description: 'A login page with a muted background color.' },
  'login-04': { category: 'login', description: 'A login page with form and image.' },
  'login-05': { category: 'login', description: 'A simple email-only login page.' },

  'signup-01': { category: 'signup', description: 'A simple signup form.' },
  'signup-02': { category: 'signup', description: 'A two column signup page with a cover image.' },
  'signup-03': { category: 'signup', description: 'A signup page with a muted background color.' },
  'signup-04': { category: 'signup', description: 'A signup page with form and image.' },
  'signup-05': { category: 'signup', description: 'A simple signup form with social providers.' },

  'otp-01': { category: 'otp', description: 'A simple OTP verification form.' },
  'otp-02': { category: 'otp', description: 'A two column OTP page with a cover image.' },
  'otp-03': { category: 'otp', description: 'An OTP page with a muted background color.' },
  'otp-04': { category: 'otp', description: 'An OTP page with form and image.' },
  'otp-05': { category: 'otp', description: 'A simple OTP form with social providers.' },

  'calendar-01': calendar('A simple calendar.'),
  'calendar-02': calendar('Multiple months with single selection.'),
  'calendar-03': calendar('Multiple months with multiple selection.'),
  'calendar-04': calendar('Single month with range selection.'),
  'calendar-05': calendar('Multiple months with range selection.'),
  'calendar-06': calendar('Range selection with minimum days.'),
  'calendar-07': calendar('Range selection with minimum and maximum days.'),
  'calendar-08': calendar('Calendar with disabled days.'),
  'calendar-09': calendar('Calendar with disabled weekends.'),
  'calendar-10': calendar('Today button.'),
  'calendar-11': calendar('Start and end of month.'),
  'calendar-12': calendar('Localized calendar.'),
  'calendar-13': calendar('With month and year dropdown.'),
  'calendar-14': calendar('With booked/unavailable days.'),
  'calendar-16': calendar('With time picker.', { containerClass: CALENDAR_CONTAINER_TOP }),
  'calendar-17': calendar('With time picker inline.', { iframeHeight: '650px' }),
  'calendar-18': calendar('Variable size.'),
  'calendar-19': calendar('With presets.', { containerClass: CALENDAR_CONTAINER_TOP }),
  'calendar-20': calendar('With time presets.', { containerClass: CALENDAR_CONTAINER_TOP }),
  'calendar-21': calendar('Custom days and formatters.', {
    containerClass: CALENDAR_CONTAINER_TOP
  }),
  'calendar-22': calendar('Date picker.'),
  'calendar-23': calendar('Date range picker.'),
  'calendar-24': calendar('Date and time picker.'),
  'calendar-25': calendar('Date and time range picker.'),
  'calendar-26': calendar('Date range picker with time.'),
  'calendar-27': calendar('Chart filter.', { containerClass: CALENDAR_CONTAINER_TOP }),
  'calendar-28': calendar('Input with date picker.'),
  'calendar-29': calendar('Natural language date picker.'),
  'calendar-30': calendar('With little-date.'),
  'calendar-31': calendar('With event slots.', { iframeHeight: '700px' }),
  'calendar-32': calendar('Date picker in a drawer.')
};

export function blocsInCategory(category: BlocCategory): string[] {
  return Object.keys(blocMetadata).filter((name) => blocMetadata[name].category === category);
}

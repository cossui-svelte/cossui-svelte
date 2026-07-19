// this file is generated from one of the /scripts/
import type { ParticleMetaDefinition } from './registry-particles';

export const metadata: Record<string, ParticleMetaDefinition> = {
  'p-accordion-1': {
    description: 'Basic accordion',
    tags: ['accordion'],
    registryDependencies: ['accordion'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-accordion-2': {
    description: 'Accordion with one panel open',
    tags: ['accordion'],
    registryDependencies: ['accordion'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-accordion-3': {
    description: 'Accordion allowing multiple panels open',
    tags: ['accordion'],
    registryDependencies: ['accordion'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-accordion-4': {
    description: 'Controlled accordion',
    tags: ['accordion'],
    registryDependencies: ['accordion', 'button'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-alert-1': {
    description: 'Basic alert',
    tags: ['alert'],
    registryDependencies: ['alert'],
    meta: { class: '**:data-[slot=preview]:w-full' }
  },
  'p-alert-2': {
    description: 'Alert with icon',
    tags: ['alert'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['alert'],
    meta: { class: '**:data-[slot=preview]:w-full' }
  },
  'p-alert-3': {
    description: 'Alert with icon and action buttons',
    tags: ['alert'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['alert', 'button'],
    meta: { class: '**:data-[slot=preview]:w-full' }
  },
  'p-alert-4': {
    description: 'Info alert',
    tags: ['alert', 'info'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['alert'],
    meta: { class: '**:data-[slot=preview]:w-full' }
  },
  'p-alert-5': {
    description: 'Success alert',
    tags: ['alert', 'success'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['alert'],
    meta: { class: '**:data-[slot=preview]:w-full' }
  },
  'p-alert-6': {
    description: 'Warning alert',
    tags: ['alert', 'warning'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['alert'],
    meta: { class: '**:data-[slot=preview]:w-full' }
  },
  'p-alert-7': {
    description: 'Error alert',
    tags: ['alert', 'error'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['alert'],
    meta: { class: '**:data-[slot=preview]:w-full' }
  },
  'p-alert-dialog-1': {
    description: 'Alert dialog',
    tags: ['alert-dialog', 'dialog'],
    registryDependencies: ['alert-dialog', 'button']
  },
  'p-alert-dialog-2': {
    description: 'Alert dialog with bare footer',
    tags: ['alert-dialog', 'dialog'],
    registryDependencies: ['alert-dialog', 'button']
  },
  'p-autocomplete-1': {
    description: 'Basic autocomplete',
    tags: ['autocomplete', 'input'],
    registryDependencies: ['autocomplete'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-autocomplete-2': {
    description: 'Disabled autocomplete',
    tags: ['autocomplete', 'input', 'disabled'],
    registryDependencies: ['autocomplete'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-autocomplete-3': {
    description: 'Small autocomplete',
    tags: ['autocomplete', 'input'],
    registryDependencies: ['autocomplete'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-autocomplete-4': {
    description: 'Large autocomplete',
    tags: ['autocomplete', 'input'],
    registryDependencies: ['autocomplete'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-autocomplete-5': {
    description: 'Autocomplete with label',
    tags: ['autocomplete', 'input'],
    registryDependencies: ['autocomplete', 'label'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-autocomplete-6': {
    description: 'Autocomplete autofilling the input with the highlighted item',
    tags: ['autocomplete', 'input'],
    registryDependencies: ['autocomplete'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-autocomplete-7': {
    description: 'Autocomplete auto highlighting the first option',
    tags: ['autocomplete', 'input'],
    registryDependencies: ['autocomplete'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-autocomplete-8': {
    description: 'Autocomplete with clear button',
    tags: ['autocomplete', 'input'],
    registryDependencies: ['autocomplete'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-autocomplete-9': {
    description: 'Autocomplete with trigger and clear buttons',
    tags: ['autocomplete', 'input'],
    registryDependencies: ['autocomplete'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-autocomplete-10': {
    description: 'Autocomplete with grouped items',
    tags: ['autocomplete', 'input'],
    registryDependencies: ['autocomplete'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-autocomplete-11': {
    description: 'Autocomplete with limited number of results',
    tags: ['autocomplete', 'input'],
    registryDependencies: ['autocomplete'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-autocomplete-12': {
    description: 'Autocomplete with async items loading',
    tags: ['autocomplete', 'input', 'async'],
    registryDependencies: ['autocomplete', 'spinner'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-autocomplete-13': {
    description: 'Autocomplete form',
    tags: ['autocomplete', 'form', 'input'],
    registryDependencies: ['autocomplete', 'button', 'field', 'form'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-autocomplete-14': {
    description: 'Autocomplete form',
    tags: ['autocomplete', 'input'],
    registryDependencies: ['autocomplete'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-autocomplete-15': {
    description: 'Pill-shaped autocomplete',
    tags: ['autocomplete', 'input'],
    registryDependencies: ['autocomplete'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-avatar-1': {
    description: 'Avatar with image and fallback',
    tags: ['avatar'],
    registryDependencies: ['avatar']
  },
  'p-avatar-2': {
    description: 'Fallback-only avatar',
    tags: ['avatar'],
    registryDependencies: ['avatar']
  },
  'p-avatar-3': {
    description: 'Avatars with different sizes',
    tags: ['avatar'],
    registryDependencies: ['avatar']
  },
  'p-avatar-4': {
    description: 'Avatars with different radii',
    tags: ['avatar'],
    registryDependencies: ['avatar']
  },
  'p-avatar-5': {
    description: 'Overlapping avatar group',
    tags: ['avatar'],
    registryDependencies: ['avatar']
  },
  'p-avatar-6': {
    description: 'Avatar with user icon fallback',
    tags: ['avatar'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['avatar']
  },
  'p-avatar-7': {
    description: 'Avatar with emerald status dot',
    tags: ['avatar'],
    registryDependencies: ['avatar']
  },
  'p-avatar-8': {
    description: 'Avatar with muted status dot',
    tags: ['avatar'],
    registryDependencies: ['avatar']
  },
  'p-avatar-9': {
    description: 'Rounded avatar with top-right emerald status',
    tags: ['avatar'],
    registryDependencies: ['avatar']
  },
  'p-avatar-10': {
    description: 'Avatar with notification badge',
    tags: ['avatar'],
    registryDependencies: ['avatar', 'badge']
  },
  'p-avatar-11': {
    description: 'Rounded avatar with notification badge',
    tags: ['avatar'],
    registryDependencies: ['avatar', 'badge']
  },
  'p-avatar-12': {
    description: 'Avatar with verified badge',
    tags: ['avatar'],
    registryDependencies: ['avatar']
  },
  'p-avatar-13': {
    description: 'Small overlapping avatar group',
    tags: ['avatar'],
    registryDependencies: ['avatar']
  },
  'p-avatar-14': {
    description: 'Large overlapping avatar group',
    tags: ['avatar'],
    registryDependencies: ['avatar']
  },
  'p-badge-1': {
    description: 'Basic badge',
    tags: ['badge'],
    registryDependencies: ['badge']
  },
  'p-badge-2': {
    description: 'Outline badge',
    tags: ['badge'],
    registryDependencies: ['badge']
  },
  'p-badge-3': {
    description: 'Secondary badge',
    tags: ['badge'],
    registryDependencies: ['badge']
  },
  'p-badge-4': {
    description: 'Destructive badge',
    tags: ['badge', 'error'],
    registryDependencies: ['badge']
  },
  'p-badge-5': {
    description: 'Info badge',
    tags: ['badge', 'info'],
    registryDependencies: ['badge']
  },
  'p-badge-6': {
    description: 'Success badge',
    tags: ['badge', 'success'],
    registryDependencies: ['badge']
  },
  'p-badge-7': {
    description: 'Warning badge',
    tags: ['badge', 'warning'],
    registryDependencies: ['badge']
  },
  'p-badge-8': {
    description: 'Error badge',
    tags: ['badge', 'error'],
    registryDependencies: ['badge']
  },
  'p-badge-9': {
    description: 'Small badge',
    tags: ['badge'],
    registryDependencies: ['badge']
  },
  'p-badge-10': {
    description: 'Large badge',
    tags: ['badge'],
    registryDependencies: ['badge']
  },
  'p-badge-11': {
    description: 'Badge with icon',
    tags: ['badge'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['badge']
  },
  'p-badge-12': {
    description: 'Badge with link',
    tags: ['badge'],
    registryDependencies: ['badge']
  },
  'p-badge-13': {
    description: 'Badge with count',
    tags: ['badge'],
    registryDependencies: ['badge']
  },
  'p-badge-14': {
    description: 'Full rounded badge (pill)',
    tags: ['badge'],
    registryDependencies: ['badge']
  },
  'p-badge-15': {
    description: 'Badge with number after text',
    tags: ['badge'],
    registryDependencies: ['badge']
  },
  'p-badge-16': {
    description: 'Status badge - Paid',
    tags: ['badge'],
    registryDependencies: ['badge']
  },
  'p-badge-17': {
    description: 'Status badge - Pending',
    tags: ['badge'],
    registryDependencies: ['badge']
  },
  'p-badge-18': {
    description: 'Status badge - Failed',
    tags: ['badge'],
    registryDependencies: ['badge']
  },
  'p-badge-19': {
    description: 'Selectable badge with checkbox',
    tags: ['badge', 'checkbox'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['badge', 'checkbox'],
    meta: { class: '**:data-[slot=preview]:flex' }
  },
  'p-badge-20': {
    description: 'Removable badge',
    tags: ['badge'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['badge']
  },
  'p-breadcrumb-1': {
    description: 'Breadcrumb with menu example',
    tags: ['breadcrumb', 'dropdown', 'menu'],
    registryDependencies: ['breadcrumb', 'button', 'menu']
  },
  'p-breadcrumb-2': {
    description: 'Breadcrumb with custom separator',
    tags: ['breadcrumb'],
    registryDependencies: ['breadcrumb']
  },
  'p-breadcrumb-3': {
    description: 'Breadcrumb with home icon for home link only',
    tags: ['breadcrumb'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['breadcrumb']
  },
  'p-breadcrumb-4': {
    description: 'Breadcrumb with folders icon menu',
    tags: ['breadcrumb', 'dropdown', 'menu'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['breadcrumb', 'button', 'menu']
  },
  'p-breadcrumb-5': {
    description: 'Breadcrumb with icons before text',
    tags: ['breadcrumb'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['breadcrumb']
  },
  'p-breadcrumb-6': {
    description: 'Breadcrumb with dot separators',
    tags: ['breadcrumb'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['breadcrumb']
  },
  'p-breadcrumb-7': {
    description: 'Breadcrumb with select dropdown',
    tags: ['breadcrumb', 'select'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['breadcrumb', 'select']
  },
  'p-button-1': {
    description: 'Default button',
    tags: ['button'],
    registryDependencies: ['button']
  },
  'p-button-2': {
    description: 'Outline button',
    tags: ['button'],
    registryDependencies: ['button']
  },
  'p-button-3': {
    description: 'Secondary button',
    tags: ['button'],
    registryDependencies: ['button']
  },
  'p-button-4': {
    description: 'Destructive button',
    tags: ['button'],
    registryDependencies: ['button']
  },
  'p-button-5': {
    description: 'Destructive outline button',
    tags: ['button'],
    registryDependencies: ['button']
  },
  'p-button-6': {
    description: 'Ghost button',
    tags: ['button'],
    registryDependencies: ['button']
  },
  'p-button-7': {
    description: 'Link button',
    tags: ['button'],
    registryDependencies: ['button']
  },
  'p-button-8': {
    description: 'Extra-small button',
    tags: ['button'],
    registryDependencies: ['button']
  },
  'p-button-9': {
    description: 'Small button',
    tags: ['button'],
    registryDependencies: ['button']
  },
  'p-button-10': {
    description: 'Large button',
    tags: ['button'],
    registryDependencies: ['button']
  },
  'p-button-11': {
    description: 'Extra-large button',
    tags: ['button'],
    registryDependencies: ['button']
  },
  'p-button-12': {
    description: 'Disabled button',
    tags: ['button', 'disabled'],
    registryDependencies: ['button']
  },
  'p-button-13': {
    description: 'Icon button',
    tags: ['button'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['button']
  },
  'p-button-14': {
    description: 'Small icon button',
    tags: ['button'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['button']
  },
  'p-button-15': {
    description: 'Large icon button',
    tags: ['button'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['button']
  },
  'p-button-16': {
    description: 'Button with icon',
    tags: ['button'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['button']
  },
  'p-button-17': {
    description: 'Link rendered as button',
    tags: ['button'],
    registryDependencies: ['button']
  },
  'p-button-41': {
    description: 'Button using the built-in loading prop',
    tags: ['button', 'loading'],
    registryDependencies: ['button']
  },
  'p-button-18': {
    description: 'Custom loading button with manual Spinner',
    tags: ['button', 'loading'],
    registryDependencies: ['button', 'spinner']
  },
  'p-button-19': {
    description: 'Expandable show more/less toggle button',
    tags: ['button'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['button']
  },
  'p-button-20': {
    description: 'Back link button with chevron',
    tags: ['button'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['button']
  },
  'p-button-21': {
    description: 'Card-style button with heading and description',
    tags: ['button'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['button']
  },
  'p-button-22': {
    description: 'Directional pad control buttons',
    tags: ['button'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['button']
  },
  'p-button-23': {
    description: 'Outline like button with count',
    tags: ['button'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['button']
  },
  'p-button-24': {
    description: 'Social login icon buttons',
    tags: ['button'],
    npmDependencies: ['@remixicon/react'],
    registryDependencies: ['button']
  },
  'p-button-26': {
    description: 'Star button with count badge',
    tags: ['button'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['button']
  },
  'p-button-27': {
    description: 'Button group with QR code icon and sign in',
    tags: ['button', 'group'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['button', 'group']
  },
  'p-button-28': {
    description: 'Button with avatar',
    tags: ['button', 'avatar'],
    registryDependencies: ['avatar', 'button']
  },
  'p-button-29': {
    description: 'Pill-shaped button with rounded-full styling',
    tags: ['button'],
    registryDependencies: ['button']
  },
  'p-button-30': {
    description: 'Button with animated arrow on hover',
    tags: ['button'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['button']
  },
  'p-button-31': {
    description: 'Button with keyboard shortcut indicator',
    tags: ['button', 'kbd'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['button', 'kbd']
  },
  'p-button-32': {
    description: 'Button with notification badge',
    tags: ['button', 'badge'],
    registryDependencies: ['badge', 'button']
  },
  'p-button-33': {
    description: 'Paired buttons (Cancel/Save)',
    tags: ['button'],
    registryDependencies: ['button']
  },
  'p-button-34': {
    description: 'Button with animated status dot',
    tags: ['button'],
    registryDependencies: ['button']
  },
  'p-button-35': {
    description: 'Icon-only copy button with feedback',
    tags: ['button'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['button']
  },
  'p-button-36': {
    description: 'Copy button with feedback',
    tags: ['button'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['button']
  },
  'p-button-37': {
    description: 'Rotating icon button (FAB-style toggle)',
    tags: ['button'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['button']
  },
  'p-button-39': {
    description: 'Hamburger menu button with animated icon',
    tags: ['button'],
    registryDependencies: ['button']
  },
  'p-button-40': {
    description: 'Download button with progress and cancel action',
    tags: ['button', 'group', 'tooltip', 'toast'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['button', 'group', 'spinner', 'toast', 'tooltip']
  },
  'p-button-38': {
    description: 'Social login buttons (Google, X, GitHub)',
    tags: ['button'],
    npmDependencies: ['@remixicon/react'],
    registryDependencies: ['button'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-calendar-1': {
    description: 'Basic calendar',
    tags: ['calendar'],
    registryDependencies: ['calendar']
  },
  'p-calendar-3': {
    description: 'Calendar with date range selection',
    tags: ['calendar'],
    registryDependencies: ['calendar']
  },
  'p-calendar-4': {
    description: 'Calendar with month/year dropdown navigation',
    tags: ['calendar'],
    registryDependencies: ['calendar']
  },
  'p-calendar-5': {
    description: 'Calendar with custom Select dropdown for month/year',
    tags: ['calendar', 'select'],
    registryDependencies: ['calendar', 'select']
  },
  'p-calendar-6': {
    description: 'Calendar with Combobox dropdown for month/year',
    tags: ['calendar', 'combobox'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['calendar', 'combobox']
  },
  'p-calendar-7': {
    description: 'Calendar with disabled dates',
    tags: ['calendar'],
    npmDependencies: ['date-fns'],
    registryDependencies: ['calendar']
  },
  'p-calendar-8': {
    description: 'Calendar with multiple date selection',
    tags: ['calendar'],
    npmDependencies: ['date-fns'],
    registryDependencies: ['calendar']
  },
  'p-calendar-2': {
    description: 'Calendar with custom cell size',
    tags: ['calendar'],
    registryDependencies: ['calendar']
  },
  'p-calendar-9': {
    description: 'Calendar with rounded day buttons',
    tags: ['calendar'],
    registryDependencies: ['calendar']
  },
  'p-calendar-10': {
    description: 'Calendar with rounded range selection style',
    tags: ['calendar'],
    npmDependencies: ['date-fns'],
    registryDependencies: ['calendar']
  },
  'p-calendar-11': {
    description: 'Calendar with right-aligned navigation',
    tags: ['calendar'],
    registryDependencies: ['calendar']
  },
  'p-calendar-12': {
    description: 'Calendar with week numbers',
    tags: ['calendar'],
    registryDependencies: ['calendar']
  },
  'p-calendar-13': {
    description: 'Calendar with year-only combobox dropdown',
    tags: ['calendar', 'combobox'],
    registryDependencies: ['calendar', 'combobox']
  },
  'p-calendar-14': {
    description: 'Calendar without arrow navigation (dropdown only)',
    tags: ['calendar', 'select'],
    registryDependencies: ['calendar', 'select']
  },
  'p-calendar-15': {
    description: 'Calendar with current month button',
    tags: ['calendar', 'button'],
    npmDependencies: ['date-fns'],
    registryDependencies: ['calendar', 'button']
  },
  'p-calendar-16': {
    description: 'Calendar with today button',
    tags: ['calendar', 'button'],
    npmDependencies: ['date-fns'],
    registryDependencies: ['calendar', 'button']
  },
  'p-calendar-17': {
    description: 'Calendar with date input',
    tags: ['calendar', 'input', 'field'],
    npmDependencies: ['date-fns', 'lucide-react'],
    registryDependencies: ['calendar', 'field', 'input-group']
  },
  'p-calendar-18': {
    description: 'Calendar with time input',
    tags: ['calendar', 'input', 'field'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['calendar', 'field', 'input-group']
  },
  'p-calendar-19': {
    description: 'Calendar with time slots (appointment picker)',
    tags: ['calendar', 'toggle', 'toggle-group', 'scroll-area'],
    npmDependencies: ['date-fns'],
    registryDependencies: ['calendar', 'scroll-area', 'toggle', 'toggle-group']
  },
  'p-calendar-20': {
    description: 'Calendar with date presets',
    tags: ['calendar', 'button'],
    npmDependencies: ['date-fns'],
    registryDependencies: ['calendar', 'button']
  },
  'p-calendar-21': {
    description: 'Range calendar with date presets',
    tags: ['calendar', 'button'],
    npmDependencies: ['date-fns'],
    registryDependencies: ['calendar', 'button']
  },
  'p-calendar-22': {
    description: 'Two months calendar',
    tags: ['calendar'],
    npmDependencies: ['date-fns'],
    registryDependencies: ['calendar'],
    meta: { colSpan: 2 }
  },
  'p-calendar-23': {
    description: 'Three months calendar',
    tags: ['calendar'],
    npmDependencies: ['date-fns'],
    registryDependencies: ['calendar'],
    meta: { colSpan: 2 }
  },
  'p-calendar-24': {
    description: 'Pricing calendar with custom day buttons',
    tags: ['calendar'],
    npmDependencies: ['date-fns'],
    registryDependencies: ['calendar'],
    meta: { colSpan: 2 }
  },
  'p-date-picker-1': {
    description: 'Basic date picker',
    tags: ['date-picker', 'calendar', 'popover', 'button'],
    npmDependencies: ['date-fns', 'lucide-react'],
    registryDependencies: ['calendar', 'popover', 'button'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-date-picker-2': {
    description: 'Date range picker',
    tags: ['date-picker', 'calendar', 'popover', 'button'],
    npmDependencies: ['date-fns', 'lucide-react'],
    registryDependencies: ['calendar', 'popover', 'button'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-date-picker-9': {
    description: 'Two months calendar with range date',
    tags: ['date-picker', 'calendar', 'popover', 'button'],
    npmDependencies: ['date-fns', 'lucide-react'],
    registryDependencies: ['calendar', 'popover', 'button'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-date-picker-3': {
    description: 'Date picker with field and dropdown navigation',
    tags: ['date-picker', 'calendar', 'popover', 'button', 'field', 'combobox'],
    npmDependencies: ['date-fns', 'lucide-react'],
    registryDependencies: ['button', 'calendar', 'combobox', 'field', 'popover'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-date-picker-4': {
    description: 'Date picker with presets',
    tags: ['date-picker', 'calendar', 'popover', 'button'],
    npmDependencies: ['date-fns', 'lucide-react'],
    registryDependencies: ['button', 'calendar', 'popover'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-date-picker-5': {
    description: 'Date picker with input',
    tags: ['date-picker', 'calendar', 'popover', 'button', 'input'],
    npmDependencies: ['date-fns', 'lucide-react'],
    registryDependencies: ['button', 'calendar', 'input-group', 'popover'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-date-picker-6': {
    description: 'Date picker that closes on select',
    tags: ['date-picker', 'calendar', 'popover', 'button'],
    npmDependencies: ['date-fns', 'lucide-react'],
    registryDependencies: ['calendar', 'popover', 'button'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-date-picker-7': {
    description: 'Multiple dates picker',
    tags: ['date-picker', 'calendar', 'popover', 'button', 'badge'],
    npmDependencies: ['date-fns', 'lucide-react'],
    registryDependencies: ['badge', 'button', 'calendar', 'popover'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-date-picker-8': {
    description: 'Date picker with select-like trigger',
    tags: ['date-picker', 'calendar', 'popover', 'button'],
    npmDependencies: ['date-fns', 'lucide-react'],
    registryDependencies: ['calendar', 'popover', 'select'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-card-1': {
    description: 'A basic card with header and footer',
    tags: ['card', 'form'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['button', 'card', 'field', 'form', 'input', 'select'],
    meta: {
      class:
        '**:data-[slot=preview]:w-full **:data-[slot=preview]:flex **:data-[slot=preview]:justify-center'
    }
  },
  'p-card-2': {
    description: 'Authentication card with actions',
    tags: ['card', 'form'],
    registryDependencies: ['button', 'card', 'field', 'form', 'input'],
    meta: {
      class:
        '**:data-[slot=preview]:w-full **:data-[slot=preview]:flex **:data-[slot=preview]:justify-center'
    }
  },
  'p-card-3': {
    description: 'Authentication card with separators',
    tags: ['card', 'form'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['button', 'card', 'field', 'form', 'input'],
    meta: {
      class:
        '**:data-[slot=preview]:w-full **:data-[slot=preview]:flex **:data-[slot=preview]:justify-center'
    }
  },
  'p-card-4': {
    description: 'Framed card with footer',
    tags: ['card', 'form'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['button', 'card', 'field', 'form', 'input', 'select'],
    meta: {
      class:
        '**:data-[slot=preview]:w-full **:data-[slot=preview]:flex **:data-[slot=preview]:justify-center'
    }
  },
  'p-card-5': {
    description: 'Framed card with header',
    tags: ['card', 'form'],
    registryDependencies: ['button', 'card', 'field', 'form', 'input', 'select'],
    meta: {
      class:
        '**:data-[slot=preview]:w-full **:data-[slot=preview]:flex **:data-[slot=preview]:justify-center'
    }
  },
  'p-card-6': {
    description: 'Framed card with header and footer',
    tags: ['card', 'form'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['button', 'card', 'field', 'form', 'input', 'select'],
    meta: {
      class:
        '**:data-[slot=preview]:w-full **:data-[slot=preview]:flex **:data-[slot=preview]:justify-center'
    }
  },
  'p-card-7': {
    description: 'Framed card with no rounded bottom',
    tags: ['card', 'form'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['button', 'card', 'field', 'form', 'input', 'select'],
    meta: {
      class:
        '**:data-[slot=preview]:w-full **:data-[slot=preview]:flex **:data-[slot=preview]:justify-center'
    }
  },
  'p-card-8': {
    description: 'Card within a frame and footer',
    tags: ['card', 'form', 'frame'],
    registryDependencies: ['button', 'card', 'field', 'form', 'frame', 'input', 'select'],
    meta: {
      class:
        '**:data-[slot=preview]:w-full **:data-[slot=preview]:flex **:data-[slot=preview]:justify-center'
    }
  },
  'p-card-9': {
    description: 'Card within a frame and footer',
    tags: ['card', 'form', 'frame'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['button', 'card', 'field', 'form', 'frame', 'input', 'select'],
    meta: {
      class:
        '**:data-[slot=preview]:w-full **:data-[slot=preview]:flex **:data-[slot=preview]:justify-center'
    }
  },
  'p-card-10': {
    description: 'Card within a frame with header and footer',
    tags: ['card', 'form', 'frame'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['button', 'card', 'field', 'form', 'frame', 'input', 'select'],
    meta: {
      class:
        '**:data-[slot=preview]:w-full **:data-[slot=preview]:flex **:data-[slot=preview]:justify-center'
    }
  },
  'p-card-11': {
    description: 'CardFrame with header action',
    tags: ['card', 'frame'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['button', 'card', 'empty'],
    meta: {
      class:
        '**:data-[slot=preview]:w-full **:data-[slot=preview]:flex **:data-[slot=preview]:justify-center'
    }
  },
  'p-checkbox-1': {
    description: 'Basic checkbox',
    tags: ['checkbox'],
    registryDependencies: ['checkbox', 'label']
  },
  'p-checkbox-2': {
    description: 'Disabled checkbox',
    tags: ['checkbox', 'disabled'],
    registryDependencies: ['checkbox', 'label']
  },
  'p-checkbox-3': {
    description: 'Checkbox with description',
    tags: ['checkbox'],
    registryDependencies: ['checkbox', 'label']
  },
  'p-checkbox-4': {
    description: 'Card-style checkbox',
    tags: ['checkbox'],
    registryDependencies: ['checkbox', 'label']
  },
  'p-checkbox-5': {
    description: 'Checkbox form',
    tags: ['checkbox', 'form'],
    registryDependencies: ['button', 'checkbox', 'field', 'form']
  },
  'p-checkbox-group-1': {
    description: 'Basic checkbox group',
    tags: ['checkbox', 'checkbox-group'],
    registryDependencies: ['checkbox', 'checkbox-group', 'label']
  },
  'p-checkbox-group-2': {
    description: 'Checkbox group with disabled items',
    tags: ['checkbox', 'checkbox-group', 'disabled'],
    registryDependencies: ['checkbox', 'checkbox-group', 'label']
  },
  'p-checkbox-group-3': {
    description: 'Checkbox group with parent checkbox',
    tags: ['checkbox', 'checkbox-group'],
    registryDependencies: ['checkbox', 'checkbox-group', 'label']
  },
  'p-checkbox-group-4': {
    description: 'Nested checkbox group with parent',
    tags: ['checkbox', 'checkbox-group'],
    registryDependencies: ['checkbox', 'checkbox-group', 'label']
  },
  'p-checkbox-group-5': {
    description: 'Checkbox group form',
    tags: ['checkbox', 'checkbox-group', 'form'],
    registryDependencies: ['button', 'checkbox', 'checkbox-group', 'field', 'fieldset', 'form']
  },
  'p-collapsible-1': {
    description: 'Basic collapsible',
    tags: ['collapsible'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['collapsible']
  },
  'p-combobox-1': {
    description: 'Basic combobox',
    tags: ['combobox', 'input'],
    registryDependencies: ['combobox'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-combobox-2': {
    description: 'Disabled combobox',
    tags: ['combobox', 'input', 'disabled'],
    registryDependencies: ['combobox'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-combobox-3': {
    description: 'Small combobox',
    tags: ['combobox', 'input'],
    registryDependencies: ['combobox'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-combobox-4': {
    description: 'Large combobox',
    tags: ['combobox', 'input'],
    registryDependencies: ['combobox'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-combobox-5': {
    description: 'Combobox with label',
    tags: ['combobox', 'input'],
    registryDependencies: ['combobox', 'label'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-combobox-6': {
    description: 'Combobox auto highlighting the first option',
    tags: ['combobox', 'input'],
    registryDependencies: ['combobox'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-combobox-7': {
    description: 'Combobox with clear button',
    tags: ['combobox', 'input'],
    registryDependencies: ['combobox'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-combobox-8': {
    description: 'Combobox with grouped items',
    tags: ['combobox', 'input'],
    registryDependencies: ['combobox'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-combobox-9': {
    description: 'Combobox with multiple selection',
    tags: ['combobox', 'input'],
    registryDependencies: ['combobox'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-combobox-10': {
    description: 'Combobox with input inside popup',
    tags: ['combobox', 'input'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['button', 'combobox'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-combobox-11': {
    description: 'Combobox form',
    tags: ['combobox', 'form', 'input'],
    registryDependencies: ['button', 'combobox', 'field', 'form'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-combobox-12': {
    description: 'Combobox multiple form',
    tags: ['combobox', 'form', 'input'],
    registryDependencies: ['button', 'combobox', 'field', 'form'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-combobox-13': {
    description: 'Combobox with start addon',
    tags: ['combobox', 'input'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['combobox'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-combobox-14': {
    description: 'Combobox multiple with start addon',
    tags: ['combobox', 'input'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['combobox'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-combobox-15': {
    description: 'Pill-shaped combobox',
    tags: ['combobox', 'input'],
    registryDependencies: ['combobox'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-combobox-16': {
    description: 'Timezone combobox',
    tags: ['combobox', 'input', 'timezone'],
    registryDependencies: ['combobox'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-combobox-17': {
    description: 'Timezone combobox with search input',
    tags: ['combobox', 'input', 'timezone'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['combobox', 'select'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-combobox-18': {
    description: 'Combobox with select trigger',
    tags: ['combobox', 'select'],
    registryDependencies: ['combobox', 'select'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-command-1': {
    description: 'Command palette with dialog',
    tags: ['command', 'dialog'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['button', 'command', 'kbd']
  },
  'p-command-2': {
    description: 'Command palette with AI assistant',
    tags: ['command', 'dialog'],
    npmDependencies: ['lucide-react'],
    registryDependencies: [
      'autocomplete',
      'button',
      'command',
      'empty',
      'input',
      'kbd',
      'scroll-area',
      'skeleton',
      'spinner'
    ]
  },
  'p-dialog-1': {
    description: 'Dialog with form',
    tags: ['dialog'],
    registryDependencies: ['button', 'dialog', 'field', 'form', 'input']
  },
  'p-dialog-6': {
    description: 'Dialog with bare footer',
    tags: ['dialog'],
    registryDependencies: ['button', 'dialog', 'field', 'form', 'input']
  },
  'p-dialog-2': {
    description: 'Dialog opened from menu',
    tags: ['dialog', 'dropdown', 'menu'],
    registryDependencies: ['button', 'dialog', 'menu']
  },
  'p-dialog-3': {
    description: 'Nested dialogs',
    tags: ['dialog'],
    registryDependencies: ['button', 'dialog', 'field', 'input']
  },
  'p-dialog-4': {
    description: 'Dialog with close confirmation',
    tags: ['alert-dialog', 'dialog'],
    registryDependencies: ['alert-dialog', 'button', 'dialog', 'field', 'form', 'textarea']
  },
  'p-dialog-5': {
    description: 'Dialog with long content',
    tags: ['dialog'],
    registryDependencies: ['button', 'dialog']
  },
  'p-drawer-1': {
    description: 'Simple bottom drawer with close button',
    tags: ['drawer'],
    registryDependencies: ['button', 'drawer']
  },
  'p-drawer-2': {
    description: 'Bottom drawer without drag bar',
    tags: ['drawer'],
    registryDependencies: ['button', 'drawer']
  },
  'p-drawer-3': {
    description: 'Drawer with close button',
    tags: ['drawer'],
    registryDependencies: ['button', 'drawer']
  },
  'p-drawer-4': {
    description: 'Inset variant drawers for all four positions',
    tags: ['drawer'],
    registryDependencies: ['button', 'drawer']
  },
  'p-drawer-5': {
    description: 'Straight variant drawers for all four positions',
    tags: ['drawer'],
    registryDependencies: ['button', 'drawer']
  },
  'p-drawer-6': {
    description: 'Scrollable content with terms and conditions',
    tags: ['drawer'],
    registryDependencies: ['button', 'drawer']
  },
  'p-drawer-7': {
    description: 'Nested bottom drawers with centered content',
    tags: ['drawer'],
    registryDependencies: ['button', 'drawer']
  },
  'p-drawer-8': {
    description: 'Nested right drawers with inset variant',
    tags: ['drawer'],
    registryDependencies: ['button', 'drawer', 'field', 'input']
  },
  'p-drawer-9': {
    description: 'Bottom drawer with snap points',
    tags: ['drawer'],
    registryDependencies: ['button', 'drawer']
  },
  'p-drawer-10': {
    description: 'Edit profile form with default and bare footer variants',
    tags: ['drawer'],
    registryDependencies: ['button', 'drawer', 'field', 'form', 'input']
  },
  'p-drawer-11': {
    description: 'Mobile menu drawer from the left',
    tags: ['drawer'],
    registryDependencies: ['button', 'drawer']
  },
  'p-drawer-12': {
    description: 'Responsive edit profile: dialog on desktop, drawer on mobile',
    tags: ['drawer', 'dialog'],
    registryDependencies: [
      'button',
      'dialog',
      'drawer',
      'field',
      'form',
      'input',
      'use-media-query'
    ]
  },
  'p-drawer-13': {
    description: 'Responsive actions menu: menu on desktop, drawer on mobile',
    tags: ['drawer', 'menu'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['button', 'drawer', 'menu', 'use-media-query']
  },
  'p-drawer-14': {
    description: 'Left drawer with swipe area',
    tags: ['drawer'],
    registryDependencies: ['button', 'drawer'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-md' }
  },
  'p-empty-1': {
    description: 'Empty state with icon and actions',
    tags: ['empty-state'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['button', 'empty']
  },
  'p-field-1': {
    description: 'Field with description',
    tags: ['field', 'input', 'label'],
    registryDependencies: ['field', 'input'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-field-2': {
    description: 'Field with required indicator',
    tags: ['field', 'input', 'label'],
    registryDependencies: ['field', 'input'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-field-3': {
    description: 'Field in disabled state',
    tags: ['disabled', 'field', 'input', 'label'],
    registryDependencies: ['field', 'input'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-field-4': {
    description: 'Field showing validation error',
    tags: ['error', 'field', 'input', 'label'],
    registryDependencies: ['field', 'input'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-field-5': {
    description: 'Show field validity state',
    tags: ['field', 'input'],
    registryDependencies: ['field', 'input'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-field-6': {
    description: 'Input group with field',
    tags: ['button', 'field', 'input', 'input-group'],
    registryDependencies: ['button', 'field', 'input-group'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-field-7': {
    description: 'Field with autocomplete',
    tags: ['autocomplete', 'field', 'input', 'label'],
    registryDependencies: ['autocomplete', 'field'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-field-8': {
    description: 'Field with combobox',
    tags: ['combobox', 'field', 'input', 'label'],
    registryDependencies: ['combobox', 'field'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-field-9': {
    description: 'Field with multiple selection combobox',
    tags: ['combobox', 'field', 'input', 'label'],
    registryDependencies: ['combobox', 'field'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-field-10': {
    description: 'Field with textarea',
    tags: ['field', 'label', 'textarea'],
    registryDependencies: ['field', 'textarea'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-field-11': {
    description: 'Field with select',
    tags: ['field', 'label', 'select'],
    registryDependencies: ['field', 'select'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-field-12': {
    description: 'Field with checkbox',
    tags: ['checkbox', 'field', 'label'],
    registryDependencies: ['checkbox', 'field'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-field-13': {
    description: 'Field with checkbox group',
    tags: ['checkbox', 'checkbox-group', 'field', 'fieldset', 'label'],
    registryDependencies: ['checkbox', 'checkbox-group', 'field', 'fieldset']
  },
  'p-field-14': {
    description: 'Field with radio group',
    tags: ['field', 'fieldset', 'label', 'radio-group'],
    registryDependencies: ['field', 'fieldset', 'radio-group'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-field-15': {
    description: 'Field with toggle switch',
    tags: ['field', 'label', 'switch'],
    registryDependencies: ['field', 'switch']
  },
  'p-field-16': {
    description: 'Field with slider',
    tags: ['field', 'label', 'slider'],
    registryDependencies: ['field', 'slider'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-field-17': {
    description: 'Field with number field',
    tags: ['field', 'input', 'label', 'number-field'],
    registryDependencies: ['field', 'number-field'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-field-18': {
    description: 'Complete form built with field',
    tags: ['button', 'checkbox', 'field', 'form', 'input', 'label', 'select'],
    registryDependencies: ['button', 'checkbox', 'field', 'form', 'input', 'select'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-fieldset-1': {
    description: 'Fieldset with multiple fields',
    tags: ['fieldset', 'input'],
    registryDependencies: ['field', 'fieldset', 'input'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-form-1': {
    description: 'Input in a form',
    tags: ['button', 'field', 'form', 'input'],
    registryDependencies: ['button', 'field', 'form', 'input'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-form-2': {
    description: 'Form with zod validation',
    tags: ['button', 'field', 'form', 'label', 'validation', 'zod'],
    npmDependencies: ['zod'],
    registryDependencies: ['button', 'field', 'form', 'input'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-frame-1': {
    description: 'Basic frame',
    tags: ['frame'],
    registryDependencies: ['frame'],
    meta: { class: '**:data-[slot=preview]:w-full' }
  },
  'p-frame-3': {
    description: 'Frame with multiple separated panels',
    tags: ['frame'],
    registryDependencies: ['frame'],
    meta: { class: '**:data-[slot=preview]:w-full' }
  },
  'p-frame-4': {
    description: 'Frame with multiple stacked panels',
    tags: ['frame'],
    registryDependencies: ['frame', 'separator'],
    meta: { class: '**:data-[slot=preview]:w-full' }
  },
  'p-frame-2': {
    description: 'Frame with collapsible content and delete button',
    tags: ['collapsible', 'frame'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['button', 'collapsible', 'frame'],
    meta: { class: '**:data-[slot=preview]:w-full' }
  },
  'p-kbd-1': {
    description: 'Keyboard shortcuts display',
    tags: ['kbd'],
    registryDependencies: ['kbd']
  },
  'p-group-1': {
    description: 'Basic group',
    tags: ['group'],
    registryDependencies: ['button', 'group', 'menu']
  },
  'p-group-2': {
    description: 'Group with input',
    tags: ['group', 'input'],
    registryDependencies: ['button', 'group', 'input', 'tooltip', 'use-copy-to-clipboard']
  },
  'p-group-3': {
    description: 'Small group',
    tags: ['group'],
    registryDependencies: ['button', 'group', 'menu']
  },
  'p-group-4': {
    description: 'Large group',
    tags: ['group'],
    registryDependencies: ['button', 'group', 'menu']
  },
  'p-group-5': {
    description: 'Group with disabled button',
    tags: ['button', 'group'],
    registryDependencies: ['button', 'group', 'menu']
  },
  'p-group-6': {
    description: 'Group with default button',
    tags: ['button', 'group'],
    registryDependencies: ['button', 'group', 'menu']
  },
  'p-group-7': {
    description: 'Group with start text',
    tags: ['group'],
    registryDependencies: ['group', 'input', 'label']
  },
  'p-group-8': {
    description: 'Group with end text',
    tags: ['group'],
    registryDependencies: ['group', 'input', 'label']
  },
  'p-group-9': {
    description: 'Vertical group',
    tags: ['group'],
    registryDependencies: ['button', 'group']
  },
  'p-group-10': {
    description: 'Nested groups',
    tags: ['group'],
    registryDependencies: ['button', 'group']
  },
  'p-group-11': {
    description: 'Group with popup',
    tags: ['group'],
    registryDependencies: ['badge', 'button', 'group', 'popover']
  },
  'p-group-12': {
    description: 'Group with input group',
    tags: ['group', 'input-group'],
    registryDependencies: ['button', 'group', 'input-group', 'tooltip']
  },
  'p-group-13': {
    description: 'Group with menu',
    tags: ['dropdown', 'group', 'menu'],
    registryDependencies: ['button', 'group', 'menu']
  },
  'p-group-14': {
    description: 'Group with select',
    tags: ['group', 'select', 'number-field'],
    registryDependencies: ['button', 'group', 'number-field', 'select']
  },
  'p-group-15': {
    description: 'Group with search',
    tags: ['group', 'search'],
    registryDependencies: ['button', 'group', 'input', 'select']
  },
  'p-group-16': {
    description: 'Group with add button and input',
    tags: ['button', 'group', 'input'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['button', 'group', 'input']
  },
  'p-group-17': {
    description: 'Group with input and currency text',
    tags: ['group', 'input'],
    registryDependencies: ['group', 'input', 'label']
  },
  'p-group-18': {
    description: 'Group with select and input',
    tags: ['group', 'input', 'select'],
    registryDependencies: ['group', 'input', 'select']
  },
  'p-group-19': {
    description: 'Group with input and select',
    tags: ['group', 'input', 'select'],
    registryDependencies: ['group', 'input', 'select']
  },
  'p-group-20': {
    description: 'Group with input and text button',
    tags: ['button', 'group', 'input'],
    registryDependencies: ['button', 'group', 'input']
  },
  'p-group-22': {
    description: 'Group with two number inputs for range',
    tags: ['group', 'label', 'number-field'],
    registryDependencies: ['group', 'label', 'number-field']
  },
  'p-group-23': {
    description: 'Group with filter label, combobox multi-select, and remove button',
    tags: ['avatar', 'badge', 'button', 'combobox', 'group'],
    registryDependencies: ['avatar', 'badge', 'button', 'combobox', 'group']
  },
  'p-input-1': {
    description: 'Basic input',
    tags: ['input'],
    registryDependencies: ['input'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-input-2': {
    description: 'Small input',
    tags: ['input'],
    registryDependencies: ['input'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-input-3': {
    description: 'Large input',
    tags: ['input'],
    registryDependencies: ['input'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-input-4': {
    description: 'Disabled input',
    tags: ['input'],
    registryDependencies: ['input'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-input-5': {
    description: 'File input',
    tags: ['input'],
    registryDependencies: ['input'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-input-6': {
    description: 'Input with label',
    tags: ['input', 'label'],
    registryDependencies: ['input', 'label'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-input-7': {
    description: 'Input with button using Group',
    tags: ['button', 'group', 'input'],
    registryDependencies: ['button', 'group', 'input'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-input-8': {
    description: 'Input with start text and end tooltip',
    tags: ['button', 'input', 'input-group', 'popover'],
    registryDependencies: ['button', 'input-group', 'popover'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-input-9': {
    description: 'Password input with toggle visibility',
    tags: ['button', 'input', 'input-group', 'tooltip'],
    registryDependencies: ['button', 'input-group', 'tooltip'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-input-10': {
    description: 'Input group mimicking a URL bar',
    tags: ['button', 'input', 'input-group', 'popover'],
    registryDependencies: ['button', 'input-group', 'popover'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-input-11': {
    description: 'Input group with keyboard shortcut',
    tags: ['input', 'input-group', 'kbd', 'search'],
    registryDependencies: ['input-group', 'kbd'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-input-12': {
    description: 'Input group with start loading spinner',
    tags: ['input', 'input-group', 'spinner', 'loading'],
    registryDependencies: ['input-group', 'spinner'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-input-13': {
    description: 'Input with label and required indicator',
    tags: ['input', 'label'],
    registryDependencies: ['input', 'label'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-input-14': {
    description: 'Input with optional label',
    tags: ['input', 'label'],
    registryDependencies: ['input', 'label'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-input-15': {
    description: 'Input with custom border and background',
    tags: ['input'],
    registryDependencies: ['input'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-input-16': {
    description: 'Input group with end loading spinner',
    tags: ['input', 'input-group', 'spinner', 'loading'],
    registryDependencies: ['input-group', 'spinner'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-input-17': {
    description: 'Read-only input',
    tags: ['input'],
    registryDependencies: ['input'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-otp-field-1': {
    description: 'Basic OTP field',
    tags: ['otp-field', 'input'],
    registryDependencies: ['otp-field']
  },
  'p-otp-field-2': {
    description: 'Large OTP field',
    tags: ['otp-field', 'input'],
    registryDependencies: ['otp-field']
  },
  'p-otp-field-3': {
    description: 'OTP field with separator',
    tags: ['otp-field', 'input'],
    registryDependencies: ['otp-field']
  },
  'p-otp-field-4': {
    description: 'OTP field with label',
    tags: ['otp-field', 'input', 'field'],
    registryDependencies: ['otp-field', 'field']
  },
  'p-otp-field-6': {
    description: 'OTP field with custom sanitization',
    tags: ['otp-field', 'input', 'field', 'validation'],
    registryDependencies: ['otp-field', 'field']
  },
  'p-otp-field-7': {
    description: 'OTP field with auto validation',
    tags: ['otp-field', 'input', 'validation'],
    registryDependencies: ['otp-field', 'field']
  },
  'p-otp-field-8': {
    description: 'Alphanumeric OTP field',
    tags: ['otp-field', 'input', 'field'],
    registryDependencies: ['otp-field', 'field']
  },
  'p-otp-field-9': {
    description: 'OTP field with placeholder hints',
    tags: ['otp-field', 'input', 'field'],
    registryDependencies: ['otp-field', 'field']
  },
  'p-otp-field-10': {
    description: 'Masked OTP field',
    tags: ['otp-field', 'input', 'field'],
    registryDependencies: ['otp-field', 'field']
  },
  'p-input-group-1': {
    description: 'Basic input group',
    tags: ['input-group'],
    registryDependencies: ['input-group'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-input-group-2': {
    description: 'Input group with end icon',
    tags: ['input-group'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['input-group'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-input-group-3': {
    description: 'Input group with start text',
    tags: ['input-group'],
    registryDependencies: ['input-group'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-input-group-4': {
    description: 'Input group with end text',
    tags: ['input-group'],
    registryDependencies: ['input-group'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-input-group-5': {
    description: 'Input group with start and end text',
    tags: ['input-group'],
    registryDependencies: ['input-group'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-input-group-6': {
    description: 'Input group with number field',
    tags: ['input-group', 'number-field'],
    registryDependencies: ['input-group', 'number-field'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-input-group-7': {
    description: 'Input group with end tooltip',
    tags: ['input-group', 'tooltip'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['button', 'input-group', 'popover'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-input-group-8': {
    description: 'Input group with icon button',
    tags: ['button', 'input-group'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['button', 'input-group', 'tooltip', 'use-copy-to-clipboard'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-input-group-9': {
    description: 'Input group with button',
    tags: ['button', 'input-group'],
    registryDependencies: ['button', 'input-group'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-input-group-10': {
    description: 'Input group with badge',
    tags: ['badge', 'input-group'],
    registryDependencies: ['badge', 'input-group'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-input-group-11': {
    description: 'Input group with keyboard shortcut',
    tags: ['input-group', 'kbd'],
    registryDependencies: ['input-group', 'kbd'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-input-group-12': {
    description: 'Input group with inner label',
    tags: ['input-group', 'label'],
    registryDependencies: ['button', 'input-group', 'label', 'popover'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-input-group-13': {
    description: 'Small input group',
    tags: ['input-group'],
    registryDependencies: ['input-group'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-input-group-14': {
    description: 'Large input group',
    tags: ['input-group'],
    registryDependencies: ['input-group'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-input-group-15': {
    description: 'Disabled input group',
    tags: ['input-group'],
    registryDependencies: ['button', 'input-group'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-input-group-16': {
    description: 'Input group with loading spinner',
    tags: ['input-group', 'spinner'],
    registryDependencies: ['input-group', 'spinner'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-input-group-17': {
    description: 'Input group with textarea',
    tags: ['input-group', 'textarea'],
    registryDependencies: ['button', 'input-group', 'menu', 'tooltip'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-80' }
  },
  'p-input-group-18': {
    description: 'Input group with badge and menu',
    tags: ['badge', 'dropdown', 'input-group', 'menu'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['badge', 'button', 'input-group', 'menu'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-input-group-19': {
    description: 'Mini editor built with input group and toggle',
    tags: ['button', 'input-group', 'textarea', 'toggle'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['button', 'input-group', 'toggle'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-80' }
  },
  'p-input-group-20': {
    description: 'Input group with search icon',
    tags: ['input', 'input-group', 'search'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['input-group'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-input-group-21': {
    description: 'Input group with start tooltip',
    tags: ['button', 'input', 'input-group', 'tooltip'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['button', 'input-group', 'tooltip'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-input-group-22': {
    description: 'Input group with clear button',
    tags: ['button', 'input', 'input-group'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['button', 'input-group'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-input-group-23': {
    description: 'Search input group with loader and voice button',
    tags: ['button', 'input', 'input-group', 'search', 'tooltip'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['button', 'input-group', 'tooltip'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-input-group-24': {
    description: 'Input group with character counter',
    tags: ['input', 'input-group'],
    registryDependencies: ['input-group'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-input-18': {
    description: 'Input with characters remaining counter',
    tags: ['field', 'input'],
    registryDependencies: ['field', 'input'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-input-19': {
    description: 'Pill-shaped input',
    tags: ['input'],
    registryDependencies: ['input'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-input-group-26': {
    description: 'Password input with strength indicator',
    tags: ['button', 'input', 'input-group', 'label'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['button', 'input-group', 'label'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-input-group-27': {
    description: 'Code snippet input with language selector',
    tags: ['button', 'input-group', 'select', 'textarea', 'tooltip'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['button', 'input-group', 'select', 'tooltip'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-80' }
  },
  'p-input-group-28': {
    description: 'Message composer with attachment buttons',
    tags: ['button', 'input-group', 'textarea', 'tooltip'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['button', 'input-group', 'tooltip'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-80' }
  },
  'p-input-group-29': {
    description: 'Chat input with voice and send buttons',
    tags: ['button', 'input-group', 'textarea', 'tooltip'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['button', 'input-group', 'tooltip'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-80' }
  },
  'p-meter-1': {
    description: 'Basic meter',
    tags: ['meter'],
    registryDependencies: ['meter'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-meter-2': {
    description: 'Simple meter',
    tags: ['meter'],
    registryDependencies: ['meter'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-meter-3': {
    description: 'Meter with formatted value',
    tags: ['meter'],
    registryDependencies: ['meter'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-meter-4': {
    description: 'Meter with range',
    tags: ['meter'],
    registryDependencies: ['meter'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-menu-1': {
    description: 'Basic menu',
    tags: ['dropdown', 'menu'],
    registryDependencies: ['button', 'menu']
  },
  'p-menu-2': {
    description: 'Menu with hover',
    tags: ['dropdown', 'menu'],
    registryDependencies: ['button', 'menu']
  },
  'p-menu-3': {
    description: 'Menu with checkbox',
    tags: ['dropdown', 'menu'],
    registryDependencies: ['button', 'menu']
  },
  'p-menu-9': {
    description: 'Menu with checkbox items as switches',
    tags: ['dropdown', 'menu', 'switch'],
    registryDependencies: ['button', 'menu']
  },
  'p-menu-4': {
    description: 'Menu with radio group',
    tags: ['dropdown', 'menu'],
    registryDependencies: ['button', 'menu']
  },
  'p-menu-5': {
    description: 'Menu with link',
    tags: ['dropdown', 'menu'],
    registryDependencies: ['button', 'menu']
  },
  'p-menu-6': {
    description: 'Menu with group labels',
    tags: ['dropdown', 'menu'],
    registryDependencies: ['button', 'menu']
  },
  'p-menu-7': {
    description: 'Nested menu',
    tags: ['dropdown', 'menu'],
    registryDependencies: ['button', 'menu']
  },
  'p-menu-8': {
    description: 'Menu close on click',
    tags: ['dropdown', 'menu'],
    registryDependencies: ['button', 'menu']
  },
  'p-context-menu-1': {
    description: 'Basic context menu',
    tags: ['context-menu', 'menu'],
    registryDependencies: ['context-menu'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-sm' }
  },
  'p-context-menu-2': {
    description: 'Context menu with link items',
    tags: ['context-menu', 'menu'],
    registryDependencies: ['context-menu'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-sm' }
  },
  'p-context-menu-3': {
    description: 'Nested context menu',
    tags: ['context-menu', 'menu'],
    registryDependencies: ['context-menu'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-sm' }
  },
  'p-context-menu-4': {
    description: 'Context menu with checkbox items',
    tags: ['context-menu', 'menu'],
    registryDependencies: ['context-menu'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-sm' }
  },
  'p-context-menu-5': {
    description: 'Context menu with group labels',
    tags: ['context-menu', 'menu'],
    registryDependencies: ['context-menu'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-sm' }
  },
  'p-context-menu-6': {
    description: 'Context menu with icons',
    tags: ['context-menu', 'menu'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['context-menu'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-sm' }
  },
  'p-context-menu-7': {
    description: 'Context menu with radio group',
    tags: ['context-menu', 'menu'],
    registryDependencies: ['context-menu'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-sm' }
  },
  'p-context-menu-8': {
    description: 'Context menu with switch checkbox items',
    tags: ['context-menu', 'menu', 'switch'],
    registryDependencies: ['context-menu'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-sm' }
  },
  'p-number-field-1': {
    description: 'Basic number field',
    tags: ['number-field', 'input'],
    registryDependencies: ['number-field'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-number-field-2': {
    description: 'Small number field',
    tags: ['number-field', 'input'],
    registryDependencies: ['number-field'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-number-field-3': {
    description: 'Large number field',
    tags: ['number-field', 'input'],
    registryDependencies: ['number-field'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-number-field-4': {
    description: 'Disabled number field',
    tags: ['number-field', 'input'],
    registryDependencies: ['number-field'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-number-field-5': {
    description: 'Number field with label',
    tags: ['number-field', 'input'],
    registryDependencies: ['label', 'number-field'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-number-field-6': {
    description: 'Number field with scrub',
    tags: ['number-field', 'input'],
    registryDependencies: ['number-field'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-number-field-7': {
    description: 'Number field with range',
    tags: ['number-field', 'input'],
    registryDependencies: ['number-field'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-number-field-8': {
    description: 'Number field with formatted value',
    tags: ['number-field', 'input'],
    registryDependencies: ['number-field'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-number-field-9': {
    description: 'Number field with step',
    tags: ['number-field', 'input'],
    registryDependencies: ['number-field'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-number-field-10': {
    description: 'Number field in form',
    tags: ['number-field', 'input', 'form', 'field', 'zod'],
    npmDependencies: ['zod'],
    registryDependencies: ['button', 'field', 'form', 'number-field'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-number-field-11': {
    description: 'Pill-shaped number field',
    tags: ['number-field', 'input'],
    registryDependencies: ['number-field'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-pagination-1': {
    description: 'Pagination example',
    tags: ['pagination'],
    registryDependencies: ['pagination']
  },
  'p-pagination-2': {
    description: 'Pagination with previous and next buttons only',
    tags: ['pagination'],
    registryDependencies: ['button', 'pagination'],
    meta: { class: '**:data-[slot=preview]:w-full' }
  },
  'p-pagination-3': {
    description: 'Pagination with select, and previous and next buttons',
    tags: ['pagination', 'select'],
    registryDependencies: ['button', 'pagination', 'select'],
    meta: { class: '**:data-[slot=preview]:w-full' }
  },
  'p-popover-1': {
    description: 'Popover with a form',
    tags: ['button', 'field', 'form', 'popover', 'textarea'],
    registryDependencies: ['button', 'field', 'form', 'popover', 'textarea']
  },
  'p-popover-2': {
    description: 'Popover with close button',
    tags: ['button', 'popover'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['button', 'popover']
  },
  'p-popover-3': {
    description: 'Animated popovers',
    tags: ['avatar', 'button', 'popover'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['avatar', 'button', 'popover']
  },
  'p-preview-card-1': {
    description: 'Preview card with popup',
    tags: ['preview-card'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['button', 'preview-card']
  },
  'p-progress-1': {
    description: 'Basic progress bar',
    tags: ['progress'],
    registryDependencies: ['progress'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-progress-2': {
    description: 'Progress with label and value',
    tags: ['progress'],
    registryDependencies: ['progress'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-progress-3': {
    description: 'Progress with formatted value',
    tags: ['progress'],
    registryDependencies: ['progress'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-radio-group-1': {
    description: 'Basic radio group',
    tags: ['radio-group'],
    registryDependencies: ['label', 'radio-group']
  },
  'p-radio-group-2': {
    description: 'Disabled radio group',
    tags: ['radio-group'],
    registryDependencies: ['label', 'radio-group']
  },
  'p-radio-group-3': {
    description: 'Radio group with description',
    tags: ['radio-group'],
    registryDependencies: ['label', 'radio-group']
  },
  'p-radio-group-4': {
    description: 'Radio group card',
    tags: ['radio-group'],
    registryDependencies: ['label', 'radio-group']
  },
  'p-radio-group-5': {
    description: 'Radio group in form',
    tags: ['radio-group', 'form'],
    registryDependencies: ['button', 'field', 'fieldset', 'form', 'radio-group']
  },
  'p-radio-group-6': {
    description: 'Theme selector with image cards',
    tags: ['radio-group', 'form'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['field', 'fieldset', 'radio-group'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-[320px]' }
  },
  'p-scroll-area-1': {
    description: 'Basic scroll area',
    tags: ['scroll-area'],
    registryDependencies: ['scroll-area'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-scroll-area-2': {
    description: 'Horizontal scroll area',
    tags: ['scroll-area'],
    registryDependencies: ['scroll-area']
  },
  'p-scroll-area-3': {
    description: 'Scroll area with both directions',
    tags: ['scroll-area'],
    registryDependencies: ['scroll-area']
  },
  'p-scroll-area-4': {
    description: 'Scroll area with fading edges',
    tags: ['scroll-area'],
    registryDependencies: ['scroll-area'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-scroll-area-5': {
    description: 'Horizontal scroll area with scrollbar gutter',
    tags: ['scroll-area'],
    registryDependencies: ['scroll-area']
  },
  'p-select-1': {
    description: 'Basic select',
    tags: ['select'],
    registryDependencies: ['select'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-select-2': {
    description: 'Small select',
    tags: ['select'],
    registryDependencies: ['select'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-select-3': {
    description: 'Large select',
    tags: ['select'],
    registryDependencies: ['select'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-select-4': {
    description: 'Disabled select',
    tags: ['select'],
    registryDependencies: ['select'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-select-5': {
    description: 'Select without item alignment',
    tags: ['select'],
    registryDependencies: ['select'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-select-6': {
    description: 'Select with groups',
    tags: ['select'],
    registryDependencies: ['select'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-select-7': {
    description: 'Multiple select',
    tags: ['select'],
    registryDependencies: ['select'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-select-8': {
    description: 'Select with icon',
    tags: ['select'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['select'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-select-9': {
    description: 'Select options with icon',
    tags: ['select'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['select'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-select-10': {
    description: 'Select with object values',
    tags: ['select'],
    registryDependencies: ['select'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-select-12': {
    description: 'Select with disabled items',
    tags: ['select', 'disabled'],
    registryDependencies: ['select'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-select-13': {
    description: 'Timezone select',
    tags: ['select', 'time', 'timezone'],
    registryDependencies: ['select'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-select-14': {
    description: 'Status select with colored dot',
    tags: ['select'],
    registryDependencies: ['select'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-select-15': {
    description: 'Pill-shaped select trigger',
    tags: ['select'],
    registryDependencies: ['select'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-select-16': {
    description: 'Select with left text label',
    tags: ['select'],
    registryDependencies: ['select'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-select-17': {
    description: 'Select with country flags',
    tags: ['select'],
    registryDependencies: ['select'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-select-18': {
    description: 'Select with description in options only',
    tags: ['select'],
    registryDependencies: ['select'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-select-19': {
    description: 'Select with avatars',
    tags: ['select', 'avatar'],
    registryDependencies: ['avatar', 'select'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-select-20': {
    description: 'Rich select with avatars and usernames',
    tags: ['select', 'avatar'],
    registryDependencies: ['avatar', 'select'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-select-21': {
    description: 'Auto width select',
    tags: ['select'],
    registryDependencies: ['select']
  },
  'p-select-22': {
    description: 'Select with custom border and background',
    tags: ['select'],
    registryDependencies: ['select'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-select-23': {
    description: 'Select with label',
    tags: ['select'],
    registryDependencies: ['select'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-select-11': {
    description: 'Select in form',
    tags: ['select'],
    registryDependencies: ['button', 'field', 'form', 'select'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-separator-1': {
    description: 'Separator with horizontal and vertical orientations',
    tags: ['separator'],
    registryDependencies: ['separator']
  },
  'p-sheet-1': {
    description: 'Basic sheet',
    tags: ['sheet'],
    registryDependencies: ['button', 'field', 'form', 'input', 'sheet']
  },
  'p-sheet-2': {
    description: 'Sheet inset',
    tags: ['sheet'],
    registryDependencies: ['button', 'field', 'form', 'input', 'sheet']
  },
  'p-sheet-3': {
    description: 'Sheet position',
    tags: ['sheet'],
    registryDependencies: ['button', 'sheet']
  },
  'p-skeleton-1': {
    description: 'Basic skeleton',
    tags: ['skeleton'],
    registryDependencies: ['avatar', 'button', 'skeleton'],
    meta: {
      class:
        '**:data-[slot=preview]:w-full **:data-[slot=preview]:flex **:data-[slot=preview]:justify-center'
    }
  },
  'p-skeleton-2': {
    description: 'Skeleton only',
    tags: ['skeleton'],
    registryDependencies: ['skeleton'],
    meta: {
      class:
        '**:data-[slot=preview]:w-full **:data-[slot=preview]:flex **:data-[slot=preview]:justify-center'
    }
  },
  'p-slider-1': {
    description: 'Basic slider',
    tags: ['slider'],
    registryDependencies: ['slider'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-slider-2': {
    description: 'Slider with label and value',
    tags: ['slider'],
    registryDependencies: ['field', 'slider'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-slider-3': {
    description: 'Disabled slider',
    tags: ['slider', 'disabled'],
    registryDependencies: ['slider'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-slider-4': {
    description: 'Slider with reference labels',
    tags: ['slider'],
    registryDependencies: ['slider'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-slider-5': {
    description: 'Slider with ticks',
    tags: ['slider'],
    registryDependencies: ['slider'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-slider-6': {
    description: 'Slider with labels above',
    tags: ['slider'],
    registryDependencies: ['slider'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-slider-7': {
    description: 'Range slider',
    tags: ['slider'],
    registryDependencies: ['slider'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-slider-8': {
    description: 'Slider with 3 thumbs',
    tags: ['slider'],
    registryDependencies: ['slider'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-slider-9': {
    description: 'Range slider with collision behavior none',
    tags: ['slider'],
    registryDependencies: ['slider'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-slider-10': {
    description: 'Range slider with collision behavior swap',
    tags: ['slider'],
    registryDependencies: ['slider'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-slider-11': {
    description: 'Slider with icons',
    tags: ['slider'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['field', 'slider'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-slider-12': {
    description: 'Slider with input',
    tags: ['slider', 'number-field'],
    registryDependencies: ['number-field', 'slider'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-slider-13': {
    description: 'Range slider with inputs',
    tags: ['slider', 'number-field'],
    registryDependencies: ['number-field', 'slider'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-slider-14': {
    description: 'Slider with increment and decrement buttons',
    tags: ['slider', 'button'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['button', 'field', 'slider'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-slider-15': {
    description: 'Price range slider',
    tags: ['slider'],
    registryDependencies: ['fieldset', 'slider'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-slider-16': {
    description: 'Emoji rating slider',
    tags: ['slider'],
    registryDependencies: ['field', 'slider'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-slider-17': {
    description: 'Vertical slider',
    tags: ['slider'],
    registryDependencies: ['slider']
  },
  'p-slider-18': {
    description: 'Vertical range slider',
    tags: ['slider'],
    registryDependencies: ['slider']
  },
  'p-slider-19': {
    description: 'Vertical slider with input',
    tags: ['slider', 'number-field'],
    registryDependencies: ['number-field', 'slider']
  },
  'p-slider-20': {
    description: 'Equalizer with vertical sliders',
    tags: ['slider'],
    registryDependencies: ['slider']
  },
  'p-slider-21': {
    description: 'Object position sliders with reset',
    tags: ['slider', 'number-field', 'button'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['button', 'fieldset', 'label', 'number-field', 'slider'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-slider-22': {
    description: 'Price slider with histogram',
    tags: ['slider', 'number-field', 'input-group', 'button', 'filter'],
    registryDependencies: ['button', 'input-group', 'number-field', 'slider'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-slider-23': {
    description: 'Slider in form',
    tags: ['slider', 'form'],
    registryDependencies: ['button', 'field', 'fieldset', 'form', 'slider'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-spinner-1': {
    description: 'Basic spinner',
    tags: ['spinner'],
    registryDependencies: ['spinner']
  },
  'p-switch-1': {
    description: 'Basic switch',
    tags: ['switch'],
    registryDependencies: ['label', 'switch']
  },
  'p-switch-2': {
    description: 'Disabled switch',
    tags: ['switch'],
    registryDependencies: ['label', 'switch']
  },
  'p-switch-3': {
    description: 'Switch with description',
    tags: ['switch'],
    registryDependencies: ['label', 'switch']
  },
  'p-switch-4': {
    description: 'Switch card',
    tags: ['switch'],
    registryDependencies: ['label', 'switch']
  },
  'p-switch-5': {
    description: 'Switch in form',
    tags: ['switch'],
    registryDependencies: ['button', 'field', 'form', 'switch']
  },
  'p-switch-6': {
    description: 'Custom size switch',
    tags: ['switch'],
    registryDependencies: ['switch']
  },
  'p-switch-7': {
    description: 'Weekly availability editor with time range combobox pickers',
    tags: ['switch', 'combobox', 'popover', 'time'],
    npmDependencies: ['lucide-react'],
    registryDependencies: [
      'button',
      'checkbox',
      'checkbox-group',
      'combobox',
      'label',
      'popover',
      'select',
      'switch',
      'tooltip'
    ],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-4xl', colSpan: 2 }
  },
  'p-switch-8': {
    description: 'Weekly availability editor with grouped time range controls',
    tags: ['switch', 'combobox', 'group', 'popover', 'time'],
    npmDependencies: ['lucide-react'],
    registryDependencies: [
      'button',
      'checkbox',
      'checkbox-group',
      'combobox',
      'group',
      'label',
      'popover',
      'switch',
      'tooltip'
    ],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-4xl', colSpan: 2 }
  },
  'p-switch-9': {
    description: 'Weekly availability editor with From/To labeled time groups',
    tags: ['switch', 'combobox', 'group', 'popover', 'time'],
    npmDependencies: ['lucide-react'],
    registryDependencies: [
      'button',
      'checkbox',
      'checkbox-group',
      'combobox',
      'group',
      'label',
      'popover',
      'switch',
      'tooltip'
    ],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-4xl', colSpan: 2 }
  },
  'p-table-1': {
    description: 'Basic table',
    tags: ['table'],
    registryDependencies: ['badge', 'table'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-4xl', colSpan: 2 }
  },
  'p-table-2': {
    description: 'Frame with card-style table',
    tags: ['frame', 'table'],
    registryDependencies: ['badge', 'frame', 'table'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-4xl', colSpan: 2 }
  },
  'p-table-3': {
    description: 'Table with TanStack Table and checkboxes',
    tags: ['checkbox', 'table', 'tanstack'],
    npmDependencies: ['@tanstack/react-table'],
    registryDependencies: ['badge', 'checkbox', 'frame', 'table'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-4xl', colSpan: 2 }
  },
  'p-table-4': {
    description: 'Table with TanStack Table, sorting, and pagination',
    tags: ['checkbox', 'pagination', 'select', 'table', 'tanstack'],
    npmDependencies: ['@tanstack/react-table', 'lucide-react'],
    registryDependencies: ['badge', 'button', 'checkbox', 'frame', 'pagination', 'select', 'table'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-4xl', colSpan: 2 }
  },
  'p-table-5': {
    description: 'Card-style table variant',
    tags: ['table'],
    registryDependencies: ['badge', 'table'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-4xl', colSpan: 2 }
  },
  'p-table-7': {
    description: 'CardFrame with card-style table',
    tags: ['card', 'table'],
    registryDependencies: ['badge', 'card', 'table'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-4xl', colSpan: 2 }
  },
  'p-table-6': {
    description: 'CardFrame with TanStack Table and checkboxes',
    tags: ['card', 'checkbox', 'table', 'tanstack'],
    npmDependencies: ['@tanstack/react-table'],
    registryDependencies: ['badge', 'card', 'checkbox', 'table'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-4xl', colSpan: 2 }
  },
  'p-table-8': {
    description: 'CardFrame with TanStack Table, sorting, and pagination',
    tags: ['card', 'checkbox', 'pagination', 'select', 'table', 'tanstack'],
    npmDependencies: ['@tanstack/react-table', 'lucide-react'],
    registryDependencies: ['badge', 'button', 'card', 'checkbox', 'pagination', 'select', 'table'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-4xl', colSpan: 2 }
  },
  'p-tabs-1': {
    description: 'Basic tabs',
    tags: ['tabs'],
    registryDependencies: ['tabs']
  },
  'p-tabs-2': {
    description: 'Tabs with underline',
    tags: ['tabs'],
    registryDependencies: ['tabs']
  },
  'p-tabs-3': {
    description: 'Vertical tabs',
    tags: ['tabs'],
    registryDependencies: ['tabs'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-80' }
  },
  'p-tabs-4': {
    description: 'Vertical tabs with underline',
    tags: ['tabs'],
    registryDependencies: ['tabs'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-80' }
  },
  'p-tabs-5': {
    description: 'Tabs with full rounded triggers',
    tags: ['tabs'],
    registryDependencies: ['tabs']
  },
  'p-tabs-6': {
    description: 'Tabs with icon before name',
    tags: ['tabs'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['tabs']
  },
  'p-tabs-7': {
    description: 'Tabs with icon before name and underline',
    tags: ['tabs'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['tabs']
  },
  'p-tabs-8': {
    description: 'Tabs with icon only',
    tags: ['tabs'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['tabs']
  },
  'p-tabs-9': {
    description: 'Tabs with underline and icon on top',
    tags: ['tabs'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['tabs']
  },
  'p-tabs-10': {
    description: 'Tabs with count badge',
    tags: ['tabs', 'badge'],
    registryDependencies: ['badge', 'tabs']
  },
  'p-tabs-11': {
    description: 'Vertical tabs with underline and icon before name',
    tags: ['tabs'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['tabs'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-80' }
  },
  'p-tabs-12': {
    description: 'Tabs with icon only and count badge',
    tags: ['tabs', 'badge'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['badge', 'tabs']
  },
  'p-tabs-13': {
    description: 'Tabs with icon only and grouped tooltips',
    tags: ['tabs', 'tooltip'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['tabs', 'tooltip']
  },
  'p-textarea-1': {
    description: 'Basic textarea',
    tags: ['textarea'],
    registryDependencies: ['textarea'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-textarea-2': {
    description: 'Small textarea',
    tags: ['textarea'],
    registryDependencies: ['textarea'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-textarea-3': {
    description: 'Large textarea',
    tags: ['textarea'],
    registryDependencies: ['textarea'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-textarea-4': {
    description: 'Disabled textarea',
    tags: ['textarea'],
    registryDependencies: ['textarea'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-textarea-5': {
    description: 'Textarea with label',
    tags: ['textarea'],
    registryDependencies: ['label', 'textarea'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-textarea-6': {
    description: 'Textarea in form',
    tags: ['textarea'],
    registryDependencies: ['button', 'field', 'form', 'textarea'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-textarea-7': {
    description: 'Textarea with label and required indicator',
    tags: ['label', 'textarea'],
    registryDependencies: ['label', 'textarea'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-textarea-8': {
    description: 'Textarea with optional label',
    tags: ['label', 'textarea'],
    registryDependencies: ['label', 'textarea'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-textarea-9': {
    description: 'Textarea with custom border and background',
    tags: ['textarea'],
    registryDependencies: ['textarea'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-textarea-10': {
    description: 'Read-only textarea',
    tags: ['textarea'],
    registryDependencies: ['textarea'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-textarea-11': {
    description: 'Textarea with characters remaining counter',
    tags: ['field', 'textarea'],
    registryDependencies: ['field', 'textarea'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-textarea-12': {
    description: 'Textarea field with required indicator',
    tags: ['field', 'label', 'textarea'],
    registryDependencies: ['field', 'textarea'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-textarea-13': {
    description: 'Shorter textarea with fixed height',
    tags: ['textarea'],
    registryDependencies: ['textarea'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-textarea-14': {
    description: 'Textarea with button aligned right',
    tags: ['button', 'textarea'],
    registryDependencies: ['button', 'textarea'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-textarea-15': {
    description: 'Textarea with button aligned left',
    tags: ['button', 'textarea'],
    registryDependencies: ['button', 'textarea'],
    meta: { class: '**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64' }
  },
  'p-toast-1': {
    description: 'Default stacked toast with title and description',
    tags: ['toast'],
    registryDependencies: ['button', 'toast']
  },
  'p-toast-2': {
    description: 'Stacked toasts by semantic type (success, error, info, warning)',
    tags: ['toast'],
    registryDependencies: ['button', 'toast']
  },
  'p-toast-3': {
    description: 'Loading-state stacked toast',
    tags: ['toast'],
    registryDependencies: ['button', 'toast']
  },
  'p-toast-4': {
    description: 'Stacked toast with primary action (undo)',
    tags: ['toast'],
    registryDependencies: ['button', 'toast']
  },
  'p-toast-5': {
    description: 'Promise-based stacked toast',
    tags: ['toast'],
    registryDependencies: ['button', 'toast']
  },
  'p-toast-6': {
    description: 'Stacked toasts with varying content height',
    tags: ['toast'],
    registryDependencies: ['button', 'toast']
  },
  'p-toast-7': {
    description: 'Anchored tooltip-style toast after copy',
    tags: ['toast'],
    registryDependencies: ['button', 'toast', 'tooltip', 'use-copy-to-clipboard']
  },
  'p-toast-8': {
    description: 'Anchored error toast after async failure',
    tags: ['toast'],
    registryDependencies: ['button', 'spinner', 'toast']
  },
  'p-toast-9': {
    description: 'Long-running promise toast with cancel',
    tags: ['toast', 'button'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['button', 'toast']
  },
  'p-toast-10': {
    description: 'Deduplicated success toast',
    tags: ['toast', 'button'],
    registryDependencies: ['button', 'toast']
  },
  'p-toast-11': {
    description: 'Deduplicated error toast',
    tags: ['toast', 'button', 'error'],
    registryDependencies: ['button', 'toast']
  },
  'p-toast-12': {
    description: 'Anchored deduplicated success toast',
    tags: ['toast', 'button'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['button', 'toast', 'tooltip']
  },
  'p-toast-13': {
    description: 'Anchored deduplicated error toast',
    tags: ['toast', 'button', 'error'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['button', 'toast', 'tooltip']
  },
  'p-toggle-group-1': {
    description: 'Basic toggle group',
    tags: ['toggle', 'toggle-group'],
    registryDependencies: ['toggle-group']
  },
  'p-toggle-group-2': {
    description: 'Small toggle group',
    tags: ['toggle', 'toggle-group'],
    registryDependencies: ['toggle-group']
  },
  'p-toggle-group-3': {
    description: 'Large toggle group',
    tags: ['toggle', 'toggle-group'],
    registryDependencies: ['toggle-group']
  },
  'p-toggle-group-4': {
    description: 'Toggle group with outline',
    tags: ['toggle', 'toggle-group'],
    registryDependencies: ['toggle-group']
  },
  'p-toggle-group-5': {
    description: 'Vertical toggle group with outline',
    tags: ['toggle', 'toggle-group'],
    registryDependencies: ['toggle-group']
  },
  'p-toggle-group-6': {
    description: 'Disabled toggle group',
    tags: ['toggle', 'toggle-group'],
    registryDependencies: ['toggle-group']
  },
  'p-toggle-group-7': {
    description: 'Toggle group with disabled item',
    tags: ['toggle', 'toggle-group'],
    registryDependencies: ['toggle-group']
  },
  'p-toggle-group-8': {
    description: 'Multiple selection toggle group',
    tags: ['toggle', 'toggle-group'],
    registryDependencies: ['toggle-group']
  },
  'p-toggle-group-9': {
    description: 'Toggle group with tooltips',
    tags: ['toggle', 'toggle-group'],
    registryDependencies: ['toggle-group', 'tooltip']
  },
  'p-toggle-1': {
    description: 'Basic toggle',
    tags: ['toggle'],
    registryDependencies: ['toggle']
  },
  'p-toggle-2': {
    description: 'Toggle with outline',
    tags: ['toggle'],
    registryDependencies: ['toggle']
  },
  'p-toggle-3': {
    description: 'Toggle with icon',
    tags: ['toggle'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['toggle']
  },
  'p-toggle-4': {
    description: 'Small toggle',
    tags: ['toggle'],
    registryDependencies: ['toggle']
  },
  'p-toggle-5': {
    description: 'Large toggle',
    tags: ['toggle'],
    registryDependencies: ['toggle']
  },
  'p-toggle-6': {
    description: 'Disabled toggle',
    tags: ['toggle'],
    registryDependencies: ['toggle']
  },
  'p-toggle-7': {
    description: 'Toggle icon group',
    tags: ['toggle'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['toggle']
  },
  'p-toggle-8': {
    description: 'Bookmark toggle with tooltip and success toast',
    tags: ['toggle', 'tooltip', 'toast'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['toggle', 'tooltip', 'toast']
  },
  'p-toolbar-1': {
    description: 'Toolbar with toggles, buttons, and select',
    tags: ['toolbar'],
    npmDependencies: ['lucide-react'],
    registryDependencies: ['button', 'select', 'toggle-group', 'toolbar', 'tooltip']
  },
  'p-tooltip-1': {
    description: 'Basic tooltip',
    tags: ['tooltip'],
    registryDependencies: ['button', 'tooltip']
  },
  'p-tooltip-2': {
    description: 'Grouped tooltips',
    tags: ['tooltip'],
    registryDependencies: ['toggle-group', 'tooltip']
  },
  'p-tooltip-3': {
    description: 'Toggle group animated tooltip',
    tags: ['tooltip'],
    registryDependencies: ['toggle-group', 'tooltip']
  },
  'p-tooltip-4': {
    description: 'Vertical group with animated tooltip',
    tags: ['tooltip'],
    registryDependencies: ['button', 'group', 'tooltip']
  },
  'p-aspect-ratio-1': {
    description: 'Ratio 1:1',
    tags: ['aspect-ratio'],
    registryDependencies: ['aspect-ratio'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-aspect-ratio-2': {
    description: 'Ratio 9:16',
    tags: ['aspect-ratio'],
    registryDependencies: ['aspect-ratio'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-aspect-ratio-3': {
    description: 'Ratio 16:9',
    tags: ['aspect-ratio'],
    registryDependencies: ['aspect-ratio'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-aspect-ratio-4': {
    description: 'Ratio 21:9',
    tags: ['aspect-ratio'],
    registryDependencies: ['aspect-ratio'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-timeline-1': {
    description: 'Ratio 1:1',
    tags: ['timeline'],
    registryDependencies: ['timeline'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-timeline-2': {
    description: 'Ratio 1:1',
    tags: ['timeline'],
    registryDependencies: ['timeline'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-timeline-3': {
    description: 'Ratio 1:1',
    tags: ['timeline'],
    registryDependencies: ['timeline'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-timeline-4': {
    description: 'Ratio 1:1',
    tags: ['timeline'],
    registryDependencies: ['timeline'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-timeline-5': {
    description: 'Ratio 1:1',
    tags: ['timeline'],
    registryDependencies: ['timeline'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-timeline-6': {
    description: 'Ratio 1:1',
    tags: ['timeline'],
    registryDependencies: ['timeline'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-timeline-7': {
    description: 'Ratio 1:1',
    tags: ['timeline'],
    registryDependencies: ['timeline'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-timeline-8': {
    description: 'Ratio 1:1',
    tags: ['timeline'],
    registryDependencies: ['timeline'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-timeline-9': {
    description: 'Ratio 1:1',
    tags: ['timeline'],
    registryDependencies: ['timeline'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-timeline-10': {
    description: 'Ratio 1:1',
    tags: ['timeline'],
    registryDependencies: ['timeline'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-timeline-11': {
    description: 'Ratio 1:1',
    tags: ['timeline'],
    registryDependencies: ['timeline'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-timeline-12': {
    description: 'Ratio 1:1',
    tags: ['timeline'],
    registryDependencies: ['timeline'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-rich-editor-1': {
    description: 'Basic rich editor examples',
    tags: ['rich-editor'],
    registryDependencies: ['rich-editor'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-stepper-1': {
    description: 'Basic stepper examples',
    tags: ['stepper'],
    registryDependencies: ['stepper'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-4xl', colSpan: 2 }
  },
  'p-stepper-2': {
    description: 'Stepper with numbers only',
    tags: ['stepper'],
    registryDependencies: ['stepper'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-4xl', colSpan: 2 }
  },
  'p-stepper-3': {
    description: 'Stepper with numbers and checkmarks',
    tags: ['stepper'],
    registryDependencies: ['stepper'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-4xl', colSpan: 2 }
  },
  'p-stepper-4': {
    description: 'Stepper with tiny buttons and checkmarks',
    tags: ['stepper'],
    registryDependencies: ['stepper'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-4xl', colSpan: 2 }
  },
  'p-stepper-5': {
    description: 'Controlled stepper with checkmarks',
    tags: ['stepper'],
    registryDependencies: ['stepper'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-4xl', colSpan: 2 }
  },
  'p-stepper-6': {
    description: 'Controlled stepper with checkmarks and loading state',
    tags: ['stepper'],
    registryDependencies: ['stepper'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-4xl', colSpan: 2 }
  },
  'p-stepper-7': {
    description: 'Stepper with mixed elements',
    tags: ['stepper'],
    registryDependencies: ['stepper'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-4xl', colSpan: 2 }
  },
  'p-stepper-8': {
    description: 'Stepper with labels',
    tags: ['stepper'],
    registryDependencies: ['stepper'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-4xl', colSpan: 2 }
  },
  'p-stepper-9': {
    description: 'Paginated stepper',
    tags: ['stepper'],
    registryDependencies: ['stepper'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-4xl', colSpan: 2 }
  },
  'p-stepper-10': {
    description: 'Progress stepper',
    tags: ['stepper'],
    registryDependencies: ['stepper'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-4xl', colSpan: 2 }
  },
  'p-stepper-11': {
    description: 'Stepper with titles and descriptions',
    tags: ['stepper'],
    registryDependencies: ['stepper'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-4xl', colSpan: 2 }
  },
  'p-stepper-12': {
    description: 'Stepper with inline titles',
    tags: ['stepper'],
    registryDependencies: ['stepper'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-4xl', colSpan: 2 }
  },
  'p-stepper-13': {
    description: 'Stepper with inline titles and descriptions',
    tags: ['stepper'],
    registryDependencies: ['stepper'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-stepper-14': {
    description: 'Stepper with inline titles and descriptions (reversed)',
    tags: ['stepper'],
    registryDependencies: ['stepper'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-stepper-15': {
    description: 'Vertical stepper with numbers and checkmarks',
    tags: ['stepper'],
    registryDependencies: ['stepper'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-stepper-16': {
    description: 'Controlled vertical stepper with checkmarks',
    tags: ['stepper'],
    registryDependencies: ['stepper'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-stepper-17': {
    description: 'Vertical stepper with inline titles',
    tags: ['stepper'],
    registryDependencies: ['stepper'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-stepper-18': {
    description: 'Vertical stepper with inline titles and descriptions',
    tags: ['stepper'],
    registryDependencies: ['stepper'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-split-pane-1': {
    description: 'Split pane with resizable panels',
    tags: ['split-pane'],
    registryDependencies: ['split-pane'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-tree-1': {
    description: 'Show a tree structure with nodes and children',
    tags: ['tree'],
    registryDependencies: ['tree'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-tree-2': {
    description: 'Basic tree with vertical lines',
    tags: ['tree'],
    registryDependencies: ['tree'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-tree-3': {
    description: 'Basic tree with icons',
    tags: ['tree'],
    registryDependencies: ['tree'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-tree-4': {
    description: 'Basic tree with caret icon on the right',
    tags: ['tree'],
    registryDependencies: ['tree'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-tree-5': {
    description: 'Tree with multi-select and drag and drop',
    tags: ['tree'],
    registryDependencies: ['tree'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-tree-6': {
    description: 'Tree with renaming (press F2 to rename)',
    tags: ['tree'],
    registryDependencies: ['tree'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-tree-7': {
    description: 'Tree with search highlight',
    tags: ['tree'],
    registryDependencies: ['tree', 'input'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-tree-8': {
    description: 'Tree with filtering',
    tags: ['tree'],
    registryDependencies: ['tree', 'input'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-cropper-1': {
    description: 'Crops images to a specific aspect ratio and size',
    tags: ['cropper'],
    registryDependencies: ['cropper'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-cropper-2': {
    description: 'Basic cropper',
    tags: ['cropper'],
    registryDependencies: ['cropper'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-cropper-3': {
    description: 'Cropper with aspect ratio 16:9',
    tags: ['cropper'],
    registryDependencies: ['cropper'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-cropper-4': {
    description: 'Cropper with custom crop area color',
    tags: ['cropper'],
    registryDependencies: ['cropper'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-cropper-5': {
    description: 'Cropper with custom mask overlay',
    tags: ['cropper'],
    registryDependencies: ['cropper'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-cropper-6': {
    description: 'Cropper with full size crop area',
    tags: ['cropper'],
    registryDependencies: ['cropper'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-cropper-7': {
    description: 'Cropper with full-rounded mask',
    tags: ['cropper'],
    registryDependencies: ['cropper'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-cropper-8': {
    description: 'Cropper with zoom slider',
    tags: ['cropper'],
    registryDependencies: ['cropper', 'slider'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-cropper-9': {
    description: 'Cropper with custom zoom limits',
    tags: ['cropper'],
    registryDependencies: ['cropper'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-cropper-10': {
    description: 'Cropper with crop data output',
    tags: ['cropper'],
    registryDependencies: ['cropper'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-cropper-11': {
    description: 'Cropper with image preview',
    tags: ['cropper'],
    registryDependencies: ['cropper', 'button'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-chart-1': {
    description: 'Radial Chart with Labels',
    tags: ['chart'],
    registryDependencies: ['chart'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-chart-2': {
    description: 'Radial Chart with Text',
    tags: ['chart'],
    registryDependencies: ['chart'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-chart-3': {
    description: 'Radial Chart - Stacked',
    tags: ['chart'],
    registryDependencies: ['chart'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-chart-4': {
    description: 'Radar Chart - Custom Labelp',
    tags: ['chart'],
    registryDependencies: ['chart'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-chart-5': {
    description: 'Area Chart - Axes',
    tags: ['chart'],
    registryDependencies: ['chart'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-chart-6': {
    description: 'Line Chart with Labels',
    tags: ['chart'],
    registryDependencies: ['chart'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-chart-7': {
    description: 'Pie Chart - Interactive',
    tags: ['chart'],
    registryDependencies: ['chart'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-chart-8': {
    description: 'Pie Chart - Custom Label',
    tags: ['chart'],
    registryDependencies: ['chart'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-chart-9': {
    description: 'Bar Chart - Multiple',
    tags: ['chart'],
    registryDependencies: ['chart'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-chart-10': {
    description: 'Bar Chart - Horizontal Mixed',
    tags: ['chart'],
    registryDependencies: ['chart'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-link-preview-1': {
    description: 'A component that displays a preview of a link on mouse hover',
    tags: ['link-preview'],
    registryDependencies: ['link-preview'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-input-100': {
    description: 'Credit card number input with auto-formatting',
    tags: ['input', 'credit-card'],
    registryDependencies: ['input', 'label'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-input-101': {
    description: 'Credit card expiry date input with auto-formatting',
    tags: ['input', 'credit-card'],
    registryDependencies: ['input', 'label'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-input-102': {
    description: 'Credit card CVC/code input with auto-formatting',
    tags: ['input', 'credit-card'],
    registryDependencies: ['input', 'label'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-input-103': {
    description: 'Combined credit card number, expiry, and CVC inputs with auto-formatting',
    tags: ['input', 'credit-card'],
    registryDependencies: ['input', 'label'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-input-147': {
    description: 'Phone number input with country code selection and auto-formatting',
    tags: ['input', 'phone', 'tel'],
    registryDependencies: ['input', 'label'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-file-upload-1': {
    description: 'Basic image uploader',
    tags: ['file-upload'],
    registryDependencies: ['file-upload'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-file-upload-2': {
    description: 'Avatar upload button',
    tags: ['file-upload'],
    registryDependencies: ['file-upload'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-file-upload-3': {
    description: 'Avatar uploader with droppable area',
    tags: ['file-upload'],
    registryDependencies: ['file-upload'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-file-upload-4': {
    description: 'Single image uploader with max size',
    tags: ['file-upload'],
    registryDependencies: ['file-upload'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-file-upload-5': {
    description: 'Single image uploader with max size, drop area and button',
    tags: ['file-upload'],
    registryDependencies: ['file-upload'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-file-upload-6': {
    description: 'Multiple image uploader with image grid',
    tags: ['file-upload'],
    registryDependencies: ['file-upload'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-file-upload-7': {
    description: 'Multiple image uploader with image list',
    tags: ['file-upload'],
    registryDependencies: ['file-upload'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-file-upload-8': {
    description: 'Single file uploader with max size',
    tags: ['file-upload'],
    registryDependencies: ['file-upload'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-file-upload-9': {
    description: 'Multiple files uploader with list',
    tags: ['file-upload'],
    registryDependencies: ['file-upload'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-file-upload-10': {
    description: 'Multiple files uploader with list inside the drop area',
    tags: ['file-upload'],
    registryDependencies: ['file-upload'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-file-upload-11': {
    description: 'Multiple files uploader with table',
    tags: ['file-upload'],
    registryDependencies: ['file-upload', 'button'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-file-upload-12': {
    description: 'Mixed content uploader with card grid',
    tags: ['file-upload'],
    registryDependencies: ['file-upload'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-file-upload-13': {
    description: 'File uploader with simulated progress tracking',
    tags: ['file-upload'],
    registryDependencies: ['file-upload'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  },
  'p-file-upload-14': {
    description: 'Avatar uploader with crop dialog',
    tags: ['file-upload', 'cropper'],
    registryDependencies: ['file-upload', 'cropper', 'dialog'],
    meta: { class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]' }
  }
};

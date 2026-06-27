import type { Component } from 'svelte';

export interface RegistryParticuleEntry {
  component: () => Promise<{ default: Component }>;
  description: string;
  // relative to src/lib/components/
  file: string;
  folder: string;
  name: string;
  npmDependencies: string[];
  registryDependencies: string[];
  // optional tags for categorization
  tags: string[];
}

export type RegistryParticuleData = Record<string, RegistryParticuleEntry>;

type ParticleMeta = {
  description?: string;
  tags?: string[];
  npmDependencies?: string[];
  registryDependencies?: string[];
};

const metadata: Record<string, ParticleMeta> = {
  'p-accordion-1': {
    description: 'Basic accordion',
    tags: ['accordion']
  },
  'p-accordion-2': {
    description: 'Accordion with one panel open',
    tags: ['accordion']
  },
  'p-accordion-3': {
    description: 'Accordion allowing multiple panels open',
    tags: ['accordion']
  },
  'p-accordion-4': {
    description: 'Controlled accordion',
    tags: ['accordion']
  },
  'p-alert-1': {
    description: 'Basic alert',
    tags: ['alert']
  },
  'p-alert-2': {
    description: 'Alert with icon',
    tags: ['alert']
  },
  'p-alert-3': {
    description: 'Alert with icon and action buttons',
    tags: ['alert']
  },
  'p-alert-4': {
    description: 'Info alert',
    tags: ['alert', 'info']
  },
  'p-alert-5': {
    description: 'Success alert',
    tags: ['alert', 'success']
  },
  'p-alert-6': {
    description: 'Warning alert',
    tags: ['alert', 'warning']
  },
  'p-alert-7': {
    description: 'Error alert',
    tags: ['alert', 'error']
  },
  'p-alert-dialog-1': {
    description: 'Alert dialog',
    tags: ['alert dialog', 'dialog']
  },
  'p-alert-dialog-2': {
    description: 'Alert dialog with bare footer',
    tags: ['alert dialog', 'dialog']
  },
  'p-autocomplete-1': {
    description: 'Basic autocomplete',
    tags: ['autocomplete', 'input']
  },
  'p-autocomplete-2': {
    description: 'Disabled autocomplete',
    tags: ['autocomplete', 'input', 'disabled']
  },
  'p-autocomplete-3': {
    description: 'Small autocomplete',
    tags: ['autocomplete', 'input']
  },
  'p-autocomplete-4': {
    description: 'Large autocomplete',
    tags: ['autocomplete', 'input']
  },
  'p-autocomplete-5': {
    description: 'Autocomplete with label',
    tags: ['autocomplete', 'input']
  },
  'p-autocomplete-6': {
    description: 'Autocomplete autofilling the input with the highlighted item',
    tags: ['autocomplete', 'input']
  },
  'p-autocomplete-7': {
    description: 'Autocomplete auto highlighting the first option',
    tags: ['autocomplete', 'input']
  },
  'p-autocomplete-8': {
    description: 'Autocomplete with clear button',
    tags: ['autocomplete', 'input']
  },
  'p-autocomplete-9': {
    description: 'Autocomplete with trigger and clear buttons',
    tags: ['autocomplete', 'input']
  },
  'p-autocomplete-10': {
    description: 'Autocomplete with grouped items',
    tags: ['autocomplete', 'input']
  },
  'p-autocomplete-11': {
    description: 'Autocomplete with limited number of results',
    tags: ['autocomplete', 'input']
  },
  'p-autocomplete-12': {
    description: 'Autocomplete with async items loading',
    tags: ['autocomplete', 'input', 'async']
  },
  'p-autocomplete-13': {
    description: 'Autocomplete form',
    tags: ['autocomplete', 'form', 'input']
  },
  'p-autocomplete-14': {
    description: 'Autocomplete form',
    tags: ['autocomplete', 'input']
  },
  'p-autocomplete-15': {
    description: 'Pill-shaped autocomplete',
    tags: ['autocomplete', 'input']
  },
  'p-avatar-1': {
    description: 'Avatar with image and fallback',
    tags: ['avatar']
  },
  'p-avatar-2': {
    description: 'Fallback-only avatar',
    tags: ['avatar']
  },
  'p-avatar-3': {
    description: 'Avatars with different sizes',
    tags: ['avatar']
  },
  'p-avatar-4': {
    description: 'Avatars with different radii',
    tags: ['avatar']
  },
  'p-avatar-5': {
    description: 'Overlapping avatar group',
    tags: ['avatar']
  },
  'p-avatar-6': {
    description: 'Avatar with user icon fallback',
    tags: ['avatar']
  },
  'p-avatar-7': {
    description: 'Avatar with emerald status dot',
    tags: ['avatar']
  },
  'p-avatar-8': {
    description: 'Avatar with muted status dot',
    tags: ['avatar']
  },
  'p-avatar-9': {
    description: 'Rounded avatar with top-right emerald status',
    tags: ['avatar']
  },
  'p-avatar-10': {
    description: 'Avatar with notification badge',
    tags: ['avatar']
  },
  'p-avatar-11': {
    description: 'Rounded avatar with notification badge',
    tags: ['avatar']
  },
  'p-avatar-12': {
    description: 'Avatar with verified badge',
    tags: ['avatar']
  },
  'p-avatar-13': {
    description: 'Small overlapping avatar group',
    tags: ['avatar']
  },
  'p-avatar-14': {
    description: 'Large overlapping avatar group',
    tags: ['avatar']
  },
  'p-badge-1': {
    description: 'Basic badge',
    tags: ['badge']
  },
  'p-badge-2': {
    description: 'Outline badge',
    tags: ['badge']
  },
  'p-badge-3': {
    description: 'Secondary badge',
    tags: ['badge']
  },
  'p-badge-4': {
    description: 'Destructive badge',
    tags: ['badge', 'error']
  },
  'p-badge-5': {
    description: 'Info badge',
    tags: ['badge', 'info']
  },
  'p-badge-6': {
    description: 'Success badge',
    tags: ['badge', 'success']
  },
  'p-badge-7': {
    description: 'Warning badge',
    tags: ['badge', 'warning']
  },
  'p-badge-8': {
    description: 'Error badge',
    tags: ['badge', 'error']
  },
  'p-badge-9': {
    description: 'Small badge',
    tags: ['badge']
  },
  'p-badge-10': {
    description: 'Large badge',
    tags: ['badge']
  },
  'p-badge-11': {
    description: 'Badge with icon',
    tags: ['badge']
  },
  'p-badge-12': {
    description: 'Badge with link',
    tags: ['badge']
  },
  'p-badge-13': {
    description: 'Badge with count',
    tags: ['badge']
  },
  'p-badge-14': {
    description: 'Full rounded badge (pill)',
    tags: ['badge']
  },
  'p-badge-15': {
    description: 'Badge with number after text',
    tags: ['badge']
  },
  'p-badge-16': {
    description: 'Status badge - Paid',
    tags: ['badge']
  },
  'p-badge-17': {
    description: 'Status badge - Pending',
    tags: ['badge']
  },
  'p-badge-18': {
    description: 'Status badge - Failed',
    tags: ['badge']
  },
  'p-badge-19': {
    description: 'Selectable badge with checkbox',
    tags: ['badge', 'checkbox']
  },
  'p-badge-20': {
    description: 'Removable badge',
    tags: ['badge']
  },
  'p-breadcrumb-1': {
    description: 'Breadcrumb with menu example',
    tags: ['breadcrumb', 'dropdown', 'menu']
  },
  'p-breadcrumb-2': {
    description: 'Breadcrumb with custom separator',
    tags: ['breadcrumb']
  },
  'p-breadcrumb-3': {
    description: 'Breadcrumb with home icon for home link only',
    tags: ['breadcrumb']
  },
  'p-breadcrumb-4': {
    description: 'Breadcrumb with folders icon menu',
    tags: ['breadcrumb', 'dropdown', 'menu']
  },
  'p-breadcrumb-5': {
    description: 'Breadcrumb with icons before text',
    tags: ['breadcrumb']
  },
  'p-breadcrumb-6': {
    description: 'Breadcrumb with dot separators',
    tags: ['breadcrumb']
  },
  'p-breadcrumb-7': {
    description: 'Breadcrumb with select dropdown',
    tags: ['breadcrumb', 'select']
  },
  'p-button-1': {
    description: 'Default button',
    tags: ['button']
  },
  'p-button-2': {
    description: 'Outline button',
    tags: ['button']
  },
  'p-button-3': {
    description: 'Secondary button',
    tags: ['button']
  },
  'p-button-4': {
    description: 'Destructive button',
    tags: ['button']
  },
  'p-button-5': {
    description: 'Destructive outline button',
    tags: ['button']
  },
  'p-button-6': {
    description: 'Ghost button',
    tags: ['button']
  },
  'p-button-7': {
    description: 'Link button',
    tags: ['button']
  },
  'p-button-8': {
    description: 'Extra-small button',
    tags: ['button']
  },
  'p-button-9': {
    description: 'Small button',
    tags: ['button']
  },
  'p-button-10': {
    description: 'Large button',
    tags: ['button']
  },
  'p-button-11': {
    description: 'Extra-large button',
    tags: ['button']
  },
  'p-button-12': {
    description: 'Disabled button',
    tags: ['button', 'disabled']
  },
  'p-button-13': {
    description: 'Icon button',
    tags: ['button']
  },
  'p-button-14': {
    description: 'Small icon button',
    tags: ['button']
  },
  'p-button-15': {
    description: 'Large icon button',
    tags: ['button']
  },
  'p-button-16': {
    description: 'Button with icon',
    tags: ['button']
  },
  'p-button-17': {
    description: 'Link rendered as button',
    tags: ['button']
  },
  'p-button-18': {
    description: 'Custom loading button with manual Spinner',
    tags: ['button', 'loading']
  },
  'p-button-19': {
    description: 'Expandable show more/less toggle button',
    tags: ['button']
  },
  'p-button-20': {
    description: 'Back link button with chevron',
    tags: ['button']
  },
  'p-button-21': {
    description: 'Card-style button with heading and description',
    tags: ['button']
  },
  'p-button-22': {
    description: 'Directional pad control buttons',
    tags: ['button']
  },
  'p-button-23': {
    description: 'Outline like button with count',
    tags: ['button']
  },
  'p-button-24': {
    description: 'Social login icon buttons',
    tags: ['button']
  },
  'p-button-26': {
    description: 'Star button with count badge',
    tags: ['button']
  },
  'p-button-27': {
    description: 'Button group with QR code icon and sign in',
    tags: ['button', 'group']
  },
  'p-button-28': {
    description: 'Button with avatar',
    tags: ['button', 'avatar']
  },
  'p-button-29': {
    description: 'Pill-shaped button with rounded-full styling',
    tags: ['button']
  },
  'p-button-30': {
    description: 'Button with animated arrow on hover',
    tags: ['button']
  },
  'p-button-31': {
    description: 'Button with keyboard shortcut indicator',
    tags: ['button', 'kbd']
  },
  'p-button-32': {
    description: 'Button with notification badge',
    tags: ['button', 'badge']
  },
  'p-button-33': {
    description: 'Paired buttons (Cancel/Save)',
    tags: ['button']
  },
  'p-button-34': {
    description: 'Button with animated status dot',
    tags: ['button']
  },
  'p-button-35': {
    description: 'Icon-only copy button with feedback',
    tags: ['button']
  },
  'p-button-36': {
    description: 'Copy button with feedback',
    tags: ['button']
  },
  'p-button-37': {
    description: 'Rotating icon button (FAB-style toggle)',
    tags: ['button']
  },
  'p-button-38': {
    description: 'Social login buttons (Google, X, GitHub)',
    tags: ['button']
  },
  'p-button-39': {
    description: 'Hamburger menu button with animated icon',
    tags: ['button']
  },
  'p-button-40': {
    description: 'Download button with progress and cancel action',
    tags: ['button', 'group', 'tooltip', 'toast']
  },
  'p-button-41': {
    description: 'Button using the built-in loading prop',
    tags: ['button', 'loading']
  },
  'p-calendar-1': {
    description: 'Basic calendar',
    tags: ['calendar']
  },
  'p-calendar-2': {
    description: 'Calendar with custom cell size',
    tags: ['calendar']
  },
  'p-calendar-3': {
    description: 'Calendar with date range selection',
    tags: ['calendar']
  },
  'p-calendar-4': {
    description: 'Calendar with month/year dropdown navigation',
    tags: ['calendar']
  },
  'p-calendar-5': {
    description: 'Calendar with custom Select dropdown for month/year',
    tags: ['calendar', 'select']
  },
  'p-calendar-6': {
    description: 'Calendar with Combobox dropdown for month/year',
    tags: ['calendar', 'combobox']
  },
  'p-calendar-7': {
    description: 'Calendar with disabled dates',
    tags: ['calendar']
  },
  'p-calendar-8': {
    description: 'Calendar with multiple date selection',
    tags: ['calendar']
  },
  'p-calendar-9': {
    description: 'Calendar with rounded day buttons',
    tags: ['calendar']
  },
  'p-calendar-10': {
    description: 'Calendar with rounded range selection style',
    tags: ['calendar']
  },
  'p-calendar-11': {
    description: 'Calendar with right-aligned navigation',
    tags: ['calendar']
  },
  'p-calendar-12': {
    description: 'Calendar with week numbers',
    tags: ['calendar']
  },
  'p-calendar-13': {
    description: 'Calendar with year-only combobox dropdown',
    tags: ['calendar', 'combobox']
  },
  'p-calendar-14': {
    description: 'Calendar without arrow navigation (dropdown only)',
    tags: ['calendar', 'select']
  },
  'p-calendar-15': {
    description: 'Calendar with current month button',
    tags: ['calendar', 'button']
  },
  'p-calendar-16': {
    description: 'Calendar with today button',
    tags: ['calendar', 'button']
  },
  'p-calendar-17': {
    description: 'Calendar with date input',
    tags: ['calendar', 'input', 'field']
  },
  'p-calendar-18': {
    description: 'Calendar with time input',
    tags: ['calendar', 'input', 'field']
  },
  'p-calendar-19': {
    description: 'Calendar with time slots (appointment picker)',
    tags: ['calendar', 'toggle', 'toggle group', 'scroll area']
  },
  'p-calendar-20': {
    description: 'Calendar with date presets',
    tags: ['calendar', 'button']
  },
  'p-calendar-21': {
    description: 'Range calendar with date presets',
    tags: ['calendar', 'button']
  },
  'p-calendar-22': {
    description: 'Two months calendar',
    tags: ['calendar']
  },
  'p-calendar-23': {
    description: 'Three months calendar',
    tags: ['calendar']
  },
  'p-calendar-24': {
    description: 'Pricing calendar with custom day buttons',
    tags: ['calendar']
  },
  'p-card-1': {
    description: 'A basic card with header and footer',
    tags: ['card', 'form']
  },
  'p-card-2': {
    description: 'Authentication card with actions',
    tags: ['card', 'form']
  },
  'p-card-3': {
    description: 'Authentication card with separators',
    tags: ['card', 'form']
  },
  'p-card-4': {
    description: 'Framed card with footer',
    tags: ['card', 'form']
  },
  'p-card-5': {
    description: 'Framed card with header',
    tags: ['card', 'form']
  },
  'p-card-6': {
    description: 'Framed card with header and footer',
    tags: ['card', 'form']
  },
  'p-card-7': {
    description: 'Framed card with no rounded bottom',
    tags: ['card', 'form']
  },
  'p-card-8': {
    description: 'Card within a frame and footer',
    tags: ['card', 'form', 'frame']
  },
  'p-card-9': {
    description: 'Card within a frame and footer',
    tags: ['card', 'form', 'frame']
  },
  'p-card-10': {
    description: 'Card within a frame with header and footer',
    tags: ['card', 'form', 'frame']
  },
  'p-card-11': {
    description: 'CardFrame with header action',
    tags: ['card', 'frame']
  },
  'p-checkbox-1': {
    description: 'Basic checkbox',
    tags: ['checkbox']
  },
  'p-checkbox-2': {
    description: 'Disabled checkbox',
    tags: ['checkbox', 'disabled']
  },
  'p-checkbox-3': {
    description: 'Checkbox with description',
    tags: ['checkbox']
  },
  'p-checkbox-4': {
    description: 'Card-style checkbox',
    tags: ['checkbox']
  },
  'p-checkbox-5': {
    description: 'Checkbox form',
    tags: ['checkbox', 'form']
  },
  'p-checkbox-group-1': {
    description: 'Basic checkbox group',
    tags: ['checkbox', 'checkbox group']
  },
  'p-checkbox-group-2': {
    description: 'Checkbox group with disabled items',
    tags: ['checkbox', 'checkbox group', 'disabled']
  },
  'p-checkbox-group-3': {
    description: 'Checkbox group with parent checkbox',
    tags: ['checkbox', 'checkbox group']
  },
  'p-checkbox-group-4': {
    description: 'Nested checkbox group with parent',
    tags: ['checkbox', 'checkbox group']
  },
  'p-checkbox-group-5': {
    description: 'Checkbox group form',
    tags: ['checkbox', 'checkbox group', 'form']
  },
  'p-collapsible-1': {
    description: 'Basic collapsible',
    tags: ['collapsible']
  },
  'p-combobox-1': {
    description: 'Basic combobox',
    tags: ['combobox', 'input']
  },
  'p-combobox-2': {
    description: 'Disabled combobox',
    tags: ['combobox', 'input', 'disabled']
  },
  'p-combobox-3': {
    description: 'Small combobox',
    tags: ['combobox', 'input']
  },
  'p-combobox-4': {
    description: 'Large combobox',
    tags: ['combobox', 'input']
  },
  'p-combobox-5': {
    description: 'Combobox with label',
    tags: ['combobox', 'input']
  },
  'p-combobox-6': {
    description: 'Combobox auto highlighting the first option',
    tags: ['combobox', 'input']
  },
  'p-combobox-7': {
    description: 'Combobox with clear button',
    tags: ['combobox', 'input']
  },
  'p-combobox-8': {
    description: 'Combobox with grouped items',
    tags: ['combobox', 'input']
  },
  'p-combobox-9': {
    description: 'Combobox with multiple selection',
    tags: ['combobox', 'input']
  },
  'p-combobox-10': {
    description: 'Combobox with input inside popup',
    tags: ['combobox', 'input']
  },
  'p-combobox-11': {
    description: 'Combobox form',
    tags: ['combobox', 'form', 'input']
  },
  'p-combobox-12': {
    description: 'Combobox multiple form',
    tags: ['combobox', 'form', 'input']
  },
  'p-combobox-13': {
    description: 'Combobox with start addon',
    tags: ['combobox', 'input']
  },
  'p-combobox-14': {
    description: 'Combobox multiple with start addon',
    tags: ['combobox', 'input']
  },
  'p-combobox-15': {
    description: 'Pill-shaped combobox',
    tags: ['combobox', 'input']
  },
  'p-combobox-16': {
    description: 'Timezone combobox',
    tags: ['combobox', 'input', 'timezone']
  },
  'p-combobox-17': {
    description: 'Timezone combobox with search input',
    tags: ['combobox', 'input', 'timezone']
  },
  'p-combobox-18': {
    description: 'Combobox with select trigger',
    tags: ['combobox', 'select']
  },
  'p-command-1': {
    description: 'Command palette with dialog',
    tags: ['command', 'dialog']
  },
  'p-command-2': {
    description: 'Command palette with AI assistant',
    tags: ['command', 'dialog']
  },
  'p-context-menu-1': {
    description: 'Basic context menu',
    tags: ['context menu', 'menu']
  },
  'p-context-menu-2': {
    description: 'Context menu with link items',
    tags: ['context menu', 'menu']
  },
  'p-context-menu-3': {
    description: 'Nested context menu',
    tags: ['context menu', 'menu']
  },
  'p-context-menu-4': {
    description: 'Context menu with checkbox items',
    tags: ['context menu', 'menu']
  },
  'p-context-menu-5': {
    description: 'Context menu with group labels',
    tags: ['context menu', 'menu']
  },
  'p-context-menu-6': {
    description: 'Context menu with icons',
    tags: ['context menu', 'menu']
  },
  'p-context-menu-7': {
    description: 'Context menu with radio group',
    tags: ['context menu', 'menu']
  },
  'p-context-menu-8': {
    description: 'Context menu with switch checkbox items',
    tags: ['context menu', 'menu', 'switch']
  },
  'p-date-picker-1': {
    description: 'Basic date picker',
    tags: ['date picker', 'calendar', 'popover', 'button']
  },
  'p-date-picker-2': {
    description: 'Date range picker',
    tags: ['date picker', 'calendar', 'popover', 'button']
  },
  'p-date-picker-3': {
    description: 'Date picker with field and dropdown navigation',
    tags: ['date picker', 'calendar', 'popover', 'button', 'field', 'combobox']
  },
  'p-date-picker-4': {
    description: 'Date picker with presets',
    tags: ['date picker', 'calendar', 'popover', 'button']
  },
  'p-date-picker-5': {
    description: 'Date picker with input',
    tags: ['date picker', 'calendar', 'popover', 'button', 'input']
  },
  'p-date-picker-6': {
    description: 'Date picker that closes on select',
    tags: ['date picker', 'calendar', 'popover', 'button']
  },
  'p-date-picker-7': {
    description: 'Multiple dates picker',
    tags: ['date picker', 'calendar', 'popover', 'button', 'badge']
  },
  'p-date-picker-8': {
    description: 'Date picker with select-like trigger',
    tags: ['date picker', 'calendar', 'popover', 'button']
  },
  'p-date-picker-9': {
    description: 'Two months calendar with range date',
    tags: ['date picker', 'calendar', 'popover', 'button']
  },
  'p-dialog-1': {
    description: 'Dialog with form',
    tags: ['dialog']
  },
  'p-dialog-2': {
    description: 'Dialog opened from menu',
    tags: ['dialog', 'dropdown', 'menu']
  },
  'p-dialog-3': {
    description: 'Nested dialogs',
    tags: ['dialog']
  },
  'p-dialog-4': {
    description: 'Dialog with close confirmation',
    tags: ['alert dialog', 'dialog']
  },
  'p-dialog-5': {
    description: 'Dialog with long content',
    tags: ['dialog']
  },
  'p-dialog-6': {
    description: 'Dialog with bare footer',
    tags: ['dialog']
  },
  'p-drawer-1': {
    description: 'Simple bottom drawer with close button',
    tags: ['drawer']
  },
  'p-drawer-2': {
    description: 'Bottom drawer without drag bar',
    tags: ['drawer']
  },
  'p-drawer-3': {
    description: 'Drawer with close button',
    tags: ['drawer']
  },
  'p-drawer-4': {
    description: 'Inset variant drawers for all four positions',
    tags: ['drawer']
  },
  'p-drawer-5': {
    description: 'Straight variant drawers for all four positions',
    tags: ['drawer']
  },
  'p-drawer-6': {
    description: 'Scrollable content with terms and conditions',
    tags: ['drawer']
  },
  'p-drawer-7': {
    description: 'Nested bottom drawers with centered content',
    tags: ['drawer']
  },
  'p-drawer-8': {
    description: 'Nested right drawers with inset variant',
    tags: ['drawer']
  },
  'p-drawer-9': {
    description: 'Bottom drawer with snap points',
    tags: ['drawer']
  },
  'p-drawer-10': {
    description: 'Edit profile form with default and bare footer variants',
    tags: ['drawer']
  },
  'p-drawer-11': {
    description: 'Mobile menu drawer from the left',
    tags: ['drawer']
  },
  'p-drawer-12': {
    description: 'Responsive edit profile: dialog on desktop, drawer on mobile',
    tags: ['drawer', 'dialog']
  },
  'p-drawer-13': {
    description: 'Responsive actions menu: menu on desktop, drawer on mobile',
    tags: ['drawer', 'menu']
  },
  'p-drawer-14': {
    description: 'Left drawer with swipe area',
    tags: ['drawer']
  },
  'p-empty-1': {
    description: 'Empty state with icon and actions',
    tags: ['empty state']
  },
  'p-field-1': {
    description: 'Field with description',
    tags: ['field', 'input', 'label']
  },
  'p-field-2': {
    description: 'Field with required indicator',
    tags: ['field', 'input', 'label']
  },
  'p-field-3': {
    description: 'Field in disabled state',
    tags: ['disabled', 'field', 'input', 'label']
  },
  'p-field-4': {
    description: 'Field showing validation error',
    tags: ['error', 'field', 'input', 'label']
  },
  'p-field-5': {
    description: 'Show field validity state',
    tags: ['field', 'input']
  },
  'p-field-6': {
    description: 'Input group with field',
    tags: ['button', 'field', 'input', 'input group']
  },
  'p-field-7': {
    description: 'Field with autocomplete',
    tags: ['autocomplete', 'field', 'input', 'label']
  },
  'p-field-8': {
    description: 'Field with combobox',
    tags: ['combobox', 'field', 'input', 'label']
  },
  'p-field-9': {
    description: 'Field with multiple selection combobox',
    tags: ['combobox', 'field', 'input', 'label']
  },
  'p-field-10': {
    description: 'Field with textarea',
    tags: ['field', 'label', 'textarea']
  },
  'p-field-11': {
    description: 'Field with select',
    tags: ['field', 'label', 'select']
  },
  'p-field-12': {
    description: 'Field with checkbox',
    tags: ['checkbox', 'field', 'label']
  },
  'p-field-13': {
    description: 'Field with checkbox group',
    tags: ['checkbox', 'checkbox group', 'field', 'fieldset', 'label']
  },
  'p-field-14': {
    description: 'Field with radio group',
    tags: ['field', 'fieldset', 'label', 'radio group']
  },
  'p-field-15': {
    description: 'Field with toggle switch',
    tags: ['field', 'label', 'switch']
  },
  'p-field-16': {
    description: 'Field with slider',
    tags: ['field', 'label', 'slider']
  },
  'p-field-17': {
    description: 'Field with number field',
    tags: ['field', 'input', 'label', 'number field']
  },
  'p-field-18': {
    description: 'Complete form built with field',
    tags: ['button', 'checkbox', 'field', 'form', 'input', 'label', 'select']
  },
  'p-fieldset-1': {
    description: 'Fieldset with multiple fields',
    tags: ['fieldset', 'input']
  },
  'p-form-1': {
    description: 'Input in a form',
    tags: ['button', 'field', 'form', 'input']
  },
  'p-form-2': {
    description: 'Form with zod validation',
    tags: ['button', 'field', 'form', 'label', 'validation', 'zod']
  },
  'p-frame-1': {
    description: 'Basic frame',
    tags: ['frame']
  },
  'p-frame-2': {
    description: 'Frame with collapsible content and delete button',
    tags: ['collapsible', 'frame']
  },
  'p-frame-3': {
    description: 'Frame with multiple separated panels',
    tags: ['frame']
  },
  'p-frame-4': {
    description: 'Frame with multiple stacked panels',
    tags: ['frame']
  },
  'p-group-1': {
    description: 'Basic group',
    tags: ['group']
  },
  'p-group-2': {
    description: 'Group with input',
    tags: ['group', 'input']
  },
  'p-group-3': {
    description: 'Small group',
    tags: ['group']
  },
  'p-group-4': {
    description: 'Large group',
    tags: ['group']
  },
  'p-group-5': {
    description: 'Group with disabled button',
    tags: ['button', 'group']
  },
  'p-group-6': {
    description: 'Group with default button',
    tags: ['button', 'group']
  },
  'p-group-7': {
    description: 'Group with start text',
    tags: ['group']
  },
  'p-group-8': {
    description: 'Group with end text',
    tags: ['group']
  },
  'p-group-9': {
    description: 'Vertical group',
    tags: ['group']
  },
  'p-group-10': {
    description: 'Nested groups',
    tags: ['group']
  },
  'p-group-11': {
    description: 'Group with popup',
    tags: ['group']
  },
  'p-group-12': {
    description: 'Group with input group',
    tags: ['group', 'input group']
  },
  'p-group-13': {
    description: 'Group with menu',
    tags: ['dropdown', 'group', 'menu']
  },
  'p-group-14': {
    description: 'Group with select',
    tags: ['group', 'select', 'number field']
  },
  'p-group-15': {
    description: 'Group with search',
    tags: ['group', 'search']
  },
  'p-group-16': {
    description: 'Group with add button and input',
    tags: ['button', 'group', 'input']
  },
  'p-group-17': {
    description: 'Group with input and currency text',
    tags: ['group', 'input']
  },
  'p-group-18': {
    description: 'Group with select and input',
    tags: ['group', 'input', 'select']
  },
  'p-group-19': {
    description: 'Group with input and select',
    tags: ['group', 'input', 'select']
  },
  'p-group-20': {
    description: 'Group with input and text button',
    tags: ['button', 'group', 'input']
  },
  'p-group-22': {
    description: 'Group with two number inputs for range',
    tags: ['group', 'label', 'number field']
  },
  'p-group-23': {
    description: 'Group with filter label, combobox multi-select, and remove button',
    tags: ['avatar', 'badge', 'button', 'combobox', 'group']
  },
  'p-input-1': {
    description: 'Basic input',
    tags: ['input']
  },
  'p-input-2': {
    description: 'Small input',
    tags: ['input']
  },
  'p-input-3': {
    description: 'Large input',
    tags: ['input']
  },
  'p-input-4': {
    description: 'Disabled input',
    tags: ['input']
  },
  'p-input-5': {
    description: 'File input',
    tags: ['input']
  },
  'p-input-6': {
    description: 'Input with label',
    tags: ['input', 'label']
  },
  'p-input-7': {
    description: 'Input with button using Group',
    tags: ['button', 'group', 'input']
  },
  'p-input-8': {
    description: 'Input with start text and end tooltip',
    tags: ['button', 'input', 'input group', 'popover']
  },
  'p-input-9': {
    description: 'Password input with toggle visibility',
    tags: ['button', 'input', 'input group', 'tooltip']
  },
  'p-input-10': {
    description: 'Input group mimicking a URL bar',
    tags: ['button', 'input', 'input group', 'popover']
  },
  'p-input-11': {
    description: 'Input group with keyboard shortcut',
    tags: ['input', 'input group', 'kbd', 'search']
  },
  'p-input-12': {
    description: 'Input group with start loading spinner',
    tags: ['input', 'input group', 'spinner', 'loading']
  },
  'p-input-13': {
    description: 'Input with label and required indicator',
    tags: ['input', 'label']
  },
  'p-input-14': {
    description: 'Input with optional label',
    tags: ['input', 'label']
  },
  'p-input-15': {
    description: 'Input with custom border and background',
    tags: ['input']
  },
  'p-input-16': {
    description: 'Input group with end loading spinner',
    tags: ['input', 'input group', 'spinner', 'loading']
  },
  'p-input-17': {
    description: 'Read-only input',
    tags: ['input']
  },
  'p-input-18': {
    description: 'Input with characters remaining counter',
    tags: ['field', 'input']
  },
  'p-input-19': {
    description: 'Pill-shaped input',
    tags: ['input']
  },
  'p-input-group-1': {
    description: 'Basic input group',
    tags: ['input group']
  },
  'p-input-group-2': {
    description: 'Input group with end icon',
    tags: ['input group']
  },
  'p-input-group-3': {
    description: 'Input group with start text',
    tags: ['input group']
  },
  'p-input-group-4': {
    description: 'Input group with end text',
    tags: ['input group']
  },
  'p-input-group-5': {
    description: 'Input group with start and end text',
    tags: ['input group']
  },
  'p-input-group-6': {
    description: 'Input group with number field',
    tags: ['input group', 'number field']
  },
  'p-input-group-7': {
    description: 'Input group with end tooltip',
    tags: ['input group', 'tooltip']
  },
  'p-input-group-8': {
    description: 'Input group with icon button',
    tags: ['button', 'input group']
  },
  'p-input-group-9': {
    description: 'Input group with button',
    tags: ['button', 'input group']
  },
  'p-input-group-10': {
    description: 'Input group with badge',
    tags: ['badge', 'input group']
  },
  'p-input-group-11': {
    description: 'Input group with keyboard shortcut',
    tags: ['input group', 'kbd']
  },
  'p-input-group-12': {
    description: 'Input group with inner label',
    tags: ['input group', 'label']
  },
  'p-input-group-13': {
    description: 'Small input group',
    tags: ['input group']
  },
  'p-input-group-14': {
    description: 'Large input group',
    tags: ['input group']
  },
  'p-input-group-15': {
    description: 'Disabled input group',
    tags: ['input group']
  },
  'p-input-group-16': {
    description: 'Input group with loading spinner',
    tags: ['input group', 'spinner']
  },
  'p-input-group-17': {
    description: 'Input group with textarea',
    tags: ['input group', 'textarea']
  },
  'p-input-group-18': {
    description: 'Input group with badge and menu',
    tags: ['badge', 'dropdown', 'input group', 'menu']
  },
  'p-input-group-19': {
    description: 'Mini editor built with input group and toggle',
    tags: ['button', 'input group', 'textarea', 'toggle']
  },
  'p-input-group-20': {
    description: 'Input group with search icon',
    tags: ['input', 'input group', 'search']
  },
  'p-input-group-21': {
    description: 'Input group with start tooltip',
    tags: ['button', 'input', 'input group', 'tooltip']
  },
  'p-input-group-22': {
    description: 'Input group with clear button',
    tags: ['button', 'input', 'input group']
  },
  'p-input-group-23': {
    description: 'Search input group with loader and voice button',
    tags: ['button', 'input', 'input group', 'search', 'tooltip']
  },
  'p-input-group-24': {
    description: 'Input group with character counter',
    tags: ['input', 'input group']
  },
  'p-input-group-26': {
    description: 'Password input with strength indicator',
    tags: ['button', 'input', 'input group', 'label']
  },
  'p-input-group-27': {
    description: 'Code snippet input with language selector',
    tags: ['button', 'input group', 'select', 'textarea', 'tooltip']
  },
  'p-input-group-28': {
    description: 'Message composer with attachment buttons',
    tags: ['button', 'input group', 'textarea', 'tooltip']
  },
  'p-input-group-29': {
    description: 'Chat input with voice and send buttons',
    tags: ['button', 'input group', 'textarea', 'tooltip']
  },
  'p-kbd-1': {
    description: 'Keyboard shortcuts display',
    tags: ['kbd']
  },
  'p-menu-1': {
    description: 'Basic menu',
    tags: ['dropdown', 'menu']
  },
  'p-menu-2': {
    description: 'Menu with hover',
    tags: ['dropdown', 'menu']
  },
  'p-menu-3': {
    description: 'Menu with checkbox',
    tags: ['dropdown', 'menu']
  },
  'p-menu-4': {
    description: 'Menu with radio group',
    tags: ['dropdown', 'menu']
  },
  'p-menu-5': {
    description: 'Menu with link',
    tags: ['dropdown', 'menu']
  },
  'p-menu-6': {
    description: 'Menu with group labels',
    tags: ['dropdown', 'menu']
  },
  'p-menu-7': {
    description: 'Nested menu',
    tags: ['dropdown', 'menu']
  },
  'p-menu-8': {
    description: 'Menu close on click',
    tags: ['dropdown', 'menu']
  },
  'p-menu-9': {
    description: 'Menu with checkbox items as switches',
    tags: ['dropdown', 'menu', 'switch']
  },
  'p-meter-1': {
    description: 'Basic meter',
    tags: ['meter']
  },
  'p-meter-2': {
    description: 'Simple meter',
    tags: ['meter']
  },
  'p-meter-3': {
    description: 'Meter with formatted value',
    tags: ['meter']
  },
  'p-meter-4': {
    description: 'Meter with range',
    tags: ['meter']
  },
  'p-number-field-1': {
    description: 'Basic number field',
    tags: ['number field', 'input']
  },
  'p-number-field-2': {
    description: 'Small number field',
    tags: ['number field', 'input']
  },
  'p-number-field-3': {
    description: 'Large number field',
    tags: ['number field', 'input']
  },
  'p-number-field-4': {
    description: 'Disabled number field',
    tags: ['number field', 'input']
  },
  'p-number-field-5': {
    description: 'Number field with label',
    tags: ['number field', 'input']
  },
  'p-number-field-6': {
    description: 'Number field with scrub',
    tags: ['number field', 'input']
  },
  'p-number-field-7': {
    description: 'Number field with range',
    tags: ['number field', 'input']
  },
  'p-number-field-8': {
    description: 'Number field with formatted value',
    tags: ['number field', 'input']
  },
  'p-number-field-9': {
    description: 'Number field with step',
    tags: ['number field', 'input']
  },
  'p-number-field-10': {
    description: 'Number field in form',
    tags: ['number field', 'input', 'form', 'field', 'zod']
  },
  'p-number-field-11': {
    description: 'Pill-shaped number field',
    tags: ['number field', 'input']
  },
  'p-otp-field-1': {
    description: 'Basic OTP field',
    tags: ['otp field', 'input']
  },
  'p-otp-field-2': {
    description: 'Large OTP field',
    tags: ['otp field', 'input']
  },
  'p-otp-field-3': {
    description: 'OTP field with separator',
    tags: ['otp field', 'input']
  },
  'p-otp-field-4': {
    description: 'OTP field with label',
    tags: ['otp field', 'input', 'field']
  },
  'p-otp-field-6': {
    description: 'OTP field with custom sanitization',
    tags: ['otp field', 'input', 'field', 'validation']
  },
  'p-otp-field-7': {
    description: 'OTP field with auto validation',
    tags: ['otp field', 'input', 'validation']
  },
  'p-otp-field-8': {
    description: 'Alphanumeric OTP field',
    tags: ['otp field', 'input', 'field']
  },
  'p-otp-field-9': {
    description: 'OTP field with placeholder hints',
    tags: ['otp field', 'input', 'field']
  },
  'p-otp-field-10': {
    description: 'Masked OTP field',
    tags: ['otp field', 'input', 'field']
  },
  'p-pagination-1': {
    description: 'Pagination example',
    tags: ['pagination']
  },
  'p-pagination-2': {
    description: 'Pagination with previous and next buttons only',
    tags: ['pagination']
  },
  'p-pagination-3': {
    description: 'Pagination with select, and previous and next buttons',
    tags: ['pagination', 'select']
  },
  'p-popover-1': {
    description: 'Popover with a form',
    tags: ['button', 'field', 'form', 'popover', 'textarea']
  },
  'p-popover-2': {
    description: 'Popover with close button',
    tags: ['button', 'popover']
  },
  'p-popover-3': {
    description: 'Animated popovers',
    tags: ['avatar', 'button', 'popover']
  },
  'p-preview-card-1': {
    description: 'Preview card with popup',
    tags: ['preview card']
  },
  'p-progress-1': {
    description: 'Basic progress bar',
    tags: ['progress']
  },
  'p-progress-2': {
    description: 'Progress with label and value',
    tags: ['progress']
  },
  'p-progress-3': {
    description: 'Progress with formatted value',
    tags: ['progress']
  },
  'p-radio-group-1': {
    description: 'Basic radio group',
    tags: ['radio group']
  },
  'p-radio-group-2': {
    description: 'Disabled radio group',
    tags: ['radio group']
  },
  'p-radio-group-3': {
    description: 'Radio group with description',
    tags: ['radio group']
  },
  'p-radio-group-4': {
    description: 'Radio group card',
    tags: ['radio group']
  },
  'p-radio-group-5': {
    description: 'Radio group in form',
    tags: ['radio group', 'form']
  },
  'p-radio-group-6': {
    description: 'Theme selector with image cards',
    tags: ['radio group', 'form']
  },
  'p-scroll-area-1': {
    description: 'Basic scroll area',
    tags: ['scroll area']
  },
  'p-scroll-area-2': {
    description: 'Horizontal scroll area',
    tags: ['scroll area']
  },
  'p-scroll-area-3': {
    description: 'Scroll area with both directions',
    tags: ['scroll area']
  },
  'p-scroll-area-4': {
    description: 'Scroll area with fading edges',
    tags: ['scroll area']
  },
  'p-scroll-area-5': {
    description: 'Horizontal scroll area with scrollbar gutter',
    tags: ['scroll area']
  },
  'p-select-1': {
    description: 'Basic select',
    tags: ['select']
  },
  'p-select-2': {
    description: 'Small select',
    tags: ['select']
  },
  'p-select-3': {
    description: 'Large select',
    tags: ['select']
  },
  'p-select-4': {
    description: 'Disabled select',
    tags: ['select']
  },
  'p-select-5': {
    description: 'Select without item alignment',
    tags: ['select']
  },
  'p-select-6': {
    description: 'Select with groups',
    tags: ['select']
  },
  'p-select-7': {
    description: 'Multiple select',
    tags: ['select']
  },
  'p-select-8': {
    description: 'Select with icon',
    tags: ['select']
  },
  'p-select-9': {
    description: 'Select options with icon',
    tags: ['select']
  },
  'p-select-10': {
    description: 'Select with object values',
    tags: ['select']
  },
  'p-select-11': {
    description: 'Select in form',
    tags: ['select']
  },
  'p-select-12': {
    description: 'Select with disabled items',
    tags: ['select', 'disabled']
  },
  'p-select-13': {
    description: 'Timezone select',
    tags: ['select', 'time', 'timezone']
  },
  'p-select-14': {
    description: 'Status select with colored dot',
    tags: ['select']
  },
  'p-select-15': {
    description: 'Pill-shaped select trigger',
    tags: ['select']
  },
  'p-select-16': {
    description: 'Select with left text label',
    tags: ['select']
  },
  'p-select-17': {
    description: 'Select with country flags',
    tags: ['select']
  },
  'p-select-18': {
    description: 'Select with description in options only',
    tags: ['select']
  },
  'p-select-19': {
    description: 'Select with avatars',
    tags: ['select', 'avatar']
  },
  'p-select-20': {
    description: 'Rich select with avatars and usernames',
    tags: ['select', 'avatar']
  },
  'p-select-21': {
    description: 'Auto width select',
    tags: ['select']
  },
  'p-select-22': {
    description: 'Select with custom border and background',
    tags: ['select']
  },
  'p-select-23': {
    description: 'Select with label',
    tags: ['select']
  },
  'p-separator-1': {
    description: 'Separator with horizontal and vertical orientations',
    tags: ['separator']
  },
  'p-sheet-1': {
    description: 'Basic sheet',
    tags: ['sheet']
  },
  'p-sheet-2': {
    description: 'Sheet inset',
    tags: ['sheet']
  },
  'p-sheet-3': {
    description: 'Sheet position',
    tags: ['sheet']
  },
  'p-skeleton-1': {
    description: 'Basic skeleton',
    tags: ['skeleton']
  },
  'p-skeleton-2': {
    description: 'Skeleton only',
    tags: ['skeleton']
  },
  'p-slider-1': {
    description: 'Basic slider',
    tags: ['slider']
  },
  'p-slider-2': {
    description: 'Slider with label and value',
    tags: ['slider']
  },
  'p-slider-3': {
    description: 'Disabled slider',
    tags: ['slider', 'disabled']
  },
  'p-slider-4': {
    description: 'Slider with reference labels',
    tags: ['slider']
  },
  'p-slider-5': {
    description: 'Slider with ticks',
    tags: ['slider']
  },
  'p-slider-6': {
    description: 'Slider with labels above',
    tags: ['slider']
  },
  'p-slider-7': {
    description: 'Range slider',
    tags: ['slider']
  },
  'p-slider-8': {
    description: 'Slider with 3 thumbs',
    tags: ['slider']
  },
  'p-slider-9': {
    description: 'Range slider with collision behavior none',
    tags: ['slider']
  },
  'p-slider-10': {
    description: 'Range slider with collision behavior swap',
    tags: ['slider']
  },
  'p-slider-11': {
    description: 'Slider with icons',
    tags: ['slider']
  },
  'p-slider-12': {
    description: 'Slider with input',
    tags: ['slider', 'number field']
  },
  'p-slider-13': {
    description: 'Range slider with inputs',
    tags: ['slider', 'number field']
  },
  'p-slider-14': {
    description: 'Slider with increment and decrement buttons',
    tags: ['slider', 'button']
  },
  'p-slider-15': {
    description: 'Price range slider',
    tags: ['slider']
  },
  'p-slider-16': {
    description: 'Emoji rating slider',
    tags: ['slider']
  },
  'p-slider-17': {
    description: 'Vertical slider',
    tags: ['slider']
  },
  'p-slider-18': {
    description: 'Vertical range slider',
    tags: ['slider']
  },
  'p-slider-19': {
    description: 'Vertical slider with input',
    tags: ['slider', 'number field']
  },
  'p-slider-20': {
    description: 'Equalizer with vertical sliders',
    tags: ['slider']
  },
  'p-slider-21': {
    description: 'Object position sliders with reset',
    tags: ['slider', 'number field', 'button']
  },
  'p-slider-22': {
    description: 'Price slider with histogram',
    tags: ['slider', 'number field', 'input group', 'button', 'filter']
  },
  'p-slider-23': {
    description: 'Slider in form',
    tags: ['slider', 'form']
  },
  'p-spinner-1': {
    description: 'Basic spinner',
    tags: ['spinner']
  },
  'p-switch-1': {
    description: 'Basic switch',
    tags: ['switch']
  },
  'p-switch-2': {
    description: 'Disabled switch',
    tags: ['switch']
  },
  'p-switch-3': {
    description: 'Switch with description',
    tags: ['switch']
  },
  'p-switch-4': {
    description: 'Switch card',
    tags: ['switch']
  },
  'p-switch-5': {
    description: 'Switch in form',
    tags: ['switch']
  },
  'p-switch-6': {
    description: 'Custom size switch',
    tags: ['switch']
  },
  'p-table-1': {
    description: 'Basic table',
    tags: ['table']
  },
  'p-table-2': {
    description: 'Frame with card-style table',
    tags: ['frame', 'table']
  },
  'p-table-3': {
    description: 'Table with TanStack Table and checkboxes',
    tags: ['checkbox', 'table', 'tanstack']
  },
  'p-table-4': {
    description: 'Table with TanStack Table, sorting, and pagination',
    tags: ['checkbox', 'pagination', 'select', 'table', 'tanstack']
  },
  'p-table-5': {
    description: 'Card-style table variant',
    tags: ['table']
  },
  'p-table-6': {
    description: 'CardFrame with TanStack Table and checkboxes',
    tags: ['card', 'checkbox', 'table', 'tanstack']
  },
  'p-table-7': {
    description: 'CardFrame with card-style table',
    tags: ['card', 'table']
  },
  'p-table-8': {
    description: 'CardFrame with TanStack Table, sorting, and pagination',
    tags: ['card', 'checkbox', 'pagination', 'select', 'table', 'tanstack']
  },
  'p-tabs-1': {
    description: 'Basic tabs',
    tags: ['tabs']
  },
  'p-tabs-2': {
    description: 'Tabs with underline',
    tags: ['tabs']
  },
  'p-tabs-3': {
    description: 'Vertical tabs',
    tags: ['tabs']
  },
  'p-tabs-4': {
    description: 'Vertical tabs with underline',
    tags: ['tabs']
  },
  'p-tabs-5': {
    description: 'Tabs with full rounded triggers',
    tags: ['tabs']
  },
  'p-tabs-6': {
    description: 'Tabs with icon before name',
    tags: ['tabs']
  },
  'p-tabs-7': {
    description: 'Tabs with icon before name and underline',
    tags: ['tabs']
  },
  'p-tabs-8': {
    description: 'Tabs with icon only',
    tags: ['tabs']
  },
  'p-tabs-9': {
    description: 'Tabs with underline and icon on top',
    tags: ['tabs']
  },
  'p-tabs-10': {
    description: 'Tabs with count badge',
    tags: ['tabs', 'badge']
  },
  'p-tabs-11': {
    description: 'Vertical tabs with underline and icon before name',
    tags: ['tabs']
  },
  'p-tabs-12': {
    description: 'Tabs with icon only and count badge',
    tags: ['tabs', 'badge']
  },
  'p-tabs-13': {
    description: 'Tabs with icon only and grouped tooltips',
    tags: ['tabs', 'tooltip']
  },
  'p-textarea-1': {
    description: 'Basic textarea',
    tags: ['textarea']
  },
  'p-textarea-2': {
    description: 'Small textarea',
    tags: ['textarea']
  },
  'p-textarea-3': {
    description: 'Large textarea',
    tags: ['textarea']
  },
  'p-textarea-4': {
    description: 'Disabled textarea',
    tags: ['textarea']
  },
  'p-textarea-5': {
    description: 'Textarea with label',
    tags: ['textarea']
  },
  'p-textarea-6': {
    description: 'Textarea in form',
    tags: ['textarea']
  },
  'p-textarea-7': {
    description: 'Textarea with label and required indicator',
    tags: ['label', 'textarea']
  },
  'p-textarea-8': {
    description: 'Textarea with optional label',
    tags: ['label', 'textarea']
  },
  'p-textarea-9': {
    description: 'Textarea with custom border and background',
    tags: ['textarea']
  },
  'p-textarea-10': {
    description: 'Read-only textarea',
    tags: ['textarea']
  },
  'p-textarea-11': {
    description: 'Textarea with characters remaining counter',
    tags: ['field', 'textarea']
  },
  'p-textarea-12': {
    description: 'Textarea field with required indicator',
    tags: ['field', 'label', 'textarea']
  },
  'p-textarea-13': {
    description: 'Shorter textarea with fixed height',
    tags: ['textarea']
  },
  'p-textarea-14': {
    description: 'Textarea with button aligned right',
    tags: ['button', 'textarea']
  },
  'p-textarea-15': {
    description: 'Textarea with button aligned left',
    tags: ['button', 'textarea']
  },
  'p-toast-1': {
    description: 'Default stacked toast with title and description',
    tags: ['toast']
  },
  'p-toast-2': {
    description: 'Stacked toasts by semantic type (success, error, info, warning)',
    tags: ['toast']
  },
  'p-toast-3': {
    description: 'Loading-state stacked toast',
    tags: ['toast']
  },
  'p-toast-4': {
    description: 'Stacked toast with primary action (undo)',
    tags: ['toast']
  },
  'p-toast-5': {
    description: 'Promise-based stacked toast',
    tags: ['toast']
  },
  'p-toast-6': {
    description: 'Stacked toasts with varying content height',
    tags: ['toast']
  },
  'p-toast-7': {
    description: 'Anchored tooltip-style toast after copy',
    tags: ['toast']
  },
  'p-toast-8': {
    description: 'Anchored error toast after async failure',
    tags: ['toast']
  },
  'p-toast-9': {
    description: 'Long-running promise toast with cancel',
    tags: ['toast', 'button']
  },
  'p-toast-10': {
    description: 'Deduplicated success toast',
    tags: ['toast', 'button']
  },
  'p-toast-11': {
    description: 'Deduplicated error toast',
    tags: ['toast', 'button', 'error']
  },
  'p-toast-12': {
    description: 'Anchored deduplicated success toast',
    tags: ['toast', 'button']
  },
  'p-toast-13': {
    description: 'Anchored deduplicated error toast',
    tags: ['toast', 'button', 'error']
  },
  'p-toggle-1': {
    description: 'Basic toggle',
    tags: ['toggle']
  },
  'p-toggle-2': {
    description: 'Toggle with outline',
    tags: ['toggle']
  },
  'p-toggle-3': {
    description: 'Toggle with icon',
    tags: ['toggle']
  },
  'p-toggle-4': {
    description: 'Small toggle',
    tags: ['toggle']
  },
  'p-toggle-5': {
    description: 'Large toggle',
    tags: ['toggle']
  },
  'p-toggle-6': {
    description: 'Disabled toggle',
    tags: ['toggle']
  },
  'p-toggle-7': {
    description: 'Toggle icon group',
    tags: ['toggle']
  },
  'p-toggle-8': {
    description: 'Bookmark toggle with tooltip and success toast',
    tags: ['toggle', 'tooltip', 'toast']
  },
  'p-toggle-group-1': {
    description: 'Basic toggle group',
    tags: ['toggle', 'toggle group']
  },
  'p-toggle-group-2': {
    description: 'Small toggle group',
    tags: ['toggle', 'toggle group']
  },
  'p-toggle-group-3': {
    description: 'Large toggle group',
    tags: ['toggle', 'toggle group']
  },
  'p-toggle-group-4': {
    description: 'Toggle group with outline',
    tags: ['toggle', 'toggle group']
  },
  'p-toggle-group-5': {
    description: 'Vertical toggle group with outline',
    tags: ['toggle', 'toggle group']
  },
  'p-toggle-group-6': {
    description: 'Disabled toggle group',
    tags: ['toggle', 'toggle group']
  },
  'p-toggle-group-7': {
    description: 'Toggle group with disabled item',
    tags: ['toggle', 'toggle group']
  },
  'p-toggle-group-8': {
    description: 'Multiple selection toggle group',
    tags: ['toggle', 'toggle group']
  },
  'p-toggle-group-9': {
    description: 'Toggle group with tooltips',
    tags: ['toggle', 'toggle group']
  },
  'p-toolbar-1': {
    description: 'Toolbar with toggles, buttons, and select',
    tags: ['toolbar']
  },
  'p-tooltip-1': {
    description: 'Basic tooltip',
    tags: ['tooltip']
  },
  'p-tooltip-2': {
    description: 'Grouped tooltips',
    tags: ['tooltip']
  },
  'p-tooltip-3': {
    description: 'Toggle group animated tooltip',
    tags: ['tooltip']
  },
  'p-tooltip-4': {
    description: 'Vertical group with animated tooltip',
    tags: ['tooltip']
  }
};

function idToName(id: string): string {
  const match = id.match(/^p-(.*)-(\d+)$/);
  if (!match) return id;
  const [, category, num] = match;
  return (
    category
      .split('-')
      .map((w, i) => (i === 0 ? w[0].toUpperCase() + w.slice(1) : w))
      .join(' ') +
    ' ' +
    num
  );
}

const modules = import.meta.glob<{ default: Component }>('../components/particles/**/p-*.svelte');

const allParticles: RegistryParticuleData = Object.fromEntries(
  Object.entries(modules).map(([path, loader]) => {
    const id = path.match(/\/([^/]+)\.svelte$/)?.[1] ?? '';
    // const relpath = path.match(/\/([^/]+\/[^/]+)\.svelte$/)?.[1] ?? '';
    const folder = path.match(/\/([^/]+)\/[^/]+\.svelte$/)?.[1] ?? '';
    const meta = metadata[id] ?? {};
    return [
      id,
      {
        component: loader,
        description: meta.description ?? '',
        file: id,
        folder: folder,
        name: idToName(id),
        npmDependencies: meta.npmDependencies ?? [],
        registryDependencies: meta.registryDependencies ?? [],
        tags: meta.tags ?? []
      }
    ];
  })
);

export { allParticles };

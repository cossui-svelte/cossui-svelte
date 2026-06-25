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
  'p-accordion-01': { description: 'Basic accordion', tags: ['accordion'] },
  'p-accordion-02': { description: 'Accordion with one panel open', tags: ['accordion'] },
  'p-accordion-03': { description: 'Accordion allowing multiple panels open', tags: ['accordion'] },
  'p-accordion-04': { description: 'Controlled accordion', tags: ['accordion'] },
  'p-alert-01': { description: 'Basic alert', tags: ['alert'] },
  'p-alert-02': { description: 'Alert with icon', tags: ['alert'] },
  'p-alert-03': { description: 'Alert with icon and action buttons', tags: ['alert'] },
  'p-alert-04': { description: 'Info alert', tags: ['alert', 'info'] },
  'p-alert-05': { description: 'Success alert', tags: ['alert', 'success'] },
  'p-alert-06': { description: 'Warning alert', tags: ['alert', 'warning'] },
  'p-alert-07': { description: 'Error alert', tags: ['alert', 'error'] },
  'p-avatar-01': { description: 'Avatar with image and fallback', tags: ['avatar'] },
  'p-avatar-02': { description: 'Fallback-only avatar', tags: ['avatar'] },
  'p-avatar-03': { description: 'Avatars with different sizes', tags: ['avatar'] },
  'p-avatar-04': { description: 'Avatars with different radii', tags: ['avatar'] },
  'p-avatar-05': { description: 'Overlapping avatar group', tags: ['avatar'] },
  'p-avatar-06': { description: 'Avatar with user icon fallback', tags: ['avatar'] },
  'p-avatar-07': { description: 'Avatar with emerald status dot', tags: ['avatar'] },
  'p-avatar-08': { description: 'Avatar with muted status dot', tags: ['avatar'] },
  'p-avatar-09': { description: 'Rounded avatar with top-right emerald status', tags: ['avatar'] },
  'p-avatar-10': { description: 'Avatar with notification badge', tags: ['avatar'] },
  'p-avatar-11': { description: 'Rounded avatar with notification badge', tags: ['avatar'] },
  'p-avatar-12': { description: 'Avatar with verified badge', tags: ['avatar'] },
  'p-avatar-13': { description: 'Small overlapping avatar group', tags: ['avatar'] },
  'p-avatar-14': { description: 'Large overlapping avatar group', tags: ['avatar'] },
  'p-badge-01': { description: 'Basic badge', tags: ['badge'] },
  'p-badge-02': { description: 'Outline badge', tags: ['badge'] },
  'p-badge-03': { description: 'Secondary badge', tags: ['badge'] },
  'p-badge-04': { description: 'Destructive badge', tags: ['badge', 'error'] },
  'p-badge-05': { description: 'Info badge', tags: ['badge', 'info'] },
  'p-badge-06': { description: 'Success badge', tags: ['badge', 'success'] },
  'p-badge-07': { description: 'Warning badge', tags: ['badge', 'warning'] },
  'p-badge-08': { description: 'Error badge', tags: ['badge', 'error'] },
  'p-badge-09': { description: 'Small badge', tags: ['badge'] },
  'p-badge-10': { description: 'Large badge', tags: ['badge'] },
  'p-badge-11': { description: 'Badge with icon', tags: ['badge'] },
  'p-badge-12': { description: 'Badge with link', tags: ['badge'] },
  'p-badge-13': { description: 'Badge with count', tags: ['badge'] },
  'p-breadcrumb-01': {
    description: 'Breadcrumb with menu example',
    tags: ['breadcrumb', 'dropdown', 'menu']
  },
  'p-breadcrumb-02': { description: 'Breadcrumb with custom separator', tags: ['breadcrumb'] },
  'p-breadcrumb-03': {
    description: 'Breadcrumb with home icon for home link only',
    tags: ['breadcrumb']
  },
  'p-breadcrumb-04': {
    description: 'Breadcrumb with folders icon menu',
    tags: ['breadcrumb', 'dropdown', 'menu']
  },
  'p-breadcrumb-05': { description: 'Breadcrumb with icons before text', tags: ['breadcrumb'] },
  'p-breadcrumb-06': { description: 'Breadcrumb with dot separators', tags: ['breadcrumb'] },
  'p-breadcrumb-07': {
    description: 'Breadcrumb with select dropdown',
    tags: ['breadcrumb', 'select']
  },

  'p-button-01': { description: 'Default button', tags: ['button'] },
  'p-button-02': { description: 'Outline button', tags: ['button'] },
  'p-button-03': { description: 'Secondary button', tags: ['button'] },
  'p-button-04': { description: 'Destructive button', tags: ['button'] },
  'p-button-05': { description: 'Destructive outline button', tags: ['button'] },
  'p-button-06': { description: 'Ghost button', tags: ['button'] },
  'p-button-07': { description: 'Link button', tags: ['button'] },
  'p-button-08': { description: 'Extra-small button', tags: ['button'] },
  'p-button-09': { description: 'Small button', tags: ['button'] },
  'p-button-10': { description: 'Large button', tags: ['button'] },
  'p-button-11': { description: 'Extra-large button', tags: ['button'] },
  'p-button-12': { description: 'Disabled button', tags: ['button', 'disabled'] },
  'p-button-13': { description: 'Icon button', tags: ['button'] },
  'p-button-14': { description: 'Small icon button', tags: ['button'] },
  'p-button-15': { description: 'Large icon button', tags: ['button'] },
  'p-button-16': { description: 'Button with icon', tags: ['button'] },
  'p-button-17': { description: 'Link rendered as button', tags: ['button'] },
  'p-button-18': {
    description: 'Custom loading button with manual Spinner',
    tags: ['button', 'loading']
  },
  'p-button-19': { description: 'Expandable show more/less toggle button', tags: ['button'] },
  'p-button-20': { description: 'Back link button with chevron', tags: ['button'] },
  'p-button-21': {
    description: 'Card-style button with heading and description',
    tags: ['button']
  },
  'p-button-22': { description: 'Directional pad control buttons', tags: ['button'] },
  'p-button-23': { description: 'Outline like button with count', tags: ['button'] },
  'p-button-24': { description: 'Social login icon buttons', tags: ['button'] },
  'p-button-26': { description: 'Star button with count badge', tags: ['button'] },
  'p-button-27': {
    description: 'Button group with QR code icon and sign in',
    tags: ['button', 'group']
  },
  'p-button-28': { description: 'Button with avatar', tags: ['button', 'avatar'] },
  'p-button-29': { description: 'Pill-shaped button with rounded-full styling', tags: ['button'] },
  'p-button-30': { description: 'Button with animated arrow on hover', tags: ['button'] },
  'p-button-31': {
    description: 'Button with keyboard shortcut indicator',
    tags: ['button', 'kbd']
  },
  'p-button-32': { description: 'Button with notification badge', tags: ['button', 'badge'] },
  'p-button-33': { description: 'Paired buttons (Cancel/Save)', tags: ['button'] },
  'p-button-34': { description: 'Button with animated status dot', tags: ['button'] },
  'p-button-35': { description: 'Icon-only copy button with feedback', tags: ['button'] },
  'p-button-36': { description: 'Copy button with feedback', tags: ['button'] },
  'p-button-37': { description: 'Rotating icon button (FAB-style toggle)', tags: ['button'] },
  'p-button-38': { description: 'Social login buttons (Google, X, GitHub)', tags: ['button'] },
  'p-button-39': { description: 'Hamburger menu button with animated icon', tags: ['button'] },
  'p-button-40': {
    description: 'Download button with progress and cancel action',
    tags: ['button', 'group', 'tooltip', 'toast']
  },
  'p-button-41': {
    description: 'Button using the built-in loading prop',
    tags: ['button', 'loading']
  },
  'p-checkbox-01': { description: 'Basic checkbox', tags: ['checkbox'] },
  'p-checkbox-02': { description: 'Disabled checkbox', tags: ['checkbox', 'disabled'] },
  'p-checkbox-03': { description: 'Checkbox with description', tags: ['checkbox'] },
  'p-checkbox-04': { description: 'Card-style checkbox', tags: ['checkbox'] },
  'p-checkbox-05': { description: 'Checkbox form', tags: ['checkbox', 'form'] },
  'p-collapsible-01': { description: 'Basic checkbox', tags: ['collapsible'] },
  'p-collapsible-02': { description: 'Basic checkbox', tags: ['collapsible'] },
  'p-dialog-01': { description: 'Dialog with form', tags: ['dialog'] },
  'p-dialog-02': { description: 'Dialog opened from menu', tags: ['dialog', 'dropdown', 'menu'] },
  'p-dialog-03': { description: 'Nested dialogs', tags: ['dialog'] },
  'p-dialog-04': {
    description: 'Dialog with close confirmation',
    tags: ['alert dialog', 'dialog']
  },
  'p-dialog-05': { description: 'Dialog with long content', tags: ['dialog'] },
  'p-dialog-06': { description: 'Dialog with bare footer', tags: ['dialog'] },
  'p-empty-01': { description: 'Empty state with icon and actions', tags: ['empty state'] },
  'p-input-01': { description: 'Basic input', tags: ['input'] },
  'p-input-02': { description: 'Small input', tags: ['input'] },
  'p-input-03': { description: 'Large input', tags: ['input'] },
  'p-input-04': { description: 'Disabled input', tags: ['input'] },
  'p-input-05': { description: 'File input', tags: ['input'] },
  'p-input-06': { description: 'Input with label', tags: ['input', 'label'] },
  'p-input-07': {
    description: 'Input with button using Group',
    tags: ['button', 'group', 'input']
  },
  'p-input-08': {
    description: 'Input with start text and end tooltip',
    tags: ['button', 'input', 'input group', 'popover']
  },
  'p-input-09': {
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
  'p-input-14': { description: 'Input with optional label', tags: ['input', 'label'] },
  'p-input-15': { description: 'Input with custom border and background', tags: ['input'] },
  'p-input-16': {
    description: 'Input group with end loading spinner',
    tags: ['input', 'input group', 'spinner', 'loading']
  },
  'p-input-17': { description: 'Read-only input', tags: ['input'] },
  'p-input-18': {
    description: 'Input with characters remaining counter',
    tags: ['field', 'input']
  },
  'p-input-19': { description: 'Pill-shaped input', tags: ['input'] },

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
  'p-pagination-01': { description: 'Pagination example', tags: ['pagination'] },
  'p-pagination-02': {
    description: 'Pagination with previous and next buttons only',
    tags: ['pagination']
  },
  'p-pagination-03': {
    description: 'Pagination with select, and previous and next buttons',
    tags: ['pagination', 'select']
  },
  'p-popover-01': {
    description: 'Popover with a form',
    tags: ['button', 'field', 'form', 'popover', 'textarea']
  },
  'p-popover-02': { description: 'Popover with close button', tags: ['button', 'popover'] },
  'p-popover-03': { description: 'Animated popovers', tags: ['avatar', 'button', 'popover'] },
  'p-select-01': { description: 'Basic select', tags: ['select'] },
  'p-select-02': { description: 'Small select', tags: ['select'] },
  'p-select-03': { description: 'Large select', tags: ['select'] },
  'p-select-05': { description: 'Select without item alignment', tags: ['select'] },
  'p-select-15': { description: 'Pill-shaped select trigger', tags: ['select'] },
  'p-select-16': { description: 'Select with left text label', tags: ['select'] },
  'p-select-17': { description: 'Select with country flags', tags: ['select'] },
  'p-select-18': { description: 'Select with description in options only', tags: ['select'] },
  'p-select-19': { description: 'Select with avatars', tags: ['select', 'avatar'] },
  'p-select-20': {
    description: 'Rich select with avatars and usernames',
    tags: ['select', 'avatar']
  },
  'p-select-21': { description: 'Auto width select', tags: ['select'] },
  'p-select-22': { description: 'Select with custom border and background', tags: ['select'] },
  'p-select-23': { description: 'Select with label', tags: ['select'] },
  'p-slider-01': { description: 'Basic slider', tags: ['slider'] },
  'p-slider-02': { description: 'Slider with label and value', tags: ['slider'] },
  'p-slider-03': { description: 'Disabled slider', tags: ['slider', 'disabled'] },
  'p-slider-04': { description: 'Slider with reference labels', tags: ['slider'] },
  'p-slider-05': { description: 'Slider with ticks', tags: ['slider'] },
  'p-slider-06': { description: 'Slider with labels above', tags: ['slider'] },
  'p-slider-07': { description: 'Range slider', tags: ['slider'] },
  'p-slider-08': { description: 'Slider with 3 thumbs', tags: ['slider'] },
  'p-slider-09': { description: 'Range slider with collision behavior none', tags: ['slider'] },
  'p-slider-10': { description: 'Range slider with collision behavior swap', tags: ['slider'] },
  'p-slider-11': { description: 'Slider with icons', tags: ['slider'] },
  'p-slider-12': { description: 'Slider with input', tags: ['slider', 'number field'] },
  'p-slider-13': { description: 'Range slider with inputs', tags: ['slider', 'number field'] },
  'p-slider-14': {
    description: 'Slider with increment and decrement buttons',
    tags: ['slider', 'button']
  },
  'p-slider-15': { description: 'Price range slider', tags: ['slider'] },
  'p-slider-16': { description: 'Emoji rating slider', tags: ['slider'] },
  'p-slider-17': { description: 'Vertical slider', tags: ['slider'] },
  'p-slider-18': { description: 'Vertical range slider', tags: ['slider'] },
  'p-slider-19': { description: 'Vertical slider with input', tags: ['slider', 'number field'] },
  'p-slider-20': { description: 'Equalizer with vertical sliders', tags: ['slider'] },
  'p-slider-21': {
    description: 'Object position sliders with reset',
    tags: ['slider', 'number field', 'button']
  },
  'p-slider-22': {
    description: 'Price slider with histogram',
    tags: ['slider', 'number field', 'input group', 'button', 'filter']
  },
  'p-slider-23': { description: 'Slider in form', tags: ['slider', 'form'] },
  'p-switch-01': { description: 'Basic switch', tags: ['switch'] },
  'p-switch-02': { description: 'Disabled switch', tags: ['switch'] },
  'p-switch-03': { description: 'Switch with description', tags: ['switch'] },
  'p-switch-04': { description: 'Switch card', tags: ['switch'] },
  'p-switch-05': { description: 'Switch in form', tags: ['switch'] },
  'p-switch-06': { description: 'Custom size switch', tags: ['switch'] },
  'p-textarea-01': { description: 'Basic textarea', tags: ['textarea'] },
  'p-textarea-02': { description: 'Small textarea', tags: ['textarea'] },
  'p-textarea-03': { description: 'Large textarea', tags: ['textarea'] },
  'p-textarea-04': { description: 'Disabled textarea', tags: ['textarea'] },
  'p-textarea-05': { description: 'Textarea with label', tags: ['textarea'] },
  'p-textarea-06': { description: 'Textarea in form', tags: ['textarea'] },
  'p-textarea-07': {
    description: 'Textarea with label and required indicator',
    tags: ['label', 'textarea']
  },
  'p-textarea-08': { description: 'Textarea with optional label', tags: ['label', 'textarea'] },
  'p-textarea-09': {
    description: 'Textarea with custom border and background',
    tags: ['textarea']
  },
  'p-textarea-10': { description: 'Read-only textarea', tags: ['textarea'] },
  'p-textarea-11': {
    description: 'Textarea with characters remaining counter',
    tags: ['field', 'textarea']
  },
  'p-textarea-12': {
    description: 'Textarea field with required indicator',
    tags: ['field', 'label', 'textarea']
  },
  'p-textarea-13': { description: 'Shorter textarea with fixed height', tags: ['textarea'] },
  'p-textarea-14': {
    description: 'Textarea with button aligned right',
    tags: ['button', 'textarea']
  },
  'p-textarea-15': {
    description: 'Textarea with button aligned left',
    tags: ['button', 'textarea']
  },
  'p-tooltip-01': { description: 'Basic tooltip', tags: ['tooltip'] },
  'p-tooltip-02': { description: 'Grouped tooltips', tags: ['tooltip'] },
  'p-tooltip-03': { description: 'Toggle group animated tooltip', tags: ['tooltip'] },
  'p-tooltip-04': { description: 'Vertical group with animated tooltip', tags: ['tooltip'] }
};

function idToName(id: string): string {
  const match = id.match(/^(.*)-(\d+)$/);
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

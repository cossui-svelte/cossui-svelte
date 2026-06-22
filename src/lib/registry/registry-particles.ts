import type { Component } from 'svelte';

export interface RegistryParticuleEntry {
  component: () => Promise<{ default: Component }>;
  description: string;
  // relative to src/lib/components/
  file: string;
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
  'accordion-01': { description: 'Basic accordion', tags: ['accordion'] },
  'accordion-02': { description: 'Accordion with one panel open', tags: ['accordion'] },
  'accordion-03': { description: 'Accordion allowing multiple panels open', tags: ['accordion'] },
  'accordion-04': { description: 'Controlled accordion', tags: ['accordion'] },
  'alert-01': { description: 'Basic alert', tags: ['alert'] },
  'alert-02': { description: 'Alert with icon', tags: ['alert'] },
  'alert-03': { description: 'Alert with icon and action buttons', tags: ['alert'] },
  'alert-04': { description: 'Info alert', tags: ['alert', 'info'] },
  'alert-05': { description: 'Success alert', tags: ['alert', 'success'] },
  'alert-06': { description: 'Warning alert', tags: ['alert', 'warning'] },
  'alert-07': { description: 'Error alert', tags: ['alert', 'error'] },
  'avatar-01': { description: 'Avatar with image and fallback', tags: ['avatar'] },
  'avatar-02': { description: 'Fallback-only avatar', tags: ['avatar'] },
  'avatar-03': { description: 'Avatars with different sizes', tags: ['avatar'] },
  'avatar-04': { description: 'Avatars with different radii', tags: ['avatar'] },
  'avatar-05': { description: 'Overlapping avatar group', tags: ['avatar'] },
  'avatar-06': { description: 'Avatar with user icon fallback', tags: ['avatar'] },
  'avatar-07': { description: 'Avatar with emerald status dot', tags: ['avatar'] },
  'avatar-08': { description: 'Avatar with muted status dot', tags: ['avatar'] },
  'avatar-09': { description: 'Rounded avatar with top-right emerald status', tags: ['avatar'] },
  'avatar-10': { description: 'Avatar with notification badge', tags: ['avatar'] },
  'avatar-11': { description: 'Rounded avatar with notification badge', tags: ['avatar'] },
  'avatar-12': { description: 'Avatar with verified badge', tags: ['avatar'] },
  'avatar-13': { description: 'Small overlapping avatar group', tags: ['avatar'] },
  'avatar-14': { description: 'Large overlapping avatar group', tags: ['avatar'] },
  'badge-01': { description: 'Basic badge', tags: ['badge'] },
  'badge-02': { description: 'Outline badge', tags: ['badge'] },
  'badge-03': { description: 'Secondary badge', tags: ['badge'] },
  'badge-04': { description: 'Destructive badge', tags: ['badge', 'error'] },
  'badge-05': { description: 'Info badge', tags: ['badge', 'info'] },
  'badge-06': { description: 'Success badge', tags: ['badge', 'success'] },
  'badge-07': { description: 'Warning badge', tags: ['badge', 'warning'] },
  'badge-08': { description: 'Error badge', tags: ['badge', 'error'] },
  'badge-09': { description: 'Small badge', tags: ['badge'] },
  'badge-10': { description: 'Large badge', tags: ['badge'] },
  'badge-11': { description: 'Badge with icon', tags: ['badge'] },
  'badge-12': { description: 'Badge with link', tags: ['badge'] },
  'badge-13': { description: 'Badge with count', tags: ['badge'] },
  'breadcrumb-01': { description: 'Breadcrumb with menu example', tags: ['breadcrumb', 'dropdown', 'menu'] },
  'breadcrumb-02': { description: 'Breadcrumb with custom separator', tags: ['breadcrumb'] },
  'breadcrumb-03': { description: 'Breadcrumb with home icon for home link only', tags: ['breadcrumb'] },
  'breadcrumb-04': { description: 'Breadcrumb with folders icon menu', tags: ['breadcrumb', 'dropdown', 'menu'] },
  'breadcrumb-05': { description: 'Breadcrumb with icons before text', tags: ['breadcrumb'] },
  'breadcrumb-06': { description: 'Breadcrumb with dot separators', tags: ['breadcrumb'] },
  'breadcrumb-07': { description: 'Breadcrumb with select dropdown', tags: ['breadcrumb', 'select'] },
  'button-01': { description: 'Default button', tags: ['button'] },
  'button-02': { description: 'Outline button', tags: ['button'] },
  'button-03': { description: 'Secondary button', tags: ['button'] },
  'button-04': { description: 'Destructive button', tags: ['button'] },
  'button-05': { description: 'Destructive outline button', tags: ['button'] },
  'button-06': { description: 'Ghost button', tags: ['button'] },
  'button-07': { description: 'Link button', tags: ['button'] },
  'button-08': { description: 'Extra-small button', tags: ['button'] },
  'button-09': { description: 'Small button', tags: ['button'] },
  'button-10': { description: 'Large button', tags: ['button'] },
  'button-11': { description: 'Extra-large button', tags: ['button'] },
  'button-12': { description: 'Disabled button', tags: ['button', 'disabled'] },
  'button-13': { description: 'Icon button', tags: ['button'] },
  'button-14': { description: 'Small icon button', tags: ['button'] },
  'button-15': { description: 'Large icon button', tags: ['button'] },
  'button-16': { description: 'Button with icon', tags: ['button'] },
  'button-17': { description: 'Link rendered as button', tags: ['button'] },
  'button-18': { description: 'Custom loading button with manual Spinner', tags: ['button', 'loading'] },
  'button-19': { description: 'Expandable show more/less toggle button', tags: ['button'] },
  'button-20': { description: 'Back link button with chevron', tags: ['button'] },
  'button-21': { description: 'Card-style button with heading and description', tags: ['button'] },
  'button-22': { description: 'Directional pad control buttons', tags: ['button'] },
  'button-23': { description: 'Outline like button with count', tags: ['button'] },
  'button-24': { description: 'Social login icon buttons', tags: ['button'] },
  'button-26': { description: 'Star button with count badge', tags: ['button'] },
  'button-27': { description: 'Button group with QR code icon and sign in', tags: ['button', 'group'] },
  'button-28': { description: 'Button with avatar', tags: ['button', 'avatar'] },
  'button-29': { description: 'Pill-shaped button with rounded-full styling', tags: ['button'] },
  'button-30': { description: 'Button with animated arrow on hover', tags: ['button'] },
  'button-31': { description: 'Button with keyboard shortcut indicator', tags: ['button', 'kbd'] },
  'button-32': { description: 'Button with notification badge', tags: ['button', 'badge'] },
  'button-33': { description: 'Paired buttons (Cancel/Save)', tags: ['button'] },
  'button-34': { description: 'Button with animated status dot', tags: ['button'] },
  'button-35': { description: 'Icon-only copy button with feedback', tags: ['button'] },
  'button-36': { description: 'Copy button with feedback', tags: ['button'] },
  'button-37': { description: 'Rotating icon button (FAB-style toggle)', tags: ['button'] },
  'button-38': { description: 'Social login buttons (Google, X, GitHub)', tags: ['button'] },
  'button-39': { description: 'Hamburger menu button with animated icon', tags: ['button'] },
  'button-40': { description: 'Download button with progress and cancel action', tags: ['button', 'group', 'tooltip', 'toast'] },
  'button-41': { description: 'Button using the built-in loading prop', tags: ['button', 'loading'] },
  'checkbox-01': { description: 'Basic checkbox', tags: ['checkbox'] },
  'checkbox-02': { description: 'Disabled checkbox', tags: ['checkbox', 'disabled'] },
  'checkbox-03': { description: 'Checkbox with description', tags: ['checkbox'] },
  'checkbox-04': { description: 'Card-style checkbox', tags: ['checkbox'] },
  'checkbox-05': { description: 'Checkbox form', tags: ['checkbox', 'form'] },
  'dialog-01': { description: 'Dialog with form', tags: ['dialog'] },
  'dialog-02': { description: 'Dialog opened from menu', tags: ['dialog', 'dropdown', 'menu'] },
  'dialog-03': { description: 'Nested dialogs', tags: ['dialog'] },
  'dialog-04': { description: 'Dialog with close confirmation', tags: ['alert dialog', 'dialog'] },
  'dialog-05': { description: 'Dialog with long content', tags: ['dialog'] },
  'dialog-06': { description: 'Dialog with bare footer', tags: ['dialog'] },
  'empty-01': { description: 'Empty state with icon and actions', tags: ['empty state'] },
  'input-01': { description: 'Basic input', tags: ['input'] },
  'input-02': { description: 'Small input', tags: ['input'] },
  'input-03': { description: 'Large input', tags: ['input'] },
  'input-04': { description: 'Disabled input', tags: ['input'] },
  'input-05': { description: 'File input', tags: ['input'] },
  'input-06': { description: 'Input with label', tags: ['input', 'label'] },
  'input-07': { description: 'Input with button using Group', tags: ['button', 'group', 'input'] },
  'input-08': { description: 'Input with start text and end tooltip', tags: ['button', 'input', 'input group', 'popover'] },
  'input-09': { description: 'Password input with toggle visibility', tags: ['button', 'input', 'input group', 'tooltip'] },
  'input-10': { description: 'Input group mimicking a URL bar', tags: ['button', 'input', 'input group', 'popover'] },
  'input-11': { description: 'Input group with keyboard shortcut', tags: ['input', 'input group', 'kbd', 'search'] },
  'input-12': { description: 'Input group with start loading spinner', tags: ['input', 'input group', 'spinner', 'loading'] },
  'input-13': { description: 'Input with label and required indicator', tags: ['input', 'label'] },
  'input-14': { description: 'Input with optional label', tags: ['input', 'label'] },
  'input-15': { description: 'Input with custom border and background', tags: ['input'] },
  'input-16': { description: 'Input group with end loading spinner', tags: ['input', 'input group', 'spinner', 'loading'] },
  'input-17': { description: 'Read-only input', tags: ['input'] },
  'input-18': { description: 'Input with characters remaining counter', tags: ['field', 'input'] },
  'input-19': { description: 'Pill-shaped input', tags: ['input'] },
  'pagination-01': { description: 'Pagination example', tags: ['pagination'] },
  'pagination-02': { description: 'Pagination with previous and next buttons only', tags: ['pagination'] },
  'pagination-03': { description: 'Pagination with select, and previous and next buttons', tags: ['pagination', 'select'] },
  'popover-01': { description: 'Popover with a form', tags: ['button', 'field', 'form', 'popover', 'textarea'] },
  'popover-02': { description: 'Popover with close button', tags: ['button', 'popover'] },
  'popover-03': { description: 'Animated popovers', tags: ['avatar', 'button', 'popover'] },
  'select-01': { description: 'Basic select', tags: ['select'] },
  'select-02': { description: 'Small select', tags: ['select'] },
  'select-03': { description: 'Large select', tags: ['select'] },
  'select-05': { description: 'Select without item alignment', tags: ['select'] },
  'select-15': { description: 'Pill-shaped select trigger', tags: ['select'] },
  'select-16': { description: 'Select with left text label', tags: ['select'] },
  'select-17': { description: 'Select with country flags', tags: ['select'] },
  'select-18': { description: 'Select with description in options only', tags: ['select'] },
  'select-19': { description: 'Select with avatars', tags: ['select', 'avatar'] },
  'select-20': { description: 'Rich select with avatars and usernames', tags: ['select', 'avatar'] },
  'select-21': { description: 'Auto width select', tags: ['select'] },
  'select-22': { description: 'Select with custom border and background', tags: ['select'] },
  'select-23': { description: 'Select with label', tags: ['select'] },
  'slider-01': { description: 'Basic slider', tags: ['slider'] },
  'slider-02': { description: 'Slider with label and value', tags: ['slider'] },
  'slider-03': { description: 'Disabled slider', tags: ['slider', 'disabled'] },
  'slider-04': { description: 'Slider with reference labels', tags: ['slider'] },
  'slider-05': { description: 'Slider with ticks', tags: ['slider'] },
  'slider-06': { description: 'Slider with labels above', tags: ['slider'] },
  'slider-07': { description: 'Range slider', tags: ['slider'] },
  'slider-08': { description: 'Slider with 3 thumbs', tags: ['slider'] },
  'slider-09': { description: 'Range slider with collision behavior none', tags: ['slider'] },
  'slider-10': { description: 'Range slider with collision behavior swap', tags: ['slider'] },
  'slider-11': { description: 'Slider with icons', tags: ['slider'] },
  'slider-12': { description: 'Slider with input', tags: ['slider', 'number field'] },
  'slider-13': { description: 'Range slider with inputs', tags: ['slider', 'number field'] },
  'slider-14': { description: 'Slider with increment and decrement buttons', tags: ['slider', 'button'] },
  'slider-15': { description: 'Price range slider', tags: ['slider'] },
  'slider-16': { description: 'Emoji rating slider', tags: ['slider'] },
  'slider-17': { description: 'Vertical slider', tags: ['slider'] },
  'slider-18': { description: 'Vertical range slider', tags: ['slider'] },
  'slider-19': { description: 'Vertical slider with input', tags: ['slider', 'number field'] },
  'slider-20': { description: 'Equalizer with vertical sliders', tags: ['slider'] },
  'slider-21': { description: 'Object position sliders with reset', tags: ['slider', 'number field', 'button'] },
  'slider-22': { description: 'Price slider with histogram', tags: ['slider', 'number field', 'input group', 'button', 'filter'] },
  'slider-23': { description: 'Slider in form', tags: ['slider', 'form'] },
  'switch-01': { description: 'Basic switch', tags: ['switch'] },
  'switch-02': { description: 'Disabled switch', tags: ['switch'] },
  'switch-03': { description: 'Switch with description', tags: ['switch'] },
  'switch-04': { description: 'Switch card', tags: ['switch'] },
  'switch-05': { description: 'Switch in form', tags: ['switch'] },
  'switch-06': { description: 'Custom size switch', tags: ['switch'] },
  'textarea-01': { description: 'Basic textarea', tags: ['textarea'] },
  'textarea-02': { description: 'Small textarea', tags: ['textarea'] },
  'textarea-03': { description: 'Large textarea', tags: ['textarea'] },
  'textarea-04': { description: 'Disabled textarea', tags: ['textarea'] },
  'textarea-05': { description: 'Textarea with label', tags: ['textarea'] },
  'textarea-06': { description: 'Textarea in form', tags: ['textarea'] },
  'textarea-07': { description: 'Textarea with label and required indicator', tags: ['label', 'textarea'] },
  'textarea-08': { description: 'Textarea with optional label', tags: ['label', 'textarea'] },
  'textarea-09': { description: 'Textarea with custom border and background', tags: ['textarea'] },
  'textarea-10': { description: 'Read-only textarea', tags: ['textarea'] },
  'textarea-11': { description: 'Textarea with characters remaining counter', tags: ['field', 'textarea'] },
  'textarea-12': { description: 'Textarea field with required indicator', tags: ['field', 'label', 'textarea'] },
  'textarea-13': { description: 'Shorter textarea with fixed height', tags: ['textarea'] },
  'textarea-14': { description: 'Textarea with button aligned right', tags: ['button', 'textarea'] },
  'textarea-15': { description: 'Textarea with button aligned left', tags: ['button', 'textarea'] },
  'tooltip-01': { description: 'Basic tooltip', tags: ['tooltip'] },
  'tooltip-02': { description: 'Grouped tooltips', tags: ['tooltip'] },
  'tooltip-03': { description: 'Toggle group animated tooltip', tags: ['tooltip'] },
  'tooltip-04': { description: 'Vertical group with animated tooltip', tags: ['tooltip'] }
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

const modules = import.meta.glob<{ default: Component }>(
  '../components/particles/**/*.svelte'
);

const allParticles: RegistryParticuleData = Object.fromEntries(
  Object.entries(modules).map(([path, loader]) => {
    const id = path.match(/\/([^/]+)\.svelte$/)?.[1] ?? '';
    const meta = metadata[id] ?? {};
    return [
      id,
      {
        component: loader,
        description: meta.description ?? '',
        file: id,
        name: idToName(id),
        npmDependencies: meta.npmDependencies ?? [],
        registryDependencies: meta.registryDependencies ?? [],
        tags: meta.tags ?? []
      }
    ];
  })
);

export { allParticles };

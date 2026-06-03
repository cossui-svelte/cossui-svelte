// All registry categories in display order
export const registryCategories = [
  // UI components
  'accordion',
  'alert',
  'alert-dialog',
  'autocomplete',
  'avatar',
  'badge',
  'breadcrumb',
  'button',
  'calendar',
  'card',
  'checkbox',
  'checkbox-group',
  'collapsible',
  'combobox',
  'command',
  'date-picker',
  'dialog',
  'drawer',
  'dropdown',
  'empty',
  'field',
  'fieldset',
  'form',
  'frame',
  'group',
  'input',
  'input-group',
  'kbd',
  'label',
  'menu',
  'meter',
  'number-field',
  'otp-field',
  'pagination',
  'popover',
  'preview-card',
  'progress',
  'radio-group',
  'scroll-area',
  'select',
  'separator',
  'sheet',
  'skeleton',
  'slider',
  'spinner',
  'switch',
  'table',
  'tabs',
  'textarea',
  'toast',
  'toggle',
  'toggle-group',
  'toolbar',
  'tooltip',
  // Features and states
  'async',
  'copy',
  'disabled',
  'error',
  'file',
  'filter',
  'info',
  'loading',
  'multiselect',
  'password',
  'search',
  'sort',
  'success',
  'tag',
  'tanstack',
  'text-editor',
  'time',
  'timezone',
  'upload',
  'validation',
  'warning'
] as const;

export type RegistryCategory = (typeof registryCategories)[number];

// Ordered list of categories for display sorting — add new categories here in preferred order
const CATEGORY_ORDER: string[] = [];

export function getCategorySortOrder(category: string): number {
  const idx = CATEGORY_ORDER.indexOf(category);
  return idx === -1 ? 999 : idx;
}

export function isValidRegistryCategory(category: string): boolean {
  return typeof category === 'string' && category.trim().length > 0;
}

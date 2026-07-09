// All registry categories in display order
// used during rendering

import { allComponents } from './generated-registry-components';

const tagCategories = Object.keys(allComponents);

// This is used by the search to find particules
export const registryCategories = [
  // UI components
  ...tagCategories,
  // Features and states
  'async',
  'copy',
  'credit-card',
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

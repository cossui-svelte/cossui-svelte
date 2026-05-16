/* eslint-disable */
/**
 * !!!!!!!!!!
 * This file is auto-generated. Do not edit manually
 * Last generated at: 5/16/2026, 11:48:02 AM
 * To update, run: pnpm generate:registry --format
 * @version 0.1.0
 * !!!!!!!!!!
 */

import type { Prettify } from '$lib/types/helpers';
import type { COSSUIDirectories } from './componentRegistry.components';

// Directory Type
export type COSSUIDirectory = COSSUIDirectoryHelper<keyof COSSUIDirectories>;

// Helpers
export type COSSUIDirectoryHelper<T extends keyof COSSUIDirectories> =
  COSSUIDirectories[T]['directory'];
export type COSSUIComponentHelper<T extends keyof COSSUIDirectories> =
  COSSUIDirectories[T]['components'][number];

// Status Helpers

// Status Type Helpers
export type COSSUITodoComponent<T extends keyof COSSUIDirectories> = Extract<
  COSSUIDirectories[T]['components'][number],
  `${string}todo.svelte`
>;

// Get all todo components
export type COSSUITodoComponents = {
  [K in keyof COSSUIDirectories]: COSSUITodoComponent<K>;
}[keyof COSSUIDirectories];

// Get todo components by directory
export type COSSUIDirectoryTodoComponents = {
  [K in keyof COSSUIDirectories]: {
    directory: K;
    components: COSSUITodoComponent<K>[];
  };
};

// Ready Component Helpers
export type COSSUIReadyComponent<T extends keyof COSSUIDirectories> = Exclude<
  COSSUIDirectories[T]['components'][number],
  `${string}todo.svelte`
>;

// Get all ready components
export type COSSUIReadyComponents = {
  [K in keyof COSSUIDirectories]: COSSUIReadyComponent<K>;
}[keyof COSSUIDirectories];

// Get ready components by directory
export type COSSUIDirectoryReadyComponents = {
  [K in keyof COSSUIDirectories]: {
    description: string;
    directory: K;
    components: COSSUIReadyComponent<K>[];
  };
};

// Component Count Types
export type COSSUIDirectoryComponentCounts = {
  [K in keyof COSSUIDirectories]: {
    directory: K;
    total: number;
    status: COSSUIDirectories[K]['status'];
  };
};

// Directory Status Filters
export type COSSUIDirectoriesWithTodo = {
  [K in keyof COSSUIDirectories as COSSUIDirectories[K]['status']['todo'] extends 0
    ? never
    : K]: COSSUIDirectories[K];
};

// Component Metadata
export type COSSUIComponentMetadata = {
  [K in keyof COSSUIDirectories]: {
    directory: K;
    name: COSSUIDirectories[K]['name'];
    totalComponents: number;
    status: COSSUIDirectories[K]['status'];
    hasInProgress: boolean;
  };
};

// Component Types
export type COSSUIAccordionComponents = COSSUIComponentHelper<'ACCORDION'>;
export type COSSUIAlertComponents = COSSUIComponentHelper<'ALERT'>;
export type COSSUIAvatarComponents = COSSUIComponentHelper<'AVATAR'>;
export type COSSUIBadgeComponents = COSSUIComponentHelper<'BADGE'>;
export type COSSUIBannerComponents = COSSUIComponentHelper<'BANNER'>;
export type COSSUIBreadcrumbComponents = COSSUIComponentHelper<'BREADCRUMB'>;
export type COSSUIButtonComponents = COSSUIComponentHelper<'BUTTON'>;
export type COSSUICheckboxComponents = COSSUIComponentHelper<'CHECKBOX'>;
export type COSSUIDialogComponents = COSSUIComponentHelper<'DIALOG'>;
export type COSSUIInputComponents = COSSUIComponentHelper<'INPUT'>;

// All Component Types
export type COSSUIComponent = Prettify<
  | COSSUIAccordionComponents
  | COSSUIAlertComponents
  | COSSUIAvatarComponents
  | COSSUIBadgeComponents
  | COSSUIBannerComponents
  | COSSUIBreadcrumbComponents
  | COSSUIButtonComponents
  | COSSUICheckboxComponents
  | COSSUIDialogComponents
  | COSSUIInputComponents
>;

// Directory To Component
export type COSSUIDirectoryToComponent = Prettify<{
  accordion: COSSUIAccordionComponents;
  alert: COSSUIAlertComponents;
  avatar: COSSUIAvatarComponents;
  badge: COSSUIBadgeComponents;
  banner: COSSUIBannerComponents;
  breadcrumb: COSSUIBreadcrumbComponents;
  button: COSSUIButtonComponents;
  checkbox: COSSUICheckboxComponents;
  dialog: COSSUIDialogComponents;
  input: COSSUIInputComponents;
}>;

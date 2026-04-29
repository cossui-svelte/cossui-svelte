/* eslint-disable */
/**
 * !!!!!!!!!!
 * This file is auto-generated. Do not edit manually
 * Last generated at: 4/29/2026, 4:54:34 PM
 * To update, run: pnpm generate:registry --format
 * @version 0.1.0
 * !!!!!!!!!!
 */

import type { Prettify } from "$lib/types/helpers";
import type { COSSUIDirectories } from "./componentRegistry.components";

// Directory Type
export type COSSUIDirectory = COSSUIDirectoryHelper<keyof COSSUIDirectories>;

// Helpers
export type COSSUIDirectoryHelper<T extends keyof COSSUIDirectories> =
  COSSUIDirectories[T]["directory"];
export type COSSUIComponentHelper<T extends keyof COSSUIDirectories> =
  COSSUIDirectories[T]["components"][number];

// Status Helpers

// Status Type Helpers
export type COSSUITodoComponent<T extends keyof COSSUIDirectories> = Extract<
  COSSUIDirectories[T]["components"][number],
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
export type OUIReadyComponent<T extends keyof COSSUIDirectories> = Exclude<
  COSSUIDirectories[T]["components"][number],
  `${string}todo.svelte`
>;

// Get all ready components
export type OUIReadyComponents = {
  [K in keyof COSSUIDirectories]: OUIReadyComponent<K>;
}[keyof COSSUIDirectories];

// Get ready components by directory
export type COSSUIDirectoryReadyComponents = {
  [K in keyof COSSUIDirectories]: {
    directory: K;
    components: OUIReadyComponent<K>[];
  };
};

// Component Count Types
export type COSSUIDirectoryComponentCounts = {
  [K in keyof COSSUIDirectories]: {
    directory: K;
    total: number;
    status: COSSUIDirectories[K]["status"];
  };
};

// Directory Status Filters
export type OUIDirectoriesWithTodo = {
  [K in keyof COSSUIDirectories as COSSUIDirectories[K]["status"]["todo"] extends 0
    ? never
    : K]: COSSUIDirectories[K];
};

// Component Metadata
export type COSSUIComponentMetadata = {
  [K in keyof COSSUIDirectories]: {
    directory: K;
    name: COSSUIDirectories[K]["name"];
    totalComponents: number;
    status: COSSUIDirectories[K]["status"];
    hasInProgress: boolean;
  };
};

// Component Types
export type COSSUIButtonsComponents = COSSUIComponentHelper<"BUTTONS">;

// All Component Types
export type COSSUIComponent = Prettify<COSSUIButtonsComponents>;

// Directory To Component
export type COSSUIDirectoryToComponent = Prettify<{
  buttons: COSSUIButtonsComponents;
}>;

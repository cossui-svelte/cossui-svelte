/* eslint-disable */
/**
 * !!!!!!!!!!
 * This file is auto-generated. Do not edit manually
 * Last generated at: 4/30/2026, 11:16:27 PM
 * To update, run: pnpm generate:registry --format
 * @version 0.1.0
 * !!!!!!!!!!
 */
export const COSSUI_DIRECTORIES = {
  BUTTONS: {
    components: [
      'button-01.svelte',
      'button-02.svelte',
      'button-03.svelte',
      'button-04.svelte',
      'button-05.svelte',
      'button-06.svelte',
      'button-07.svelte',
      'button-08.svelte',
      'button-09.svelte',
      'button-10.svelte'
    ],
    directory: 'buttons',
    name: 'Buttons',
    status: {
      ready: 10,
      todo: 0
    }
  }
} as const;
export type COSSUIDirectories = typeof COSSUI_DIRECTORIES;
export const COMPONENT_STATES = {
  READY: 'ready',
  TODO: 'todo'
} as const;

export type ComponentState = (typeof COMPONENT_STATES)[keyof typeof COMPONENT_STATES];

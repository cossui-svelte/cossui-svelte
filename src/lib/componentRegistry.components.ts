/* eslint-disable */
/**
 * !!!!!!!!!!
 * This file is auto-generated. Do not edit manually
 * Last generated at: 4/27/2026, 11:49:01 PM
 * To update, run: pnpm generate:registry --format
 * @version 0.1.0
 * !!!!!!!!!!
 */
export const COSSUI_DIRECTORIES = {
  BUTTONS: {
    directory: 'buttons',
    name: 'Buttons',
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
    status: {
      todo: 0,
      ready: 10
    }
  }
} as const;
export type COSSUIDirectories = typeof COSSUI_DIRECTORIES;
export const COMPONENT_STATES = {
  TODO: 'todo',
  READY: 'ready'
} as const;

export type ComponentState = (typeof COMPONENT_STATES)[keyof typeof COMPONENT_STATES];

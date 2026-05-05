/* eslint-disable */
/**
 * !!!!!!!!!!
 * This file is auto-generated. Do not edit manually
 * Last generated at: 5/4/2026, 11:07:56 PM
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
  },
  CHECKBOXES: {
    components: [
      'checkbox-01.svelte',
      'checkbox-02.svelte',
      'checkbox-03.svelte',
      'checkbox-04.svelte',
      'checkbox-05.svelte',
      'checkbox-06.svelte',
      'checkbox-07.svelte',
      'checkbox-08.svelte',
      'checkbox-09.svelte',
      'checkbox-10.svelte',
      'checkbox-11.svelte',
      'checkbox-12.svelte',
      'checkbox-13.svelte',
      'checkbox-14.svelte',
      'checkbox-15.svelte',
      'checkbox-16.svelte',
      'checkbox-17.svelte',
      'checkbox-18.svelte'
    ],
    directory: 'checkboxes',
    name: 'Checkboxes',
    status: {
      ready: 18,
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

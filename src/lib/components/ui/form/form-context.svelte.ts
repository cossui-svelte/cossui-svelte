import { getContext, setContext } from 'svelte';
import type { SuperForm } from 'sveltekit-superforms';

const FORM_KEY = Symbol('form');

export function setFormContext<T extends Record<string, unknown>>(form: SuperForm<T>) {
  setContext(FORM_KEY, form);
}

export function getFormContext<T extends Record<string, unknown>>(): SuperForm<T> {
  return getContext(FORM_KEY);
}

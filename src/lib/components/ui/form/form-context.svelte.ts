import { getContext, setContext } from 'svelte';
import type { SuperForm } from 'sveltekit-superforms';

const FORM_KEY = Symbol('cossui.form');

export function setFormContext<T extends Record<string, unknown>>(form: SuperForm<T>) {
  setContext<SuperForm<T>>(FORM_KEY, form);
}

export function getFormContext<T extends Record<string, unknown>>(): SuperForm<T> {
  const ctx = getContext<SuperForm<T>>(FORM_KEY);
  if (!ctx) {
    throw new Error('Cossui Form context not found. Make sure to wrap your component with a <Form> provider.');
  }
  return ctx;
}

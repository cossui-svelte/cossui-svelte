import { getContext, setContext } from 'svelte';
import type { SuperForm } from 'sveltekit-superforms';

const FORM_KEY = Symbol('cossui.form');

export function setFormContext<T extends Record<string, unknown>>(form: SuperForm<T>) {
  setContext<SuperForm<T>>(FORM_KEY, form);
}

export function getFormContext<T extends Record<string, unknown>>(): SuperForm<T> {
  const ctx = getContext<SuperForm<T>>(FORM_KEY);
  if (!ctx) {
    throw new Error(
      'Coss-ui form context was not found. Wrap your component in a <Form config={form} /> component',
    );
  }
  return ctx;
}

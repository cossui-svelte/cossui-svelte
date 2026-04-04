/**
 * Svelte 5 Input component — a headless, accessible native input primitive.
 *
 * `Input` is a convenience wrapper around `Field.Control` that works
 * seamlessly inside a `<Field.Root>` context for labelling, validation, and
 * state management.
 *
 * Usage:
 * ```svelte
 * <script>
 *   import { Input } from '@base-ui/svelte/input';
 * </script>
 *
 * <Input name="email" type="email" />
 * ```
 *
 * Or with a surrounding Field:
 * ```svelte
 * <script>
 *   import * as Field from '@base-ui/svelte/field';
 *   import { Input } from '@base-ui/svelte/input';
 * </script>
 *
 * <Field.Root name="email" validate={(v) => v ? null : 'Required'}>
 *   <Field.Label>Email</Field.Label>
 *   <Input type="email" />
 *   <Field.Error />
 * </Field.Root>
 * ```
 */

export { default as Input, default } from './Input.svelte';

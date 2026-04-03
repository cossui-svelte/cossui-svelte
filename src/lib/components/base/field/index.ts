/**
 * Svelte 5 Field component — a headless, accessible form-field primitive.
 *
 * Usage (namespace import):
 * ```svelte
 * <script>
 *   import * as Field from '@base-ui/svelte/field';
 * </script>
 *
 * <Field.Root name="email" validate={(v) => v ? null : 'Required'}>
 *   <Field.Label>Email</Field.Label>
 *   <Field.Control type="email" />
 *   <Field.Description>We will never share your email.</Field.Description>
 *   <Field.Error />
 * </Field.Root>
 * ```
 *
 * Or with individual named imports:
 * ```svelte
 * <script>
 *   import { Root, Label, Control, Description, FieldError, Validity, Item }
 *     from '@base-ui/svelte/field';
 * </script>
 * ```
 */

// -- Type exports -------------------------------------------------------------

export type {
  FieldContext,
  FieldItemContextType,
  FieldRootState,
  FieldValidityData,
  FieldValidityStateShape,
  TransitionStatus,
  ValidationMode
} from './context.js';
export { default as Control } from './FieldControl.svelte';
export type { Props as DescriptionProps } from './FieldDescription.svelte';
export { default as Description } from './FieldDescription.svelte';
export type { Props as ErrorProps } from './FieldError.svelte';
// `Error` shadows the global — use the alias `FieldError` for named imports.
export { default as Error } from './FieldError.svelte';
export type { Props as ItemProps } from './FieldItem.svelte';
export { default as Item } from './FieldItem.svelte';
export type { Props as LabelProps } from './FieldLabel.svelte';
export { default as Label } from './FieldLabel.svelte';
export type { Props as RootProps } from './FieldRoot.svelte';
// -- Component exports --------------------------------------------------------
export { default as Root } from './FieldRoot.svelte';
// Re-export the FieldValidityState type from FieldValidity
export type { FieldValidityState } from './FieldValidity.svelte';
export { default as Validity } from './FieldValidity.svelte';

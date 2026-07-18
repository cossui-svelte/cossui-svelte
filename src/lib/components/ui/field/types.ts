import type { Snippet } from 'svelte';
import type { HTMLAttributes, HTMLLabelAttributes } from 'svelte/elements';
import type { Expand, WithChild, Without } from 'svelte-toolbelt';
import type { FormPath, FormPathLeaves } from 'sveltekit-superforms';
import type { FsSuperForm } from '$lib/components/ui//form/form-field-state.svelte.js';
import type { Primitive } from '$lib/components/ui//form/internal/types.js';
import type { ControlAttrs } from '$lib/components/ui/form/form-field-attrs.js';

type PrimitiveDivAttributes = Primitive<HTMLAttributes<HTMLDivElement>>;
type PrimitiveLabelAttributes = Primitive<HTMLLabelAttributes>;

/**
 * Props for the [Description](https://formsnap.dev/docs/components/description) component.
 */
export type DescriptionPropsWithoutHTML = WithChild;

export type DescriptionProps = DescriptionPropsWithoutHTML &
  Without<PrimitiveDivAttributes, DescriptionPropsWithoutHTML>;

/**
 * Props for the [Field](https://formsnap.dev/docs/components/field) component.
 */
export type FieldProps<T extends Record<string, unknown>, U extends FormPath<T>, M = unknown> = {
  /**
   * The form object returned from calling `superForm` in your component.
   */
  form: FsSuperForm<T, M>;

  /**
   * The path to the field in the form object.
   *
   * @required
   */
  name: U;

  /**
   * The children of the field.
   */
  children?: Snippet<
    [
      {
        value: T[U];
        errors: string[];
        tainted: boolean;
        constraints: Record<string, unknown>;
      }
    ]
  >;
};

/**
 * Props for the [ElementField](https://formsnap.dev/docs/components/element-field) component.
 *
 * @category ElementField
 */
export type ElementFieldProps<
  T extends Record<string, unknown>,
  U extends FormPathLeaves<T>,
  M = unknown
> = {
  /**
   * The form object returned from calling `superForm` in your component.
   */
  form: FsSuperForm<T, M>;

  /**
   * The path to the field in the form object.
   *
   * @required
   */
  name: U;

  /**
   * The children of the field.
   */
  children?: Snippet<
    [
      {
        value: T[U];
        errors: string[];
        tainted: boolean;
        constraints: Record<string, unknown>;
      }
    ]
  >;
};

/**
 * Props for the [Control](https://formsnap.dev/docs/components/control) component.
 */
export type ControlProps = {
  /**
   * Optionally provide a unique id for the form control.
   * If not provided, a unique ID will be generated for you.
   */
  id?: string;
  children?: Snippet<[{ props: Expand<ControlAttrs> }]>;
};

export type LabelPropsWithoutHTML = WithChild;

/**
 * Props for the [Label](https://formsnap.dev/docs/components/label) component.
 */
export type LabelProps = LabelPropsWithoutHTML &
  Without<PrimitiveLabelAttributes, LabelPropsWithoutHTML>;

/**
 * Props for the [FieldErrors](https://formsnap.dev/docs/components/field-errors) component.
 */
export type FieldErrorsPropsWithoutHTML = WithChild<
  // biome-ignore lint/complexity/noBannedTypes: WithChild's own default for "no extra props" is `{}`; an index-signature type here (e.g. Record<string, never>) breaks Without<T, U>'s `Omit<T, keyof U>` by blanking out every prop
  {},
  {
    errors: string[];
    errorProps: Record<string, unknown>;
  }
>;

export type FieldErrorsProps = FieldErrorsPropsWithoutHTML &
  Without<PrimitiveDivAttributes, FieldErrorsPropsWithoutHTML>;

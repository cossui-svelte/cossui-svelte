import type { HTMLAttributes, HTMLFieldsetAttributes } from 'svelte/elements';
import type { WithChild, Without } from 'svelte-toolbelt';
import type { FormPath } from 'sveltekit-superforms';
import type { FsSuperForm } from '$lib/components/ui/form/form-field-state.svelte.js';
import type { Primitive } from '$lib/components/ui/form/internal/types.js';

type PrimitiveFieldSetAttributes = Primitive<HTMLFieldsetAttributes>;
type PrimitiveLegendAttributes = Primitive<HTMLAttributes<HTMLLegendElement>>;

/**
 * Props for the [Fieldset](https://formsnap.dev/docs/components/fieldset) component.
 * This component is used to group form controls together and if used, should always
 * have a child [Legend](https://formsnap.dev/docs/components/legend) component to provide
 * an accessible title for the group.
 *
 * @see {@link https://www.w3.org/WAI/tutorials/forms/grouping/ W3C Grouping}
 */
export type FieldsetPropsWithoutHTML<
  T extends Record<string, unknown>,
  U extends FormPath<T>,
  M = unknown
> = WithChild<
  {
    /**
     * The form object returned from calling `superForm` in your component.
     */
    form: FsSuperForm<T, M>;

    /**
     * The path to the field in the form object.
     */
    name: U;
  },
  {
    value: T[U];
    errors: string[];
    tainted: boolean;
    constraints: Record<string, unknown>;
  }
>;

export type FieldsetProps<
  T extends Record<string, unknown>,
  U extends FormPath<T>,
  M = unknown
> = FieldsetPropsWithoutHTML<T, U, M> &
  Without<PrimitiveFieldSetAttributes, FieldsetPropsWithoutHTML<T, U, M>>;

export type LegendPropsWithoutHTML = WithChild;

/**
 * Props for the [Legend](https://formsnap.dev/docs/components/legend) component.
 * This component is used to provide an accessible title for a group of form controls.
 *
 * @see {@link https://www.w3.org/WAI/tutorials/forms/grouping/ W3C Grouping}
 */
export type LegendProps = LegendPropsWithoutHTML &
  Without<PrimitiveLegendAttributes, LegendPropsWithoutHTML>;

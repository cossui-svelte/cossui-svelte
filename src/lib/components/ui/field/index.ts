import * as FieldPrimitive from '$lib/components/base/field';

import Field from './field.svelte';
import FieldDescription from './field-description.svelte';
import FieldError from './field-error.svelte';
import FieldItem from './field-item.svelte';
import FieldLabel from './field-label.svelte';

export { Field, FieldDescription, FieldError, FieldItem, FieldLabel };

export const FieldControl: typeof FieldPrimitive.Control = FieldPrimitive.Control;
export const FieldValidity: typeof FieldPrimitive.Validity = FieldPrimitive.Validity;

export { FieldPrimitive };

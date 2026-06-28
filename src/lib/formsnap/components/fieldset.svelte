<script lang="ts" module>
	import type { FormPath as _FormPath } from "sveltekit-superforms";

	type T = unknown;
	type U = unknown;
</script>

<script
	lang="ts"
	generics="T extends Record<string, unknown>, U extends _FormPath<T>"
>
	import { box, mergeProps, useRefById } from "svelte-toolbelt";
	import { getDataFsError } from "$lib/formsnap/internal/utils/attributes.js";
	import { useId } from "$lib/formsnap/internal/utils/id.js";
	import Field from "./field.svelte";
	import type { FieldsetProps } from "./types.js";

	let {
		id = useId(),
		ref = $bindable(null),
		form,
		name,
		child: childProp,
		children: childrenProp,
		...restProps
	}: FieldsetProps<T, U> = $props();

	useRefById({
		id: box.with(() => id),
		ref: box.with(
			() => ref,
			(v) => (ref = v),
		),
	});

	const mergedProps = $derived(
		mergeProps(restProps, {
			"data-fs-fieldset": "",
			id,
		}),
	);
</script>

<!--
@component
## Fieldset
A component that groups related form controls or fields and extends the [Field](https://formsnap.dev/docs/components/field) component.

- [Fieldset Documentation](https://formsnap.dev/docs/components/fieldset)
- [Field Documentation](https://formsnap.dev/docs/components/field)

### Snippet Props
- `value` - The value of the field.
- `errors` - The errors of the field.
- `tainted` - The tainted state of the field.
- `constraints` - The constraints of the field.
- `props` - A spreadable object of attributes for the fieldset element if using the `child` snippet.

@param {SuperForm} form - The form object.
@param {FormPath<T>} name - The name of the field.
-->
<Field {form} {name}>
	{#snippet children({ value, errors, tainted, constraints })}
		{#if childProp}
			{@render childProp({
				constraints,
				errors,
				props: mergedProps,
				tainted,
				value: value as T[U],
			})}
		{:else}
			<fieldset {...mergedProps} data-fs-error={getDataFsError(errors)}>
				{@render childrenProp?.({
					constraints,
					errors,
					tainted,
					value: value as T[U],
				})}
			</fieldset>
		{/if}
	{/snippet}
</Field>
